import axios from "axios";

const instance = axios.create({
    baseURL: "https://alikvkli.dev/gateway/api/v1"
    //baseURL: "http://127.0.0.1:8000/api/v1"
});


export const authService = async (username) => {
    const data = new FormData();
    data.append("username", username);
    const res = await instance.post("/auth", data);
    return res.data
}

export const getAllTodo = async (user_id) => {
    const res = await instance.get(`/todos?user_id=${user_id}`);
    return res.data;
}

export const addTodo = async (request) => {
    const { user_id, action } = request;
    const data = new FormData();
    data.append("user_id", user_id);
    data.append("action", action);
    const res = await instance.post("/add", data);
    return res.data;
}

export const updateTodo = async (request) => {
    const { id, action, status } = request;
    const res = await instance.patch(`/update/${id}`,  {action, status})
    return res.data;
}

export const deleteTodo = async (id) => {
    const res = await instance.delete(`/delete/${id}`);
    return res.data;
}