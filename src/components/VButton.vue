<script>
export default {
  name: "VButton",
  props: {
    title: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
    },
  },
};
</script>

<template>
  <button
    class="v-button"
    :class="{ 'v-button_disabled': disabled }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span class="v-button__title">
      {{ title }}
    </span>
  </button>
</template>
