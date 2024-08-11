import { useState } from "react";
import useTodo from "../context/TodoContext";

function TodoForms() {
    const [todoTitle, setTodoTitle] = useState('')
    const {addTodo} = useTodo()
    const handleAdd = (e) => {
        e.preventDefault();
        
        if(!todoTitle) return;

        addTodo({
            id: Date.now(), 
            todoTitle,          // If Key and the value has the same name mention only one of them.
            completed: false
        })
        setTodoTitle("")
        
    }   
    return (
        <form  
            onSubmit={handleAdd}
            className="flex">
                <input
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                    type="text"
                    placeholder="Write Todo..."
                    className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                />
                <button 
                    type="submit" 
                    className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                        Add
                </button>
        </form>
    );
}

export default TodoForms;

