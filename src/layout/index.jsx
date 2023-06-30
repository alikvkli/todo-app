import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiOutlineInfoCircle, AiOutlineMenu, AiOutlineCloseCircle } from "react-icons/ai"
import { GiThink } from "react-icons/gi"
import { useState } from "react";
import { addTodo, authService, getAllTodo } from "../services";
import { setLogout, setSingleTodo, setTodos, setUser } from "../features/todo";

export default function Layout({ children, title }) {
    const { login, user, loading } = useSelector(state => state.todo);
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);

    const getAllTodos = async (user_id) => {
        await getAllTodo(user_id).then(res => {
            if (res && res.reasonCode === 1) {
                dispatch(setTodos(res.payload));
            }
        })
    }

    const handleAuth = async () => {
        authService(username).then(res => {
            if (res && res.reasonCode === 1) {
                getAllTodos(res.payload.id)
                setUsername("");
                dispatch(setUser(res.payload));
            }
        })
    }

    const handleAddTodo = () => {
        addTodo({ user_id: user.id, action: text }).then(res => {
            if (res && res.reasonCode === 1) {
                setText("")
                dispatch(setSingleTodo(res.payload));
            }
        })
    }

    const handleMenu = () => {
        setOpen(!open);
    }

    const handleLogout = () => {
        dispatch(setLogout())
        setOpen(false);
    }

    return (
        <div className="w-screen h-screen flex relative">
            <div className={classNames("w-[350px] border-[1px] border-zinc-200 shrink-0 flex flex-col", {
                "max-sm:w-full  max-sm:top-0 max-sm:left-0 max-sm:fixed max-sm:bg-white max-sm:h-full max-sm:pt-8 max-sm:z-10": open || !login,
                "max-sm:hidden": !open && login
            })}>
                <div className={classNames("hidden",{
                    "max-sm:block max-sm:absolute max-sm:right-4 max-sm:top-4": open
                })}>
                    <AiOutlineCloseCircle className="text-indigo-600" size={28} />
                </div>
                <div className="flex flex-col  gap-4 p-4">
                    {login ? (
                        <>
                            <NavLink to="/"
                                className={({ isActive }) => classNames("", { "bg-indigo-500 text-white p-2 rounded-md": isActive })}>
                                Todolarım
                            </NavLink>
                            <NavLink
                                to="/bekleyenler"
                                className={({ isActive }) => classNames("", { "bg-indigo-500 text-white p-2 rounded-md": isActive })}>
                                Bekleyen Todolar
                            </NavLink>
                            <NavLink
                                to="/tamamlananlar"
                                className={({ isActive }) => classNames("", { "bg-indigo-500 text-white p-2 rounded-md": isActive })}>
                                Tamamlanmış Todolar
                            </NavLink>
                            <button onClick={() => handleLogout()} className="text-start">Çıkış Yap</button>
                        </>
                    ) : (
                        <div className="flex items-center justify-center flex-col gap-2">
                            <AiOutlineInfoCircle size={24} />
                            <small className="text-center">Todolarına görüntülemek, düzenlemek ve silmek için giriş yapınız.</small>
                        </div>
                    )}

                </div>
                <div className="mt-auto p-4 flex flex-col gap-2 items-center justify-center">
                    {login ? (
                        <>
                            <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full  focus:outline-none border-[1px] border-zinc-200 p-2 rounded-md text-sm" placeholder="Todo ekle..." />
                            <button onClick={handleAddTodo} disabled={text?.length === 0} className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 disabled:cursor-not-kapatallowed disabled:bg-indigo-400">Ekle</button>
                        </>
                    ) : (
                        <>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full  focus:outline-none border-[1px] border-zinc-200 p-2 rounded-md text-sm" placeholder="Kullanıcı adı" />
                            <button onClick={handleAuth} disabled={username?.length === 0} className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-green-300">Giriş Yap</button>
                        </>
                    )}
                </div>
            </div>
            {login ? (
                <div className="flex flex-col items-center flex-1 justify-start relative">
                    {loading && (
                        <div className="absolute inset-0 flex justify-center items-center z-20 bg-white bg-opacity-30 ">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900">
                                <div className="w-full h-full rounded-full border-t-2 border-b-2 border-gray-900 animate-pulse"></div>
                            </div>
                        </div>
                    )}
                    <div className="flex w-full flex-1 items-center justify-between">
                        <h3 className="text-lg text-center py-4 text-indigo-600 font-semibold border-b-2 border-zinc-100 w-full">{title}</h3>
                        <button onClick={handleMenu} className="pr-3 max-sm:block hidden">
                            <AiOutlineMenu className="text-indigo-600" size={24} />
                        </button>
                    </div>
                    {children}
                </div>
            ) : (
                <div className="flex flex-1 items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <GiThink size={28} />
                        <small>Upps! Buralarda birşey yok</small>
                    </div>
                </div>
            )}
        </div>
    )
}