const URL = "https://www.liulongbin.top:8888/api/private/v1/"
export const request = async (subURL = '', option = {}) => {
    let token = sessionStorage.token
    option.headers = new Headers({
        "Accept": "application/json, text/plain, */*",
        'Authorization': token,
        "Content-Type": "application/json;charset=UTF-8"
    })
    let response = await fetch(URL + subURL, option)
    if (response.status >= 200 && response.status < 300 || response === 304) {
        return await response.json()
    } else {
        document.write(response.statusText, response.status)
    }
}

