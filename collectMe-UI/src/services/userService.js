const url = "http://localhost:8080/api/user";

export async function findById(userId) {
    const response = await fetch(`${url}/${userId}`);
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Could not fetch the user with id ${userId}.`)
}

export async function deleteById(userId) {
    const response = await fetch(`${url}/${userId}`, 
    {method: "DELETE",
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("BG_JWT")}`
    }});
    if (response.ok) {
        return;
    }
    return Promise.reject(`Could not delete the user with id ${userId}.`)
}

async function add(user) {
    const config = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }

    const response = await fetch(url, config);
    if (response.ok) {
        return response.json();
    }

    if(response.status === 400) {
        const errors = await response.json();
        return Promise.reject(errors);
    }
    return Promise.reject();
}

async function update(user) {
    const config = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_JWT")}`

        },
        body: JSON.stringify(user)
    }

    const response = await fetch(`${url}/${user.userId}`, config);
    if (response.ok) {
        return;
    }

    if(response.status === 400) {
        const errors = await response.json();
        return Promise.reject(errors);
    }
    return Promise.reject();
}


export async function save(user) {
    if (user.userId) {
        return update(user);
    } else {
        return add(user);
    }
}