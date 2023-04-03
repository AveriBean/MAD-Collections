var content = document.getElementById("content");

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        let imgPaths = JSON.parse(xhr.responseText);
        let html = "";
        imgPaths.forEach(path => {
            html += `<div class="col">
            <a href="${path}" target="imagePreview"><img src="${path}" width="250"></a>
            </div>`;
        });
        content.innerHTML = html;
    }
};
xhr.open("GET", "/image-paths", true);
xhr.send();

