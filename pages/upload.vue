<template>
    <div>
      <a-form layout="vertical" @submit.prevent="handleSubmit">
        <a-form-item label="Title">
          <a-input v-model:value="videoTitle" placeholder="Enter video title" />
        </a-form-item>
        <a-upload
          v-model:file-list="fileList"
          list-type="picture"
          :custom-request="customRequest"
          :preview-file="previewFile"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            Upload
          </a-button>
        </a-upload>
      </a-form>
  
      <!-- Hiển thị video sau khi tải lên -->
      <div v-if="uploadedVideo">
        <h3>Uploaded Video</h3>
        <video :src="uploadedVideo.original_url" controls></video>
        <p>Title: {{ uploadedVideo.title }}</p>
        <p>HLS URL: {{ uploadedVideo.hls_url }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { UploadOutlined } from '@ant-design/icons-vue';
  import type { UploadFile, UploadProps } from 'ant-design-vue';
  
  const fileList = ref<UploadFile[]>([]);
  const videoTitle = ref('');
  const uploadedVideo = ref(null);
  
  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options;
  
    const formData = new FormData();
    formData.append('operations', JSON.stringify({
      query: `
        mutation Upload($file: Upload!, $title: String!) {
          uploadVideo(title: $title, file: $file) {
            id
            title
            original_url
            hls_url
          }
        }
      `,
      variables: {
        file: null,
        title: videoTitle.value,
      },
    }));
  
    formData.append('map', JSON.stringify({
      '0': ['variables.file']
    }));
  
    formData.append('0', file);
  
    try {
      const response = await fetch('https://7e3a-14-241-226-209.ngrok-free.app/graphql', {
        method: 'POST',
        body: formData,
      });
  
      const result = await response.json();
      console.log(result);
      if (result.data && result.data.uploadVideo) {
        uploadedVideo.value = result.data.uploadVideo;
      }
      onSuccess(result, file);
    } catch (error) {
      console.error(error);
      onError(error, file);
    }
  };
  
  const previewFile: UploadProps['previewFile'] = async file => {
    return URL.createObjectURL(file);
  };
  
  const handleSubmit = () => {
    if (fileList.value.length === 0) {
      alert('Please select a file to upload.');
      return;
    }
    fileList.value.forEach(file => file.status = 'uploading');
  };
  </script>