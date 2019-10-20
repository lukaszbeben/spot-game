import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: []
  },
  mutations: {
    setUsers(state, user) {
      state.users.push(user);
    }
  },
  getters: {
    getUsers: state => {
      return state.users;
    }
  },
  plugins: [createPersistedState()]
});
