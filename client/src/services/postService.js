import axios from "axios";
import urls from "./apiUrl";
import getUserToken from "./getUserToken";

const url_user_posts = urls.USUARIO_API + "/comunidades/posts"
const url_posts = urls.DEFAULT_API + "posts"

import {getPaginationUrlString} from '../utils/utils'

export default {
    async getPosts(offset, limit){
        
        const TOKEN = getUserToken()
        
        if(TOKEN){ //El usuario está logeado, pedimos los posts de las comunidades a las que sigue
            return await axios.get(url_user_posts + getPaginationUrlString(offset, limit), {
                headers: TOKEN
            })
        } else { //El usuario no está loggeado, pedimos todos los posts de la app
            return await axios.get(url_posts + getPaginationUrlString(offset, limit))
        }

        
    }
}