function byId(id) {
    return document.getElementById(id);
}

const imgPreview = byId("imgPreview");
const preview = byId("preview");
const logPanel = byId("logPanel");
let currentFile;

byId('theFile').addEventListener("change", function () {

    logPanel.className = "alert d-none";

    if (this.files.length === 0) {
        return;
    }

    let reader = new FileReader();
    reader.onload = function () {
        imgPreview.src = reader.result;
        preview.style.display = "block";
    };
    currentFile = this.files[0];
    reader.readAsDataURL(currentFile);

}, false);

byId("btnUpload").addEventListener("click", function () {

    const formData = new FormData();
    formData.append("file", currentFile, currentFile.name);

    const init = {
        method: "POST",
        body: formData
    };

    fetch("/upload", init)
        .then(() => {
            logPanel.className = "alert alert-success";
            logPanel.innerText = "Success!";
            preview.style.display = "none";
        })
        .catch(() => {
            logPanel.className = "alert alert-danger";
            logPanel.innerText = "Failed!";
            preview.style.display = "none";
        });
});