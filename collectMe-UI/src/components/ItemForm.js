import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getEmptyItem, getTestItem, save } from "../services/itemService";

const fieldNames = ["Item Name", "Item Description", "Item Value"];

export default function ItemForm() {
  const [currentItem, setCurrentItem] = useState(getEmptyItem());
  const [errors, setErrors] = useState([]);
  const [errMap, setErrMap] = useState({});
  const [wait, setWait] = useState(true);

  const formRef = useRef();

  //   const navigate = useNavigate();
  //   const { id } = useParams();

  function handleSubmit(evt) {
    evt.preventDefault();

    save(currentItem).then().catch();
  }

  function handleChange(evt) {
    const nextItem = { ...currentItem };
    console.log(nextItem);
    if (evt.target.name === "actions") {
      nextItem[evt.target.name] = handleActions(evt);
    } else if (evt.target.name === "categories") {
      nextItem[evt.target.name] = handleCategories(evt);
    } else {
      nextItem[evt.target.name] = evt.target.value;
    }
    setCurrentItem(nextItem);
  }

  function handleCategories(evt) {
    const categoryId = parseInt(evt.target.value);
    const categories = [...currentItem.categories];
    // debugger;
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
    // debugger;
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

  return (
    <div className="container col-4 border rounded border-info">
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
          <div>
            <input
              type="checkbox"
              value="1"
              id="chkViewable"
              name="actions"
              checked={currentItem.actions.find((a) => a.actionId === 1)}
              onChange={handleChange}
            />
            <label htmlFor="chkViewable">Viewable</label>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            value="2"
            id="chkViewable"
            name="actions"
            checked={currentItem.actions.find((a) => a.actionId === 2)}
            onChange={handleChange}
          />
          <label htmlFor="chkTradeable">Tradeable</label>
        </div>
        <div>
          <input
            type="checkbox"
            value="3"
            id="chkSaleable"
            name="actions"
            checked={currentItem.actions.find((a) => a.actionId === 3)}
            onChange={handleChange}
          />
          <label htmlFor="chkSaleable">Saleable</label>
        </div>
        <div>
          <input
            type="checkbox"
            value="4"
            id="chkNegotiable"
            name="actions"
            checked={currentItem.actions.find((a) => a.actionId === 4)}
            onChange={handleChange}
          />
          <label htmlFor="chkNegotiable">Negotiable</label>
        </div>
        <div>
          <h3>Categories</h3>
          <div>
            <input
              type="checkbox"
              value="1"
              id="chkPokemon"
              name="categories"
              checked={currentItem.categories.find((c) => c.categoryId === 1)}
              onChange={handleChange}
            />
            <label htmlFor="chkPokemon">Pokemon</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="2"
              id="chkMagic"
              name="categories"
              checked={currentItem.categories.find((c) => c.categoryId === 2)}
              onChange={handleChange}
            />
            <label htmlFor="chkMagic">Magic</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="3"
              id="chkBaseball"
              name="categories"
              checked={currentItem.categories.find((c) => c.categoryId === 3)}
              onChange={handleChange}
            />
            <label htmlFor="chkBaseball">Baseball</label>
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary me-2">
            Save
          </button>
          <button className="btn btn-warning">Cancel</button>
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

        {/* <div>
          <button type="submit" className="btn btn-primary me-2">
            Save
          </button>
          <Link to="/" className="btn btn-warning">
            Cancel
          </Link>
        </div>
         {errors.length > 0 && (
          <div className="alert alert-danger mt-2">
            <ul className="mb-0">
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))} 
            </ul>
          </div>
        )}  */}
      </form>
    </div>
  );
}
