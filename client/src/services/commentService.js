import axios from "axios";
import urls from "./apiUrl";

const commentUrl = urls.POST_API;
import getUserToken from "./getUserToken";

export default {
    createComment(postId, commentText, commentId) {
        const payLoad = {
            text: commentText,
            commentId: commentId ? commentId : -1,
        };

        return axios
            .post(`${commentUrl}/${postId}/comentario`, payLoad, {
                headers: getUserToken(),
            })
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                return err.response.data;
            });
    },
    voteComment(commentId, value) {
        const TOKEN = getUserToken();

        return axios
            .post(
                `${urls.COMENTARIO_API}/${commentId}/voto`,
                { value },
                { headers: TOKEN }
            )
            .then((res) =>  res.data)
            .catch((err) => err.response.data);
    },
};
