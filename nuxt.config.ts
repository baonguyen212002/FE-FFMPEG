// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-20',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    '@nuxtjs/color-mode',
    '@ant-design-vue/nuxt',
  ],
  css: [
    'flowbite/dist/flowbite.min.css'
  ]
})