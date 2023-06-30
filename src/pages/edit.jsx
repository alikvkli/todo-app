import { useNavigate, useParams } from "react-router-dom";
import Layout from "../layout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateSingleTodo } from "../features/todo";
import { updateTodo } from "../services";

export default function Edit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { todos } = useSelector(state => state.todo);
    const todoItem = todos?.find(item => item.id === Number(id));
    const [text, setText] = useState(todoItem.action?.replaceAll(/<br>/g, '\n'));
    
    const handleEdit = () => {
        dispatch(setLoading(true));
        updateTodo({id: id, status: todoItem.status, action: text.replace(/\n/g, '<br>') }).then(res => {
            if(res && res.reasonCode === 1){
                dispatch(updateSingleTodo(res.payload))
                navigate(-1);
            }
        }).finally(() => {
            dispatch(setLoading(false));
        })
    }
    
    return (
        <Layout
            element={<button disabled={text.length === 0} onClick={handleEdit} className="w-fit mr-4  bg-indigo-500 text-white py-1 px-2 rounded-md hover:bg-indigo-600 disabled:cursor-not-kapatallowed disabled:bg-indigo-400">Kaydet</button>}
            title="Düzenle">
            <div className="flex flex-col items-center h-screen gap-4 overflow-y-auto w-full p-2 bg-zinc-100" >
                <div className="flex flex-col items-start justify-between gap-4 w-full bg-white rounded-md shadow-md p-4">
                    <textarea value={text} onChange={e => setText(e.target.value)} className="w-full h-screen  resize-none focus:outline-none border-[1px] border-zinc-200 p-2 rounded-md text-sm" placeholder="Todo düzenle..." />
                </div>
            </div>
        </Layout>
    )
}