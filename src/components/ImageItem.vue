<script>
export default {
  name: "ImageItem",
  props: {
    image: {
      type: File,
      required: true,
    },
    isLoading: {
      type: Boolean,
    },
    progress: {
      type: Number,
    },
  },
  computed: {
    uploadStatus: function () {
      if (this.isLoading) return "Uploading";
      else if (this.image.uploaded) return "Uploaded";
      return "Unuploaded";
    },
  },
  methods: {
    getImagePreview(image) {
      return URL.createObjectURL(image);
    },
    getImageSize(size) {
      const kb = size / 1024;

      return kb < 1024
        ? (kb / 100).toFixed(2) + " KB"
        : (kb / 1024).toFixed(2) + " MB";
    },
  },
};
</script>

<template>
  <div class="image-item d-flex align-center">
    <img class="image-item__preview" :src="getImagePreview(image)" />
    <div class="image-item__info">
      <p>{{ image.name }}</p>

      <div v-if="isLoading" class="image-item__progress">
        <div class="image-item__progress-line" :style="`width: ${progress}%`" />
      </div>
      <span v-else>{{ getImageSize(image.size) }}</span>
    </div>
    <div class="image-item__status d-flex align-center">
      <span>{{ uploadStatus }}</span>
      <div class="image-item__delete" @click="$emit('delete')">
        <img src="../assets/trash.svg" alt="Delete" width="20" height="20" />
      </div>
    </div>
  </div>
</template>
