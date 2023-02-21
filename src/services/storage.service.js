const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

const loadData = key => {
    return localStorage.getItem(key)
}

const getById = (key, id) => {
    const storage = localStorage.getItem(key)
    const data = JSON.parse(storage)
    const index = data.findIndex(element => element.id === id)
    return data[index]
}

module.exports = {
    saveData,
    loadData,
    getById
}