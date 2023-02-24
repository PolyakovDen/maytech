<script>
import VButton from "../components/VButton.vue";

export default {
  name: "Home",
  components: {
    VButton,
  },
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<template>
  <section class="error-404">
    <h1 class="error-404__title">404</h1>
    <hr />
    <h2 class="error-404__sub-title">Page Not Found</h2>
    <v-button class="error-404__button" title="Go Home" @click="goHome" />
  </section>
</template>
