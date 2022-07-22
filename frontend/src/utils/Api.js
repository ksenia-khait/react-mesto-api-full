class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    getProfile(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then(this._checkResponse)
    }

    getInitialCards(token) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
            .then(this._checkResponse)
    }

    editProfile(user) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: user.name,
                about: user.about,
            })
        })
            .then(this._checkResponse)
    }

    addCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(this._checkResponse)
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    deleteLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    editAvatar(avatar) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
            .then(this._checkResponse)
    }
}

export const api = new Api({
    baseUrl: 'https://api.mesto-ksenia.students.nomoredomains.xyz',
    // headers: {
    //     authorization: '5b7257f4-9ad7-4ee1-8d8a-9e0ee2ee2e91',
    //     'Content-Type': 'application/json'
    // }
});
