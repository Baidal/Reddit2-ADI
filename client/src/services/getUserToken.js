const user = JSON.parse(localStorage.getItem("user"))

export default () => {
    if(user && user.token){
        return{ Authorization: `Bearer ${user.token}`}
    }
}