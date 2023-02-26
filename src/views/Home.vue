<script>
import { mapGetters } from "vuex";

import VButton from "../components/VButton.vue";
import ImageItem from "../components/ImageItem.vue";
import DragDropImageInput from "../components/DragDropImageInput.vue";

import { Uploader } from "@/services/Uploader";

export default {
  name: "Home",
  components: {
    VButton,
    ImageItem,
    DragDropImageInput,
  },
  data: () => ({
    imagesArray: [],
    isImagesUploaded: false,
    uploadPercentage: 0,
    uploadingImageIndex: null,
  }),
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
    ...mapGetters(["homeId"]),
  },
  async created() {
    await this.$store.dispatch("GetProfile");
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/login");
    },
    preloadImages(files) {
      this.imagesArray = files;

      this.isUploaded = false;
    },
    onProgress(percent) {
      this.uploadPercentage = percent;
    },
    async uploadImages() {
      for (let i = 0; i < this.imagesArray.length; i++) {
        if (!this.imagesArray[i].uploaded) {
          this.uploadingImageIndex = i;
          this.imagesArray[i].uploaded = false;

          const link = await Uploader.uploadImagesLink(
            this.imagesArray[i],
            this.homeId,
            this.$store.getters.token
          );

          await Uploader.uploadImagesChuncked(
            this.imagesArray[i],
            link.upload_key,
            this.onProgress
          );

          await Uploader.uploadImagesFinalized(
            link.upload_key,
            this.$store.getters.token
          );

          this.imagesArray[i].uploaded = true;
          this.uploadingImageIndex = null;
          this.uploadPercentage = 0;
        }

        this.isImagesUploaded = true;
      }
    },
    deleteImage(index) {
      return this.imagesArray.splice(index, 1);
    },
  },
};
</script>

<template>
  <section class="home d-flex flex-column">
    <v-button
      v-if="isLoggedIn"
      class="home__button"
      title="Log out"
      @click="logout"
    />

    <div class="d-flex flex-column justify-center align-center">
      <drag-drop-image-input @fileChange="preloadImages" />

      <div
        class="file-select__preview d-flex flex-column"
        v-if="imagesArray.length"
      >
        <div class="file-select__images">
          <image-item
            v-for="(image, index) in imagesArray"
            :key="index"
            :image="image"
            :progress="uploadPercentage"
            :is-loading="index === uploadingImageIndex"
            @delete="deleteImage(index)"
          />
        </div>
        <v-button
          class="home__button"
          title="Upload"
          :disabled="isImagesUploaded"
          @click="uploadImages"
        />
      </div>
    </div>
  </section>
</template>
