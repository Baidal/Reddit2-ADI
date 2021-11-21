import axios from 'axios'
import urls from './apiUrl'

const login = urls.DEFAULT_API + 'login'

export default {
    login(nickEmail, password){
       return axios.post(login, {
            nickEmail,
            password
        }).then(resp => { //el login ha sido correcto
            localStorage.setItem('user', JSON.stringify(resp.data))
        }).finally(resp => resp.data)
    },
    logout(){
        localStorage.removeItem('user')
    },
    register(userData) {
        
    }
}