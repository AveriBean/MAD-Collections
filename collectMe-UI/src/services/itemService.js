import * as base from "./baseService";

const model = "item";

export function getEmptyItem() {
  return {
    itemId: 0,
    name: "",
    description: "",
    value: 0,
    userId: 0,
    image: "",
    actions: [],
    categories: [],
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
