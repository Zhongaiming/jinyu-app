import Vue from "vue";
import Vuex from 'vuex'
import getters from './getters.js'

import user from './modules/user.js'
import system from './modules/system.js'
import config from "./modules/config.js";
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		user,
		system,
		config
	},
	getters
})