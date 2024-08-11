  import { useState } from "react";
  import {TodoProvider} from './context'
  import "./App.css";
  import { useEffect } from "react";
  import TodoForms from './components/TodoForms'
  import TodoItems from './components/TodoItems'

  function App() {
    const [todos, setTodos] = useState([]); // Remember, this state manages the array of the Objects
    
    const addTodo = (todo) => {
      // If we use todo directly it will override hence access the previous values  and then add the new incoming value; values = Objects
      
      setTodos((prev) => [{...todo}, ...prev])
      
    }

    const updateTodo = (id,todo) => {
      
      setTodos((prev) => (
        prev.map(prevTodo => (prevTodo.id === id ? todo : prevTodo))
      ))      
    }

    const deleteTodo = (id) => {
      setTodos((prev) => prev.filter(prevTodo => prevTodo.id !== id))
    }

    const toggleComplete = (id) => {
      setTodos((prev) => 
        prev.map(prevTodo => 
          (prevTodo.id === id ? {...prevTodo,completed: !prevTodo.completed} : prevTodo )))
    }

    // Local Storage
    useEffect(() => {
      let todos = JSON.parse(localStorage.getItem('todos'))
      
      if(todos && todos.length > 0) 
          setTodos(todos)
    },[])

    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos))
    },[todos])

    return (
      <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">
              Manage Your Todos
            </h1>
            <div className="mb-4">
              {/* Todo form goes here */} 
              <TodoForms />
              {/* <TodoItems todo={todos[0]}/> */}
            </div>
            <div className="flex flex-wrap gap-y-3">
              {/*Loop and Add TodoItem here */}
              {todos.map((EveryTodo) => {
                return (
                  <div key={EveryTodo.id} className="w-full">
                    <TodoItems todo={EveryTodo}/>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </TodoProvider>
    );
  }

  export default App;
