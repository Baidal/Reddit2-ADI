export const getPaginationUrlString = (offset, limit) => {
    return `?page=${offset}&limit=${limit}`
}

export const getProfileImage = (url_image) => {
    return url_image ? "http://localhost:3000" + url_image : 'https://i.redd.it/snoovatar/avatars/b1e6347b-2c55-4d41-9041-b3fd0c549191.png'
}