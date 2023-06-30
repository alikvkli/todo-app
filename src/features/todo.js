import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    login: false,
    user: {},
    todos: [],
    loading: false,
}

const resetState = () => initialState;

const todo = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, username } = action.payload;
            state.user = { id, username };
            state.login = true;
        },
        setTodos: (state, action) => {
            state.todos = action.payload.sort((a, b) => b.id - a.id);
        },
        setSingleTodo: (state, action) => {
            const temp = [...state.todos, action.payload];
            state.todos = temp.sort((a, b) => b.id - a.id);
        },
        updateSingleTodo: (state, action) => {
            const temp = state.todos;
            const findIndex = temp.findIndex(item => item.id === action.payload.id);
            if (findIndex !== -1) {
                temp[findIndex] = action.payload;
                state.todos = temp;
            }
        },
        deleteSingleTodo: (state,action) => {
            const temp = state.todos;
            const findIndex = temp.findIndex(item => item.id === action.payload);
            if(findIndex !== -1){
                temp.splice(findIndex, 1);
                state.todos = temp;
            }
        },
        setLoading : (state,action) => {
            state.loading = action.payload;
        },
        setLogout: (state) => resetState()
    }
});

export const {
    setUser,
    setLogout,
    setTodos,
    setSingleTodo,
    updateSingleTodo,
    deleteSingleTodo,
    setLoading
} = todo.actions;

export default todo.reducer;