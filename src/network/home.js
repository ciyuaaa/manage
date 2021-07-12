import {request} from './fetch'
export const menus = async () => {
    return await request("menus")
}

export const getUsers = async (pagenum='1', pagesize='5', query="") => {
    return await request(`users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
}

export const updataUsersState = async (uid, type) => {
    return await request(`users/${uid}/state/${type}`, {
        method: "PUT"
    })
}

export const setUserRole = async (id, rids) => {
    return await request(`users/${id}/role`, {
        method: 'PUT',
        body: JSON.stringify(rids)
    })
}

export const getRightsList = async () => {
    return await request('rights/list')
}

export const getRoles = async () => {
    return await request("roles")
}

export const add = async (url, form) => {
    return await request(url, {
        method: 'POST',
        body: JSON.stringify(form)
    })
}

export const del = async (url) => {
    return await request(url, {
        method: "DELETE"
    })
}

export const edit = async (url, option = {}) => {
    return await request(url, option)
}

export const get = async (url, option = {}) => {
    return await request(url, option)
}

export const setRoleRights = async (roleId, rids) => {
    return await request(`roles/${roleId}/rights`, {
        method: "POST",
        body: JSON.stringify(rids),
    })
}