<template>
    <div>
      <VideoList :videos="videos" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useFetch } from 'nuxt/app';
  
  const { data: videosData } = await useFetch('https://b842-115-79-137-39.ngrok-free.app/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        {
          videos {
            id
            title
            original_url
            hls_url
          }
        }
      `
    }),
  });
  
  const videos = ref(videosData.value?.data?.videos || []);
  </script>