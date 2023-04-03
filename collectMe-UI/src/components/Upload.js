import { useState, useRef } from "react";

export default function Upload() {
  const [currentFile, setCurrentFile] = useState();
  const [hasError, setHasError] = useState(false);
  const preview = useRef();
  const imgPreview = useRef();

  function handleChange(evt) {
    if (evt.target.files.length === 0) {
      return;
    }

    let reader = new FileReader();
    reader.onload = function () {
      imgPreview.current.src = reader.result;
      preview.current.style.display = "block";
    };
    setCurrentFile(evt.target.files[0]);
    reader.readAsDataURL(evt.target.files[0]);
  }

  function handleClick() {
    const formData = new FormData();
    formData.append("file", currentFile, currentFile.name);

    const init = {
      method: "POST",
      body: formData,
    };

    fetch("/upload", init)
      .then((response) => {
        if (!response.ok) setHasError(true);
      })
      .catch(() => {
        setHasError(true);
      });
  }

  return (
    <>
      <div class="container col-4">
        <div class="row">
          <h3 class="col">Upload Image</h3>
          <div class="col">{/* <a href="/album.html">Go to Album</a> */}</div>
        </div>

        <div class="form-group mb-2">
          <input
            class="form-control"
            type="file"
            id="theFile"
            onChange={handleChange}
          />
        </div>

        <div class="form-group">
          <button class="btn btn-primary" id="btnUpload" onClick={handleClick}>
            Upload
          </button>
        </div>

        <div ref={preview} class="form-group">
          <img ref={imgPreview} alt="preview" />
        </div>

        {hasError && (
          <div id="logPanel" class="alert alert-danger">
            Upload Failed
          </div>
        )}
      </div>
    </>
  );
}
