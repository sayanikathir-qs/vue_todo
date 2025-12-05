import { api} from "../utils/api";

export const todoApi = {
  get() {
    return api.get("/todos");
  },

  post(data) {
    return api.post("/todos", data);
  },

  put(id, data) {
    return api.put(`/todos/${id}`, data);
  },

  delete(id) {
    return api.delete(`/todos/${id}`);
  }
};
