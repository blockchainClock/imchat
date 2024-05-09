import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import contact from "./modules/contact";
import conversation from "./modules/conversation";
import message from "./modules/message";
import RTC from "./modules/RTC/index.js";
// import chat from './modules/chat/index.js'
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    contact,
    conversation,
    message,
	RTC,
	// chat
  },
  getters,
});

export default store;
