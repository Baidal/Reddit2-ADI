import { createStore } from 'vuex'

import auth from './auth'

export default new createStore({
    modules: {
        auth
    }
})

