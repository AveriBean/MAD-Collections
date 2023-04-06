async function createSession() {
    const config = {
        method: "POST"
    };
    const response = await fetch("http://localhost:8080/api/create/session", config);

    if (response.ok) {
        const url = await response.text();
        window.location = url;
    }
}

document.querySelector("button")
    .addEventListener("click", createSession);