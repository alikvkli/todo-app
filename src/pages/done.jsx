import Layout from "../layout";
import TodoCard from "../components/todo-card";
import { useSelector } from "react-redux";
import { useAutoAnimate } from '@formkit/auto-animate/react'
export default function Done() {
    const { todos } = useSelector(state => state.todo);
    const [parent] = useAutoAnimate();

    return (
        <Layout title="Tamamlanmış Todolar">
            <div ref={parent} className="fflex flex-col items-center h-screen gap-4 overflow-y-auto w-full p-2 bg-zinc-100">
                {todos?.filter(item => item.status === "1")?.map((item) => (
                    <TodoCard key={item.id} data={item} />
                ))}
                {todos?.filter(item => item.status === "1")?.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <small>Upps! Buralarda birşey yok</small>
                    </div>
                )}
            </div >
        </Layout >
    )
}