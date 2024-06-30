<template>
  <div class="file-downloader">
    <button @click="startDownload" :disabled="isDownloading">
      {{ isDownloading ? 'Downloading...' : 'Download File' }}
    </button>
    <div v-if="isDownloading" class="progress-bar">
      <div :style="{ width: `${progress}%` }" class="progress"></div>
    </div>
    <div v-if="downloadComplete" class="complete-message">
      Download Complete!
    </div>
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isDownloading = ref(false)
const progress = ref(0)
const downloadComplete = ref(false)
const error = ref<string | null>(null)
const fileUrl = 'https://d4x-poc.vercel.app/agile-practice.pdf'

const startDownload = async () => {
  isDownloading.value = true
  progress.value = 0
  downloadComplete.value = false
  error.value = null

  try {
    const response = await fetch(fileUrl, { method: 'HEAD' })
    const fileSize = parseInt(response.headers.get('Content-Length') || '0', 10)

    const downloadResponse = await fetch(fileUrl)
    const reader = downloadResponse.body?.getReader()
    if (!reader) throw new Error('Unable to read the file')

    let receivedLength = 0
    const chunks: Uint8Array[] = []

    while(true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
      receivedLength += value.length
      progress.value = Math.min((receivedLength / fileSize) * 100, 100)
    }

    const blob = new Blob(chunks, { type: response.headers.get('Content-Type') || 'application/octet-stream' })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = 'agile-practice.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    downloadComplete.value = true
  } catch (e) {
    console.error('Download error:', e)
    error.value = 'An error occurred during download. Please try again.'
  } finally {
    isDownloading.value = false
  }
}
</script>

<style scoped>
.file-downloader {
  max-width: 300px;
  margin: 20px auto;
  text-align: center;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
.progress-bar {
  margin-top: 10px;
  width: 100%;
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
}
.progress {
  height: 100%;
  background-color: #4CAF50;
  transition: width 0.3s ease;
}
.complete-message {
  margin-top: 10px;
  color: #4CAF50;
}
.error-message {
  margin-top: 10px;
  color: #f44336;
}
</style>
