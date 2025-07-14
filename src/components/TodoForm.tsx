import { useState, SetStateAction, Dispatch } from "react"
import React from 'react'
import TodoServices from "../todoServices"
import TodoType from "../todos"

interface PropTypes {
    setTodos: Dispatch<SetStateAction<TodoType[]>>
}

const TodoForm:React.FC<PropTypes> = ({setTodos}) => {

    const [newText, setNewText] = useState<string>("")

    const handleAdding = () => {
        if (newText.trim() !== "") {
            const newTask = TodoServices.addTodos(newText);
            setTodos((prev) => [...prev, newTask]);
            setNewText("")
        }
    }
  return (
    <div className="inputForm">
            <input type="text" className="w-60" placeholder="input new task" aria-label="NewTask" aria-describedby="basic-addon1" value={newText} onChange={(e) => setNewText(e.target.value)} autoFocus={true}/>
            <button type="button" id="new_task_btn" className="btn btn-primary" onClick={handleAdding}>Add Task</button>
    </div>
  )
}

export default TodoForm