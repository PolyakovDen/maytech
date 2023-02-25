<script>
import axios from "axios";

import VButton from "../components/VButton.vue";
import ImageItem from "../components/ImageItem.vue";

export default {
  name: "Home",
  components: {
    VButton,
    ImageItem,
  },
  data() {
    return {
      imagesArray: [],
      isUploaded: false,
    };
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
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
      for (let i = 0; i < files.length; i++) {
        this.imagesArray.push(files[i]);
      }
    },
    async uploadImages() {
      for (let i = 0; i < this.imagesArray.length; i++) {
        const body = {
          file_size: this.imagesArray[i].size,
          name: this.imagesArray[i].name,
          parent_id: this.$store.getters.profile.outgoing_id,
          upload_type: "chunked",
        };

        const config = {
          headers: {
            "X-Auth-Token": this.$store.getters.token,
          },
        };

        const link = await axios.post("/upload/link", body, config);
        console.log(link);
        const chunked = await axios.post(
          `/upload/chunked/${link.data.upload_key}`
        );
        console.log(chunked);
        const finalize = await axios.get(
          `/upload/finalize/${link.data.upload_key}`,
          config
        );
        console.log(finalize);
      }

      this.isUploaded = true;
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
      class="home__button_back"
      title="Log out"
      @click="logout"
    />

    <div class="file-select d-flex flex-column justify-center align-center">
      <input
        class="file-select__input"
        ref="fileInput"
        type="file"
        multiple="multiple"
        accept="image/jpeg, image/png, image/jpg"
        @change="preloadImages($event.target.files)"
      />

      <div
        class="file-select__placeholder d-flex justify-center align-center"
        @click="$refs.fileInput.click()"
      >
        <span>Choose an Images</span>
      </div>

      <div
        class="file-select__images d-flex flex-column"
        v-if="imagesArray.length"
      >
        <image-item
          v-for="(image, index) in imagesArray"
          :key="index"
          :image="image"
          @delete="deleteImage(index)"
        />
        <v-button
          class="home__button_back"
          title="Upload"
          :disabled="isUploaded"
          @click="uploadImages"
        />
      </div>
    </div>
  </section>
</template>
