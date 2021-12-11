import authService from '../services/authService'

const actualUser = JSON.parse(localStorage.getItem("user"));
const initialState = actualUser
    ? { loggedIn: true, actualUser }
    : { loggedIn: false, actualUser: null };

/**
 * El contenido de actualUser será:
 *      actualUser: {
 *          user: {
 *              datos...   
 *          },
 *          token: "ddadasdajfldskjflskfjsldkjf"
 *      }
 */

export default {
    namespaced: true,
    state: initialState,
    actions: {
        async login({ commit }, {nickEmail, password}) {
            const userData = await authService.login(nickEmail, password)
            if(userData.errores)
                commit('loginFailure')
            else
                commit('loginSuccess', userData)

            return userData
        },
        logout({ commit }) {
            commit('logout')
            authService.logout()
        },
        async register({ commit }, userData) {
            const response = await authService.register(userData)

            commit('register')

            return response;
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
        register(state) {
            state.loggedIn = false;
        },
        updateUser(state, user){
            const userLocalStorage = JSON.parse(localStorage.getItem("user"))
                userLocalStorage.user.nick = user.nick
                userLocalStorage.user.description = user.description
                userLocalStorage.user.url_image = user.url_image
            localStorage.setItem("user", JSON.stringify(userLocalStorage));

            state.actualUser.user.nick = user.nick;
            state.actualUser.user.description = user.description;
            state.actualUser.user.url_image = user.url_image

        },
        incrementCommunities(state){
            state.actualUser.user.numCommunities++
        }  
    },
    getters: {
        userLoggedIn(state) {
            return state.loggedIn
        },
        getUser(state){
            return state.actualUser.user
        },
        getUserToken(state){
            return state.actualUser.token
        },
        getUserCommunities(state){
            return state.actualUser.user.numCommunities
        }
    }
};
