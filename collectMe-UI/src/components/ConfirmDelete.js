import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { findById, deleteById } from "../services/itemService";

export default function ConfirmDelete() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (itemId) {
      findById(itemId)
        .then(setItem)
        .catch(() => navigate("/"));
    } else {
      navigate(-1);
    }
  }, []);

  function handleDelete() {
    deleteById(item.itemId).finally(() => navigate(-2));
  }

  return (
    <>
      <div className="container alert alert-danger col-4">
        <div className="alert alert-danger">
          Are you sure you want to delete {item.itemName}?
        </div>
        <div>
          <button
            onClick={handleDelete}
            style={{
              background: "black",
              border: "1px solid lightsteelblue",
              color: "#D3D3D3",
              margin: "5%",
              boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
            }}
            className="btn btn-primary me-2"
          >
            Delete
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "#FFD700",
              border: "1px solid lightsteelblue",
              color: "black",
              margin: "5%",
              boxShadow: "5px 5px 3px rgba(46, 46, 46, 0.62)",
            }}
            className="btn ms-0"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
