const url = "http://localhost:8080/api";

export async function findAll(model) {
    const response = await fetch(`${url}/${model}`);
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`could not find all ${model}`)
}

export async function findById(model, id) {
    const response = await fetch(`${url}/${model}/${id}`);
    if (response.ok) {
        return response.json();
    }
    if (response.status === 404) {
        return null;
    }
    return Promise.reject(`could not find ${model} id ${id}`);
}

async function sendBody(instance, method, theUrl) {

    const config = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("BG_JWT")}`
        },
        body: JSON.stringify(instance)
    }

    const response = await fetch(theUrl, config);
    if (response.ok) {
        return response.json();
    }

    if (response.status === 400) {
        const errors = await response.json();
        return Promise.reject(errors);
    }
    return Promise.reject();
}

export async function save(model, instance, id) {
    if (id) {
        return sendBody(instance, "PUT", `${url}/${model}/${id}`);
    } else {
        return sendBody(instance, "POST", `${url}/${model}`);
    }
}

export async function deleteById(model, id) {

    const config = {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("BG_JWT")}`
        },
    }

    const response = await fetch(`${url}/${model}/${id}`, config);
    if (response.ok) {
        return;
    }
    return Promise.reject(`Could not delete ${model} with id ${id}.`)
}