const url = "http://localhost:8080/api/user";

export async function add(user) {
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