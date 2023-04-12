import { useEffect, useRef, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { findAll } from "../services/categoryService";
import { findAllActions } from "../services/actionService";
import { GetEmptyItem, save } from "../services/itemService";
import AuthContext from "../contexts/AuthContext";
import Upload from "./Upload";
import { findById } from "../services/itemService";

const fieldNames = ["Item Name", "Item Description", "Item Value"];

export default function ItemForm() {
  const [errors, setErrors] = useState([]);
  const [errMap, setErrMap] = useState({});
  const [wait, setWait] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [field, setField] = useState([]);
  const formRef = useRef();
  const { itemId } = useParams();
  const [currentItem, setCurrentItem] = useState(GetEmptyItem());
  const [categories, setCategories] = useState([]);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    findAll()
      .then((result) => {
        setCategories(result);
        setWait(false);
      })
      .catch(() => navigate("/500"));
  }, []);

  useEffect(() => {
    findAllActions()
      .then((result) => {
        setActions(result);
        setWait(false);
      })
      .catch(() => navigate("/500"));
  }, []);

  useEffect(() => {
    if (itemId) {
      findById(itemId).then((result) => {
        setCurrentItem(result);
        console.log(currentItem);
        setWait(false);
      });
      // .catch(() => navigate("/500"));
    }
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();

    const form = formRef.current;
    setErrMap({});

    save(currentItem)
      .then(() => navigate("/items"))
      .catch((errs) => {
        if (errs) {
          const errsString = errs.toString();
          console.log(errsString);
          if (errsString.includes("Unexpected end of JSON")) {
            navigate(-1);
            return;
          }
          const map = {};
          for (const err of errs) {
            for (const fieldName of fieldNames) {
              if (err.includes(`\`${fieldName}\``)) {
                form.querySelector(`#${fieldName}`).setCustomValidity(err);
                map[fieldName] = err;
              }
            }
          }

          setErrMap(map);
          form.classList.add("was-validated");
          setErrors(errs);
        } else {
          navigate(-1);
        }
      });
  }

  function handleChange(evt) {
    const nextItem = { ...currentItem };
    // console.log(nextItem);
    if (evt.target.name === "actions") {
      nextItem[evt.target.name] = handleActions(evt);
    } else if (evt.target.name === "categories") {
      nextItem[evt.target.name] = handleCategories(evt);
    } else {
      nextItem[evt.target.name] = evt.target.value;
    }
    setCurrentItem(nextItem);
  }

  function handleUrl(dataUrl) {
    const nextItem = { ...currentItem };
    nextItem.image = dataUrl;
    setCurrentItem(nextItem);
  }

  function handleCategories(evt) {
    const categoryId = parseInt(evt.target.value);
    const categories = [...currentItem.categories];

    // if the checkbox is checked, add the value
    if (evt.target.checked) {
      categories.push({ categoryId: categoryId, categoryName: "" });
    } else {
      // otherwise, remove it
      const categoryIndex = categories.findIndex(
        (c) => c.categoryId === categoryId
      );
      if (categoryIndex >= 0) {
        categories.splice(categoryIndex, 1);
      }
    }
    return categories;
  }

  const handleActions = function (evt) {
    const actionId = parseInt(evt.target.value);
    const actions = [...currentItem.actions];

    // if the checkbox is checked, add the value
    if (evt.target.checked) {
      actions.push({ actionId: actionId, status: "" });
    } else {
      // otherwise, remove it
      const actionIndex = actions.findIndex((a) => a.actionId === actionId);
      if (actionIndex >= 0) {
        actions.splice(actionIndex, 1);
      }
    }
    return actions;
  };

  // const options = actions.map((a) => ({
  //   value: a.actionId,
  //   label: a.status,
  // }));

  return (
    <div className="container my-3 col-4 border rounded border-dark">
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className="needs-validation"
        noValidate
      >
        <div>
          <label htmlFor="itemName" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            className="form-control"
            value={currentItem.itemName}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            {errMap.itemName ? errMap.itemName : "Please choose an item name."}
          </div>
        </div>
        <div>
          <label htmlFor="description" className="form-label">
            Item Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-control"
            value={currentItem.description}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            {errMap.description
              ? errMap.description
              : "Please provide an item description."}
          </div>
        </div>
        <div>
          <label htmlFor="value" className="form-label">
            Item Value
          </label>
          <input
            type="number"
            id="value"
            name="value"
            className="form-control"
            value={currentItem.value}
            onChange={handleChange}
            required
          />
          <div className="invalid-feedback">
            {errMap.value ? errMap.value : "Please provide an item value."}
          </div>
        </div>
        <div>
          <h3>Actions</h3>
          {/* <Select
            defaultValue={"viewable"}
            isMulti
            name="actions"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            // onChange={handleChange}
          /> */}

          {actions.map((a) => (
            <div>
              <input
                key={a.actionId}
                type="checkbox"
                value={a.actionId}
                id={a.status}
                name="actions"
                checked={currentItem.actions.find(
                  (act) => act.actionId === a.actionId
                )}
                onChange={handleChange}
              />
              <label htmlFor={a.status}>{a.status}</label>
            </div>
          ))}
        </div>

        <div>
          <h3>Categories</h3>

          {categories.map((c) => (
            <div>
              <input
                key={c.categoryId}
                type="checkbox"
                value={c.categoryId}
                id={c.categoryName}
                name="categories"
                checked={currentItem.categories.find(
                  (ca) => ca.categoryId === c.categoryId
                )}
                onChange={handleChange}
              />
              <label htmlFor={c.categoryName}>{c.categoryName}</label>
            </div>
          ))}
        </div>
        <div>
          <Upload style={{ width: "auto" }} handleUrl={handleUrl} />
        </div>
        <div>
          <button type="submit" className="btn dark-pop me-2">
            Save
          </button>
          <button onClick={() => navigate(-1)} className="btn yellow-pop ms-0">
            Cancel
          </button>
        </div>
        {errors.length > 0 && (
          <div className="alert alert-danger mt-2">
            <ul className="mb-0">
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}
