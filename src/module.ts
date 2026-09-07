import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addComponent,
  addImports,
  resolvePath,
} from '@nuxt/kit'

let moduleVersion: string | undefined

const getModuleVersion = () => {
  if (moduleVersion) {
    return moduleVersion
  }

  try {
    moduleVersion = JSON.parse(
      readFileSync(
        fileURLToPath(new URL('../package.json', import.meta.url)),
        'utf8',
      ),
    ).version as string
  }
  catch {
    moduleVersion = '0.0.0'
  }

  return moduleVersion
}

const SETUP_HINT_CACHE = join('node_modules', '.cache', 'nuxt-notify', 'setup-hint.json')

type SetupHintState = 'tailwind-vite' | 'nuxt-tailwind' | 'misconfigured' | 'missing'

interface SetupHintMarker {
  version: string
  state: SetupHintState
}

const readSetupHintMarker = (root: string): SetupHintMarker | null => {
  try {
    const path = join(root, SETUP_HINT_CACHE)
    if (!existsSync(path)) {
      return null
    }

    return JSON.parse(readFileSync(path, 'utf8')) as SetupHintMarker
  }
  catch {
    return null
  }
}

const writeSetupHintMarker = (root: string, marker: SetupHintMarker) => {
  const dir = join(root, 'node_modules', '.cache', 'nuxt-notify')
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'setup-hint.json'), JSON.stringify(marker))
}

const shouldShowSetupHint = (
  root: string,
  state: SetupHintState,
  alwaysLog: boolean,
) => {
  if (alwaysLog) {
    return true
  }

  const marker = readSetupHintMarker(root)
  const version = getModuleVersion()
  return !marker || marker.version !== version || marker.state !== state
}

export interface ModuleOptions {
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center'
  duration?: number
  maxToasts?: number
  theme?: 'dark' | 'light' | 'system'
  showIcon?: boolean

  /** Always show setup logs. Default shows them once per project (or after upgrades). */
  log?: boolean

  strict?: boolean
}

const pkgExists = async (pkg: string, cwd: string) => {
  try {
    await resolvePath(pkg, { cwd })
    return true
  }
  catch {
    return false
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-notify',
    configKey: 'notify',
    compatibility: { nuxt: '^3.0.0 || ^4.0.0' },
  },
  defaults: {
    position: 'top-right',
    duration: 5000,
    maxToasts: 5,
    theme: 'system',
    showIcon: true,

    log: false,

    strict: true,
  },

  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const root = nuxt.options.rootDir
    const isModuleBuild = root === process.cwd()
    const alwaysLog = options.log === true

    // Detect dependencies
    const hasTailwind = await pkgExists('tailwindcss', root)
    const hasTailwindVite = await pkgExists('@tailwindcss/vite', root)
    const hasNuxtTailwind = await pkgExists('@nuxtjs/tailwindcss', root)
    const wantsIcons = options.showIcon !== false
    const hasNuxtIcon = wantsIcons ? await pkgExists('@nuxt/icon', root) : true

    const missing: string[] = []

    if (!hasTailwind && !hasNuxtTailwind && !isModuleBuild) {
      missing.push(
        'Tailwind CSS is required. Install ONE of:\n'
        + '  - Tailwind via Vite plugin: `npm i tailwindcss @tailwindcss/vite`\n'
        + '  - Tailwind via Nuxt module: `npm i -D @nuxtjs/tailwindcss`',
      )
    }

    if (!hasNuxtIcon) {
      missing.push(
        '@nuxt/icon is required when `notify.showIcon` is enabled.\n'
        + '  Install: `npx nuxi@latest module add icon`',
      )
    }

    if (missing.length) {
      const message
        = `[nuxt-notify] Missing required dependencies:\n`
          + missing.map(m => `- ${m}`).join('\n')

      if (options.strict !== false) throw new Error(message)
      console.warn(message)
    }

    // Check if @nuxtjs/tailwindcss is in modules array
    const isNuxtTailwindActive = nuxt.options.modules.some((mod) => {
      const name = Array.isArray(mod) ? mod[0] : mod
      if (typeof name === 'string') {
        return (
          name === '@nuxtjs/tailwindcss' || name.includes('nuxtjs/tailwindcss')
        )
      }
      return false
    })

    const usingTailwindVite
      = hasTailwind && hasTailwindVite && !isNuxtTailwindActive

    const setupHintState: SetupHintState = usingTailwindVite
      ? 'tailwind-vite'
      : isNuxtTailwindActive
        ? 'nuxt-tailwind'
        : hasTailwind || hasNuxtTailwind
          ? 'misconfigured'
          : 'missing'

    const showSetupHint = !isModuleBuild
      && shouldShowSetupHint(root, setupHintState, alwaysLog)

    if (showSetupHint) {
      if (usingTailwindVite) {
        console.info('[nuxt-notify] Using Tailwind CSS via Vite plugin')
        console.info(
          '[nuxt-notify] Add this to your CSS file:\n'
          + '  @import "tailwindcss";\n'
          + '  @import "nuxt-notify/styles";',
        )
      }
      else if (isNuxtTailwindActive) {
        console.info(
          '[nuxt-notify] Using Tailwind CSS via @nuxtjs/tailwindcss (auto-configured)',
        )
      }
      else if (hasTailwind || hasNuxtTailwind) {
        console.warn(
          '[nuxt-notify] Tailwind CSS detected but not properly configured. '
          + 'Add @nuxtjs/tailwindcss to your modules or configure @tailwindcss/vite',
        )
      }
      else {
        console.warn(
          '[nuxt-notify] Tailwind CSS not found. '
          + 'Install either @nuxtjs/tailwindcss or @tailwindcss/vite',
        )
      }

      if (!alwaysLog) {
        writeSetupHintMarker(root, {
          version: getModuleVersion(),
          state: setupHintState,
        })
      }
    }

    if (isNuxtTailwindActive) {
      nuxt.hook('tailwindcss:config', (tailwindConfig: { content?: unknown }) => {
        if (!tailwindConfig.content) {
          tailwindConfig.content = []
        }

        const paths = [
          resolver.resolve('./runtime/components/**/*.{vue,js,ts}'),
          resolver.resolve('./runtime/composables/**/*.{js,ts}'),
          resolver.resolve('./runtime/plugin.{js,ts}'),
        ]

        const content = tailwindConfig.content

        if (Array.isArray(content)) {
          content.push(...paths)
        }
        else if (
          typeof content === 'object'
          && content !== null
          && 'files' in content
        ) {
          const filesConfig = content as { files?: unknown }
          if (!Array.isArray(filesConfig.files)) {
            filesConfig.files = []
          }
          ;(filesConfig.files as string[]).push(...paths)
        }
      })
    }

    // Add transitions CSS
    nuxt.options.css.push(
      resolver.resolve('./runtime/assets/css/transitions.css'),
    )

    // Runtime config
    nuxt.options.runtimeConfig.public.notify = {
      position: options.position,
      duration: options.duration,
      maxToasts: options.maxToasts,
      theme: options.theme,
      showIcon: options.showIcon,
    }

    // Auto-import composables (explicit to avoid .js/.mjs duplicate warning)
    addImports([
      {
        name: 'useToast', // named export in runtime/composables/useToast
        as: 'useToast', // how it will be used in user code
        from: resolver.resolve('./runtime/composables/useToast'),
      },
    ])

    // Register components
    addComponent({
      name: 'ToastContainer',
      filePath: resolver.resolve('./runtime/components/ToastContainer.vue'),
      global: true,
    })

    addComponent({
      name: 'Toast',
      filePath: resolver.resolve('./runtime/components/Toast.vue'),
    })

    // Register plugin
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
