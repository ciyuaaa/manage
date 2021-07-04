export const request = async (subURL = '', option = null) => {
    const URL = "https://www.liulongbin.top:8888/api/private/v1/"
    let response = await fetch(URL + subURL, option)
    if (response.status >= 200 && response.status < 300 || response === 304) {
        return await response.json()
    } else {
        document.write(response.statusText, response.status)
    }
    
}


// export const request = (options) => {
//     const URL = "http://152.136.185.210:7878/api/m5"
//     return fetch(URL+options).then((data) => {
//         // console.log(data)
//         return data.json()
//     })
// }