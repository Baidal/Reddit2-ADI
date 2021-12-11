import axios from 'axios'
import apiUrl from './apiUrl'

import getUserToken from "./getUserToken";
const user_url = apiUrl.USUARIO_API

export default {
    getUser(userName){
        return axios.get(`${user_url}/${userName}`).then(res => res.data)
    },
    getUserCommunities(userId){
        return axios.get(`${user_url}/${userId}/comunidades`).then(res => res.data)
    },
    updateUser(formData){
        const TOKEN = getUserToken()

        return axios.patch(`${user_url}`, formData, { headers: TOKEN})
    }
}