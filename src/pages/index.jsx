import Layout from "../layout";
import TodoCard from "../components/todo-card";
import { useSelector } from "react-redux";
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function Home() {
    const { todos } = useSelector(state => state.todo);
    const [parent] = useAutoAnimate();
    return (
        <Layout title="Todolarım">
            <div ref={parent} className="flex flex-col items-center h-screen gap-4 overflow-y-auto w-full p-2 bg-zinc-100">
                {todos?.map((item) => (
                    <TodoCard key={item.id} data={item} />
                ))}
                {todos?.length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-4">

                        <small>Upps! Buralarda birşey yok</small>
                    </div>
                )}
            </div >
        </Layout >
    )
}