import {request} from './fetch'
export const menus = async () => {
    return await request("menus")
}

export const users = async (pagenum='1', pagesize='5', query="") => {
    return await request(`users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
}

export const updataUsersState = async (uid, type) => {
    return await request(`users/${uid}/state/${type}`, {
        method: "PUT"
    })
}

export const addUser = async (user) => {
    return await request("users", {
        method: "POST",
        body: JSON.stringify(user)
    })
}

export const deleteUser = async id => {
    return await request(`users/${id}`, {
        method: "DELETE"
    })
}

export const editUser = async (id, option = {}) => {
    return await request(`users/${id}`, option)
}

export const setUserRole = async (id) => {
    return await request(`users/${id}/role`, {
        method: 'PUT'
    })
}