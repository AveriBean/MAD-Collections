import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import * as base from "./baseService";

const model = "item";

export function GetEmptyItem() {
  const { user } = useContext(AuthContext);

  return {
    itemId: 0,
    name: "",
    description: "",
    value: 0,
    userId: user.userId,
    image: "",
    actions: [],
    categories: [],
  };
}

export function getTestItem() {
  return {
    itemId: 2,
    itemName: "Pokemon card B",
    description: "Pokemon card B",
    value: 25.0,
    userId: 1,
    image: "TestImage",
    actions: [
      {
        actionId: 1,
        status: "viewable",
      },
      {
        actionId: 2,
        status: "tradeable",
      },
    ],
    categories: [
      {
        categoryId: 1,
        categoryName: "Pokemon",
      },
    ],
  };
}

export async function findAll() {
  return base.findAll(model);
}

export async function findAllByCategory(categoryId) {
  const response = await fetch(`http://localhost:8080/api/item/category/${categoryId}`);
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`could not find all items for category ${categoryId}`);
}

export async function findById(itemId) {
  return base.findById(model, itemId);
}

export async function save(item) {
  return base.save(model, item, item.itemId);
}

export async function deleteById(itemId) {
  return base.deleteById(model, itemId);
}
