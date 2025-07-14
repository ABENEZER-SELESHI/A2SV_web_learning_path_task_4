import TodoType from "./todos";

const LOCAL_STORAGE_KEY = 'todos';

const TodoServices = {

    //get all todos
    getTodos: (): TodoType[] => {
        const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        return todoStr ? JSON.parse(todoStr) : [];
    },

    addTodos: (text:string) : TodoType => {
        const todos = TodoServices.getTodos();
        const newTask: TodoType = { id: (todos.length), text:text, completed: false }

        const TodoList = [...todos, newTask];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(TodoList));

        return newTask;
    },

    updateTodos: (todo:TodoType): TodoType => {
        const todos = TodoServices.getTodos();
        const updateTodo = todos.map((t) => (t.id === todo.id ? todo : t));

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodo))

        return todo;
    },

    deleteTodos: (id: number): void => {
        const todos = TodoServices.getTodos();
        const deleteTodo = todos.filter((t) => (t.id !== id))

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(deleteTodo));

    }


}

export default TodoServices;