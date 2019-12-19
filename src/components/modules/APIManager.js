const remoteURL = "http://localhost:5002"

export default {
    get(restOfTheUrl) {
        return fetch(`${remoteURL}/${restOfTheUrl}`)
            .then(r => r.json())
    },
    post(restOfTheUrl, newItem) {
        return fetch(`${remoteURL}/${restOfTheUrl}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newItem)
        }).then(data => data.json())
    },
    patch(endpoint, id, changedItem) {
        return fetch(`${remoteURL}/${endpoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(changedItem)
        }).then(data => data.json())
    },
    delete(page, id) {
        return fetch(`${remoteURL}/${page}/${id}`, {
            method: "DELETE",
        }).then(data => data.json())
    }
}