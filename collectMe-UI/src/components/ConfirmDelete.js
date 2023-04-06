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
      <div className="container alert alert-danger my-5 col-4">
        <div className="alert alert-danger">
          Are you sure you want to delete {item.itemName}?
        </div>
        <div>
          <button onClick={handleDelete} className="btn dark-pop m-0 me-2">
            Delete
          </button>
          <button onClick={() => navigate(-1)} className="btn yellow-pop m-0">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
