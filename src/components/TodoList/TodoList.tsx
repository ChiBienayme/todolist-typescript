import { useState, useEffect } from 'react'
import TaskInput from '../TaskInput'
import TaskList from '../TaskList'
import { Todo } from '../../@types/todo.type'
import styles from './todoList.module.scss'

// interface HandleNewTodos {
//     (todos: Todo[]): Todo[]
// }

type HandleNewTodos = (todos: Todo[]) => Todo[]

const syncReactToLocal = (handleNewTodos: HandleNewTodos) => {
    const todosString = localStorage.getItem('todos')
    const todosObj: Todo[] = JSON.parse(todosString || '[]')
    const newTodosObj = handleNewTodos(todosObj)
    localStorage.setItem('todos', JSON.stringify(newTodosObj))
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [currentTodo, setCurrentTodo] = useState<Todo | null>(null)

    const doneTodos = todos.filter((todo) => todo.done)
    const notdoneTodos = todos.filter((todo) => !todo.done)

    useEffect(() => {
        const todosString = localStorage.getItem('todos')
        const todoObj: Todo[] = JSON.parse(todosString || '[]')
        setTodos(todoObj)
    }, [])

    const addTodo = (name: string) => {
        const todo: Todo = {
            name,
            done: false,
            id: new Date().toISOString(),
        }
        setTodos((prev) => [...prev, todo])

        syncReactToLocal((todosObj: Todo[]) => [...todosObj, todo])
    }

    const handleDoneTodo = (id: string, done: boolean) => {
        const handler = (todosObj: Todo[]) => {
            return todosObj.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, done }
                }
                return todo
            })
        }

        setTodos(handler)
        syncReactToLocal(handler)
    }

    const startEditTodo = (id: string) => {
        const findedTodo = todos.find((todo) => todo.id === id)
        console.log(findedTodo)

        if (findedTodo) {
            setCurrentTodo(findedTodo)
        }
    }

    const editTodo = (name: string) => {
        setCurrentTodo((prev) => {
            if (prev) return { ...prev, name }
            return null
        })
    }

    const finishedTodo = () => {
        const handler = (todosObj: Todo[]) => {
            return todosObj.map((todo) => {
                if (todo.id === (currentTodo as Todo).id) {
                    return currentTodo as Todo
                }
                return todo
            })
        }
        setTodos(handler)
        setCurrentTodo(null)

        syncReactToLocal(handler)
    }

    const deleteTodo = (id: string) => {
        if (currentTodo) {
            setCurrentTodo(null)
        }

        const handler = (todosObj: Todo[]) => {
            const findIndexTodo = todos.findIndex((todo) => todo.id === id)
            if (findIndexTodo > -1) {
                const result = [...todosObj]
                result.splice(findIndexTodo, 1)
                return result
            }
            return todosObj
        }

        setTodos(handler)
        syncReactToLocal(handler)
    }

    console.log(todos)
    return (
        <div className={styles.todoList}>
            <div className={styles.todoListContainer}>
                <TaskInput
                    addTodo={addTodo}
                    currentTodo={currentTodo}
                    editTodo={editTodo}
                    finishedTodo={finishedTodo}
                />

                <TaskList
                    todos={notdoneTodos}
                    handleDoneTodo={handleDoneTodo}
                    startEditTodo={startEditTodo}
                    deleteTodo={deleteTodo}
                />

                <TaskList
                    doneTaskList
                    todos={doneTodos}
                    handleDoneTodo={handleDoneTodo}
                    startEditTodo={startEditTodo}
                    deleteTodo={deleteTodo}
                />
            </div>
        </div>
    )
}
