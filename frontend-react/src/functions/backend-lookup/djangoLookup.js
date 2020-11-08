import getCookie from './getCookie'

function lookup(method, url, data, callback) {
    const xhr = new XMLHttpRequest()
    const jsonData = JSON.stringify(data)
    xhr.responseType = "json"
    xhr.open(method,`http://${window.location.hostname}:8000/api${url}`)
    const csrftoken = getCookie('csrftoken')
    if (method === "POST" || method === "DELETE"){
      xhr.setRequestHeader("Content-Type", "application/json")
      // xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest")
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest")
      xhr.setRequestHeader("X-CSRFToken", csrftoken)
    }
    xhr.onload = function() {
      callback(xhr.response, xhr.status)
    }
    xhr.send(jsonData)
}
export default lookup