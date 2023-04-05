import { useState, useRef } from "react";

export default function Upload({ handleUrl }) {
  const [currentFile, setCurrentFile] = useState();
  const [hasError, setHasError] = useState(false);
  const [dataUrl, setDataUrl] = useState({});
  const preview = useRef();
  const imgPreview = useRef();

  function handleChange(evt) {
    if (evt.target.files.length === 0) {
      return;
    }

    let reader = new FileReader();
    reader.onload = function () {
      setDataUrl(reader.result);
      // console.log(reader.result);
      handleUrl(reader.result);
      imgPreview.current.src = reader.result;
      preview.current.style.display = "block";
    };
    setCurrentFile(evt.target.files[0]);
    reader.readAsDataURL(evt.target.files[0]);
    // setDataUrl(reader.readAsDataURL(evt.target.files[0]));
    // console.log(dataUrl);
    // handleDataUrl(dataUrl);
    // console.log(currentFile);
    // toDataUrl(evt);
  }

  // function toDataUrl(evt) {
  //   if (evt.target.files.length === 0) {
  //     return;
  //   }
  //   let reader = new FileReader();
  //   setDataUrl(reader.readAsDataURL(currentFile));
  //   console.log(dataUrl);
  // }

  // function handleClick(evt) {
  //   evt.preventDefault();
  //   if (!currentFile) {
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append("file", currentFile, currentFile.name);
  //   console.log(currentFile);
  //   // return;

  //   const init = {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("BG_JWT")}`,
  //     },
  //     body: formData,
  //   };
  //   console.log(init);
  //   fetch("http://localhost:8080/upload", init)
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.text();
  //       }
  //       return Promise.reject();
  //     })
  //     .then((relativePath) => {
  //       console.log(relativePath);
  //       handleUrl(relativePath);
  //     })
  //     .catch(() => {
  //       setHasError(true);
  //     });
  // }

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <h3 className="col">Upload Image</h3>
          <div className="col">
            {/* <a href="/album.html">Go to Album</a> */}
          </div>
        </div>

        <div className="form-group mb-2">
          <input
            className="form-control"
            type="file"
            id="theFile"
            onChange={handleChange}
          />
        </div>

        {/* <div className="form-group">
          <button
            style={{
              background: "black",
              border: "1px solid lightsteelblue",
              color: "#D3D3D3",
              margin: "5%",

              boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
            }}
            className="btn btn-primary ms-0"
            id="btnUpload"
            onClick={handleClick}
          >
            Upload
          </button>
        </div> */}

        <div ref={preview} className="form-group">
          <img ref={imgPreview} alt="preview" />
        </div>

        {hasError && (
          <div id="logPanel" className="alert alert-danger">
            Upload Failed
          </div>
        )}
      </div>
    </>
  );
}
