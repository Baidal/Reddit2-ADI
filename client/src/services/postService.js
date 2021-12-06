import axios from "axios";
import urls from "./apiUrl";
import getUserToken from "./getUserToken";

const url_user_posts = urls.USUARIO_API + "/comunidades/posts"
const url_posts = urls.DEFAULT_API + "posts"
const url_newPost = urls.COMUNIDAD_API
const url_post = urls.POST_API

import {getPaginationUrlString} from '../utils/utils'

export default {
    getPost(postId, offset, limit){
        return axios.get(`${url_post}/${postId}` + getPaginationUrlString(offset, limit))
    },
    async getPosts(offset, limit){
        
        const TOKEN = getUserToken()
        
        if(TOKEN){ //El usuario está logeado, pedimos los posts de las comunidades a las que sigue
            return await axios.get(url_user_posts + getPaginationUrlString(offset, limit), {
                headers: TOKEN
            })
        } else { //El usuario no está loggeado, pedimos todos los posts de la app
            return await axios.get(url_posts + getPaginationUrlString(offset, limit))
        }
    },
    newPost(comName, formData){
        const TOKEN = getUserToken()
        
        return axios.post(`${url_newPost}/${comName}/post`, formData, {headers: TOKEN}).then(resp => {
            return resp.data
        }).catch(err => {
            return err.response.data
        })

    },
    votePost(postId, value){
        const TOKEN = getUserToken()

        return axios.post(`${url_post}/${postId}/voto`, {value}, {headers: TOKEN}).then(res => {
            return res.data
        }).catch(err => {
            return err.response.data
        })
    }
}