import React, { useState } from 'react'
import TodoType from '../todos'
import TodoServices from '../todoServices'
import TodoForm from './TodoForm';
import '../CSS/TodoList.css'

const TodoList = () => {
    const [todos, setTodos] = useState<TodoType[]>(TodoServices.getTodos());
    const [editedId, setEditedId] = useState<number | null>(null);
    const [editedText, setEditedText] = useState<string>("")

    //update functions collection
    //
    //
    const handleEditStart = (id:number, text:string) => {
        setEditedId(id),
        setEditedText(text)
    }

    const handleEditCancel = () => {
        setEditedId(null),
        setEditedText("")      
    }

    const handleEditSave = (id:number) => {
        if(editedText.trim() !== '') {
            const update = TodoServices.updateTodos({
                id,
                text: editedText,
                completed:false
            })
            setTodos((prev) => prev.map((todo) => (todo.id === id ? update : todo)));
        }
        setEditedId(null),
        setEditedText("")  
    }

    //delete functions collection
    //
    //
    const handleDelete = (id:number) => {
        TodoServices.deleteTodos(id);
        setTodos((prev) => prev.filter((todo) => (todo.id !== id)));
    }

  return (
    <div>
        <h1 className='title'>My Todo app</h1>

        <TodoForm setTodos = {setTodos}/>

        {todos.map((todo) => (
            <div className="items" key={todo.id}>
                {editedId === todo.id ? (
                    <div className="input-group mb-3">
                        <input type="text" className="w-40" value={editedText} aria-label="editedTask" aria-describedby="basic-addon2" onChange={(e) => setEditedText(e.target.value)} autoFocus={true}/>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" id="save_btn" className="btn btn-success" onClick={() => handleEditSave(todo.id)}>save</button>
                            <button type="button" id="cancel_btn" className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>
                        </div>

                    </div>
                ) : (
                    <div className="input-group mb-3 w-100">
                        <span className="input-group-text w-60" id="basic-addon1"  aria-label="task-text" aria-describedby="basic-addon1">{todo.text}</span>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" id="save_btn" className="btn btn-success" onClick={() => handleDelete(todo.id)}>Done</button>
                            <button type="button" id="save_btn" className="btn btn-primary" onClick={() => handleEditStart(todo.id, todo.text)}>edit</button>
                            <button type="button" id="cancel_btn" className="btn btn-danger" onClick={() => handleDelete(todo.id)}>delete</button>
                        </div>
                    </div>
                )}
            </div>
        ))}

    </div>
  )
}

export default TodoList