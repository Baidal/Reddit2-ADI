import axios from "axios";
import urls from "./apiUrl";

const login = urls.DEFAULT_API + "login";
const register = urls.DEFAULT_API + "register";

export default {
    login(nickEmail, password) {
        console.log(login)
        return axios
            .post(login, {
                nickEmail,
                password,
            })
            .then((resp) => {
                //el login ha sido correcto
                localStorage.setItem("user", JSON.stringify(resp.data));
                return resp.data
            })
            .catch((err) => err.response.data);
    },
    logout() {
        localStorage.removeItem("user");
    },
    register(userData) {
        const payLoad = {
            email: userData.email,
            password: userData.password,
            nick: userData.nick,
            descripcion: userData.descripcion,
        };

        return axios.post(register, payLoad).then((resp) => resp.data);
    },
};
