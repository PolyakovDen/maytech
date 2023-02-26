<template>
  <div
    class="drag-drop-zone d-flex flex-column justify-center align-center"
    @click="upload()"
    @dragover.prevent="dragover"
    @dragleave.prevent="dragleave"
    @drop.prevent="drop"
  >
    <input
      ref="file"
      type="file"
      accept="image/jpeg, image/png, image/jpg, image/svg+xml"
      multiple="multiple"
      hidden
      @change="fileChange"
    />

    <img src="../assets/upload.svg" alt="Upload" width="25" height="20" />
    <p class="drag-drop-zone__title">
      {{ isDragging ? "Drop to upload" : "Click to upload" }}
    </p>
    <p class="drag-drop-zone__description" v-if="!isDragging">
      or drag and drop image
    </p>
  </div>
</template>

<script>
export default {
  name: "DragDropImageInput",
  data() {
    return {
      isDragging: false,
      filesArray: [],
    };
  },
  methods: {
    upload() {
      this.$refs.file.click();
    },
    fileChange(e, isDrop = false) {
      const files = isDrop ? e.dataTransfer.files : e.target.files;

      for (let file of files) {
        if (!file.type.match("image.*")) {
          alert("Select only an image!");

          return;
        }
        this.filesArray.push(file);

        this.$emit("fileChange", this.filesArray);
      }
    },
    dragover() {
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      this.fileChange(e, true);
      this.isDragging = false;
    },
  },
};
</script>
