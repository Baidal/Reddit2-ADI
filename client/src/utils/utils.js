export const getPaginationUrlString = (offset, limit) => {
    return `?page=${offset}&limit=${limit}`
}

export const getProfileImage = (url_image) => {
    return url_image ? "http://localhost:3000" + url_image : require('../assets/reddit-avatar.png')
}