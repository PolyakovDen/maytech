import axios from "axios";
const state = {
  token: null,
  profile: null,
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  profile: (state) => state.user,
  token: (state) => state.token,
};

const actions = {
  async LogIn({ commit }, token) {
    await axios
      .get("/session/login", {
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
      .get("/profile", {
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
    let user = null;
    commit("logout", token, user);
  },
};

const mutations = {
  setToken(state, token) {
    state.token = token;
  },
  setProfile(state, user) {
    state.profile = user;
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
