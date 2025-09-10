import axios from "axios";

const API_BASE = "http://localhost:5000"; // backend URL

export const fetchBoard = () => axios.get(`${API_BASE}/board`);
export const addTask = (content, columnId) =>
  axios.post(`${API_BASE}/task`, { content, columnId });
export const deleteTask = (taskId) =>
  axios.delete(`${API_BASE}/task/${taskId}`);
export const moveTask = (
  sourceColumnId,
  destColumnId,
  sourceIndex,
  destIndex,
  taskId
) =>
  axios.post(`${API_BASE}/move`, {
    sourceColumnId,
    destColumnId,
    sourceIndex,
    destIndex,
    taskId,
  });
