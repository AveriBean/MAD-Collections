import * as base from "./baseService";

const model = "action";

export function getEmptyAction() {
  return {
    actionId: "",
    status: "",
  };
}

export async function findAllActions() {
  return base.findAll(model);
}

export async function findById(actionId) {
  return base.findById(model, actionId);
}

export async function save(action) {
  return base.save(model, action, action.actionId);
}

export async function deleteById(actionId) {
  return base.deleteById(model, actionId);
}
