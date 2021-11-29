import axios from "axios";
import urls from "./apiUrl";

import {getPaginationUrlString} from '../utils/utils'

const comunidadesUrl = urls.DEFAULT_API + 'comunidades';

export default {
    async getCommunities(offset, limit){
        return await axios.get(comunidadesUrl + getPaginationUrlString(offset, limit))
    }
}