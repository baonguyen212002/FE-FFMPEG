<template>
    <div class="container mx-auto mt-16">
      <h1 class="text-3xl font-semibold text-center mb-8">Danh sách Video</h1>
      
      <p v-if="videos.length === 0" class="text-center">Không có video nào.</p>
  
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="video in videos" :key="video.id" class="bg-white rounded-lg shadow-md p-4">
          <div :id="`video-container-${video.id}`" class="video-player"></div>
          <h2 class="text-xl font-semibold mt-4">{{ video.title }}</h2>
          <!-- <p class="text-gray-600">{{ formatDate(video.created_at) }}</p> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'VideoList',
    props: {
      videos: {
        type: Array,
        default: () => [],
      },
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      },
      async initializePlayer() {
        if (process.client) {
          const Hls = (await import('hls.js')).default;
          const Plyr = (await import('plyr')).default;

          this.$nextTick(() => {
            this.videos.forEach(video => {
              const videoElement = document.createElement('video');
              videoElement.className = 'plyr__video-embed';
              videoElement.controls = true;

              const source = document.createElement('source');
              source.src = video.hls_url;
              source.type = 'application/x-mpegURL';

              videoElement.appendChild(source);

              const container = document.getElementById(`video-container-${video.id}`);
              container.appendChild(videoElement);

              if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(video.hls_url);
                hls.attachMedia(videoElement);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                  const availableQualities = hls.levels.map(l => l.height);
                  new Plyr(videoElement, {
                    quality: {
                      default: availableQualities[0],
                      options: availableQualities,
                      forced: true,
                      onChange: (quality) => this.updateQuality(quality, hls),
                    }
                  });
                });
              } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                new Plyr(videoElement);
              }
            });
          });
        }
      },
      updateQuality(newQuality, hls) {
        if (newQuality === 0) {
          hls.currentLevel = -1; // -1 enables automatic quality selection
        } else {
          hls.levels.forEach((level, levelIndex) => {
            if (level.height === newQuality) {
              hls.currentLevel = levelIndex;
            }
          });
        }
      }
    },
    mounted() {
      this.initializePlayer();
    }
  });
  </script>
  
  <style>
  @import 'plyr/dist/plyr.css';

  .video-player {
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .plyr {
    width: 100%;
    height: 100%;
  }

  .plyr__video-embed .plyr__poster {
    display: none;
  }

  .plyr__controls {
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: space-between !important;
    align-items: center !important;
  }

  .plyr__controls > * {
    margin: 5px !important;
  }
  </style>