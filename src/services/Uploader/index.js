import axios from "axios";

export const Uploader = {
  async uploadImagesLink(file, homeId, token) {
    const body = {
      file_size: file.size,
      name: file.name,
      parent_id: homeId,
      upload_type: "chunked",
    };

    const config = {
      headers: {
        "X-Auth-Token": token,
      },
    };
    return axios
      .post("/upload/link", body, config)
      .then((response) => response.data)
      .catch((error) => error);
  },

  async uploadImagesChuncked(file, id, onProgress) {
    const formData = new FormData();

    formData.append("file", file);

    return axios
      .post(
        `https://denys-trial-task.quatrix.it/upload/chunked/${id}`,
        formData,
        {
          onUploadProgress: (uploadEvent) => {
            const percentCompleted = Math.round(
              (uploadEvent.loaded * 100) / uploadEvent.total
            );

            if (onProgress) onProgress(percentCompleted);

            return percentCompleted;
          },
        }
      )
      .then((response) => response.data)
      .catch((error) => error);
  },

  async uploadImagesFinalized(id, token) {
    const config = {
      headers: {
        "X-Auth-Token": token,
      },
    };

    return axios
      .get(`/upload/finalize/${id}`, config)
      .then((response) => response.data)
      .catch((error) => error);
  },
};
