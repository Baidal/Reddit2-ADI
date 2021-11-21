import authService from '../services/authService'

const actualUser = JSON.parse(localStorage.getItem("user"));
const initialState = actualUser
    ? { loggedIn: true, actualUser }
    : { loggedIn: false, actualUser: null };

export default {
    namespaced: true,
    initialState: initialState,
    actions: {
        async login({ commit }, {nickEmail, password}) {
            const userData = await authService.login(nickEmail, password)
            
            if(userData.errores)
                commit('loginFailure')
            else
                commit('loginSuccess', userData)
        },
        logout({ commit }) {
            commit('logout')
            authService.logout()
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.loggedIn = true;
            state.actualUser = user;
        },
        loginFailure(state) {
            state.loggedIn = false;
            state.actualUser = null;
        },
        logout(state) {
            state.loggedIn = false;
            state.actualUser = null;
        },
        registerSuccess(state) {
            state.loggedIn = false;
        },
        registerFailure(state) {
            state.loggedIn = false;
        },
    },
};
