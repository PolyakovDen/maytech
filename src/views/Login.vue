<script>
import { mapActions } from "vuex";

import VInput from "../components/VInput.vue";
import VButton from "../components/VButton.vue";

export default {
  name: "Login",
  components: {
    VInput,
    VButton,
  },
  data() {
    return {
      emailLabel: "Email",
      email: "",
      passwordLabel: "Password",
      password: "",
      showError: false,
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    async logIn() {
      let encodedData = window.btoa(this.email + ":" + this.password);

      try {
        await this.LogIn(encodedData);
        this.showError = false;
        this.$router.push("/");
      } catch (error) {
        this.showError = true;
      }
    },
  },
};
</script>

<template>
  <section class="login d-flex flex-column justify-center align-center">
    <img
      class="login__logo"
      alt="mayTech"
      src="../assets/logo.svg"
      width="210"
      height="40"
    />

    <div class="login__form">
      <div class="login__fields d-flex flex-column">
        <span class="login__error" v-if="showError">
          Incorrect email or password
        </span>
        <form>
          <v-input
            v-model="email"
            placeholder="example@email.com"
            :value="email"
            :label="emailLabel"
          />

          <v-input
            v-model="password"
            placeholder="Enter password"
            type="password"
            :value="password"
            :label="passwordLabel"
          />
        </form>
      </div>
      <v-button title="Log in" @click="logIn" />
    </div>
  </section>
</template>
