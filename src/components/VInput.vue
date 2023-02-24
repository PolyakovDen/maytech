<script>
export default {
  name: "VInput",
  props: {
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div class="v-input">
    <label class="v-input__label d-flex flex-column">
      {{ label }}
      <input
        class="v-input__input"
        autocomplete="on"
        :value="value"
        :type="type"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
      />
    </label>
  </div>
</template>
