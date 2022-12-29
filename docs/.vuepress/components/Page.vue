<script setup lang="ts">
import PageMeta from '@vuepress/theme-default/lib/client/components/PageMeta.vue'
import PageNav from '@vuepress/theme-default/lib/client/components/PageNav.vue'
</script>

<template>
  <main class="page">
    <slot name="top" />

    <div class="theme-default-content">
      <slot name="content-top" />

      <Content />

      <slot name="content-bottom" />
    </div>

    <PageMeta />

    <PageNav />

    <slot name="bottom" />
    <Giscus/>
  </main>
</template>

<style>
.giscus {
  padding: 2rem 2.5rem;
  max-width: var(--content-width);
  margin: 0 auto;
  width: calc(100% - 5rem);
}

.giscus-frame {
  width: 100%;
}
</style>