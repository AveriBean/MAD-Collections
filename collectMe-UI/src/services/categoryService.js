import * as base from "./baseService";

const model = "category";

export function getEmptyCategory() {

  return {
    categoryId: 0,
    name: "",
    items: [],
  };
}

export async function findAll() {
  return base.findAll(model);
}

export async function findById(categoryId) {
  return base.findById(model, categoryId);
}

export async function save(category) {
  return base.save(model, category, category.categoryId);
}

export async function deleteById(categoryId) {
  return base.deleteById(model, categoryId);
}
