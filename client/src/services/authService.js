import axios from 'axios'
import urls from './apiUrl'

const login = urls.DEFAULT_API + 'login'

module.exports = {
    login(nickEmail, password){
        axios.post(login, {
            nickEmail,
            password
        }).then(resp => { //el login ha sido correcto
            localStorage.setItem('user', JSON.stringify(resp.data))
        }).finally(resp => resp.data)
    }
}