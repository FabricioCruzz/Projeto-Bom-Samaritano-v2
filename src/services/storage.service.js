const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

const loadData = key => {
    return localStorage.getItem(key)
}

module.exports = {
    saveData,
    loadData
}