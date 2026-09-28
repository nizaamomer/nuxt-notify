# Security Policy

**[Levi Labs](https://levilabs.dev)** · [GitHub](https://github.com/nizaamomer/nuxt-notify)  
Maintained by **Nizam Omer** — [nizaamomer.com](https://nizaamomer.com) · [nizam@nizaamomer.com](mailto:nizam@nizaamomer.com)

`nuxt-notify` is a client-side Nuxt module that renders toast UI in the browser (and hydrates on the server). Please report security issues responsibly, as described below.

## Supported Versions

This project follows [Semantic Versioning](https://semver.org/). Security fixes are applied to the latest tagged release on npm and to `main`; older major versions are not backported.

| Version          | Supported |
| ---------------- | --------- |
| 1.x (and `main`) | Yes       |
| < 1.0            | No        |

## Reporting a Vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

### Preferred: GitHub private reporting

1. Open the [Security tab](https://github.com/nizaamomer/nuxt-notify/security) for this repository.
2. Click **Report a vulnerability**.
3. Describe the issue, including steps to reproduce and potential impact.

### Alternative: email

Contact us privately (include `nuxt-notify` in the subject):

| | |
| --- | --- |
| **Levi Labs** | [hello@levilabs.dev](mailto:hello@levilabs.dev) |
| **Nizam Omer** | [nizam@nizaamomer.com](mailto:nizam@nizaamomer.com) |

### What to expect

- **Acknowledgement:** within 48 hours of your report
- **Initial assessment:** within 5 business days, including whether the report is accepted and its severity
- **Updates:** you'll be kept informed of progress until the issue is resolved
- **Disclosure:** once a fix is released, we'll credit you in the release notes/changelog unless you prefer to remain anonymous

## Scope

**In scope:**

- The module source in this repository (`src/`, runtime components, composables, and configuration handling)
- Cross-site scripting (XSS) or HTML injection via toast content, actions, or avatars
- Server-side request/state issues (for example, toast state leaking between SSR requests)
- Supply-chain or build issues that affect published `dist/` artifacts on npm

**Out of scope:**

- Vulnerabilities in Nuxt, Vue, Tailwind, or `@nuxt/icon` themselves (report those to the respective projects)
- Issues that only arise when an application passes untrusted HTML into toast fields without sanitization — **always treat toast copy as UI text**, not as raw HTML, unless you explicitly control and sanitize the input

Thank you for helping keep this module and its users secure.
