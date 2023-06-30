import { RiDeleteBin6Line } from "react-icons/ri"
import { AiOutlineFieldTime, AiOutlineCheckCircle } from "react-icons/ai"
import classNames from "classnames"
import { deleteTodo, updateTodo } from "../services"
import { useDispatch } from "react-redux"
import { deleteSingleTodo, setLoading, updateSingleTodo } from "../features/todo"
import {LuClipboardEdit} from "react-icons/lu"
import { Link } from "react-router-dom"

export default function TodoCard({ data }) {
    const dispatch = useDispatch();

    const handleUpdate = async () => {
        dispatch(setLoading(true))
        updateTodo({ id: data?.id, action: data?.action, status: data?.status === "2" ? "1" : "2" }).then(res => {
            if (res && res.reasonCode === 1) {
                dispatch(updateSingleTodo(res.payload));
            }
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }

    const handleDelete = async () => {
        dispatch(setLoading(true))
        deleteTodo(data?.id).then(res => {
            if (res && res.reasonCode === 1) {
                dispatch(deleteSingleTodo(Number(res.payload)));
            }
        }).finally(() => {
            dispatch(setLoading(false))
        })
    }

    return (
        <div className={classNames("flex flex-col items-start gap-4 cursor-pointer hover:before:content-[''] hover:before:w-1 hover:before:rounded-md hover:before:absolute hover:before:top-0  hover:before:left-0  hover:before:h-full justify-between group w-full p-6 bg-white rounded-md shadow-md relative", {
            "hover:before:bg-green-500": data?.status === "1",
            "hover:before:bg-zinc-500": data?.status === "2"
        })}>
            <div className="flex justify-center items-center gap-2">
                <div className="h-full">
                    {data?.status === "2" ? (
                        <AiOutlineFieldTime color="gray" size={24} />
                    ) : (
                        <AiOutlineCheckCircle color="green" size={24} />
                    )}
                </div>
                <small dangerouslySetInnerHTML={{__html: data?.action}} />
            </div>
            <div className="flex justify-between items-center border-t-[1px] border-white  w-full">
                <small className="text-[11px] text-zinc-500">{new Date(data?.created_at).toLocaleString("tr-TR")}</small>
                <div className="hidden group-hover:flex gap-2">
                    <button onClick={handleUpdate}>
                        {data?.status === "2" ? (
                            <AiOutlineCheckCircle color="green" size={18} />
                        ) : (
                            <AiOutlineFieldTime color="purple" size={19} />
                        )}
                    </button>
                    <Link to={`/duzenle/${data?.id}`}>
                        <LuClipboardEdit color="indigo" size={16}/>
                    </Link>
                    <button onClick={handleDelete}>
                        <RiDeleteBin6Line color="red" size={18} />
                    </button>
                </div>
            </div>

        </div>
    )
};