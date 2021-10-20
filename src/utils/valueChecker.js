module.exports = (value) => {
    if (isNaN(value) || (value !== -1 && value !== 1)) {
        return false
    }

    return true
}