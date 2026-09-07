<template>
  <div id="configured-fixture">
    {{ config.position }}-{{ config.duration }}-{{ config.maxToasts }}-{{
      config.theme
    }}-{{ config.showIcon }}
  </div>
</template>

<script setup lang="ts">
const runtime = useRuntimeConfig()
const config = runtime.public.notify
</script>
