import axios from "axios";
const state = {
  token: null,
  profile: null,
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  profile: (state) => state.profile,
  token: (state) => state.token,
  homeId: (state) => state.profile.home_id,
};

const actions = {
  async LogIn({ commit }, token) {
    await axios
      .get("https://denys-trial-task.quatrix.it/api/1.0/session/login", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        commit("setToken", res.data.session_id);
      });
  },
  async GetProfile({ commit, state }) {
    await axios
      .get("https://denys-trial-task.quatrix.it/api/1.0/profile", {
        headers: {
          "X-Auth-Token": state.token,
        },
      })
      .then((res) => {
        commit("setProfile", res.data);
      });
  },
  async LogOut({ commit }) {
    let token = null;
    let profile = null;
    commit("logout", token, profile);
  },
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setProfile(state, profile) {
    state.profile = profile;
  },
  logout(state) {
    state.token = null;
    state.profile = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
