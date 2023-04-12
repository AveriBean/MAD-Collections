import * as base from "./baseService";

const model = "comment";

export function getEmptyComment() {

  return {
    commentId: 0,
    userId: 0,
    content: "",
  };
}

export async function findAll() {
  return base.findAll(model);
}

export async function findById(commentId) {
  return base.findById(model, commentId);
}

export async function save(comment) {
  return base.save(model, comment, comment.commentId);
}

export async function deleteById(commentId) {
  return base.deleteById(model, commentId);
}
