const actualUser = JSON.parse(localStorage.getItem('user'));
const initialState = actualUser ? {loggedIn: true, actualUser } : {loggedIn: false, actualUser: null}

export default {
    namespaced: true,
    initialState: initialState,
    actions: {

    },
    mutations: {

    }
}