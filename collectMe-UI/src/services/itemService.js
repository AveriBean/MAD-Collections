import * as base from "./baseService";

const model = "item";

export function getEmptyItem() {
  return {
    itemId: 0,
    name: "",
    description: "",
    value: 0,
    userId: 2,
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

export async function findById(itemId) {
  return base.findById(model, itemId);
}

export async function save(item) {
  return base.save(model, item, item.itemId);
}

export async function deleteById(itemId) {
  return base.deleteById(model, itemId);
}
