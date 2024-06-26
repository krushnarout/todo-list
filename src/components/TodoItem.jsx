import React, { useState } from 'react'
import useTodo from '../contexts/TodoContext'
import { RiDeleteBinLine } from "react-icons/ri"
import { SlPencil } from "react-icons/sl"
import { TfiSave } from "react-icons/tfi"

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const { toggleComplete, updateTodo, removeTodo } = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg })
        setIsTodoEditable(false)
    }

    const toggleTodo = () => {
        toggleComplete(todo.id)
        setIsTodoEditable(false)
    }

    const deleteTodo = () => {
        removeTodo(todo.id)
    }

    return (
        <div
            className={` mb-2.5 flex border border-gray-300 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm duration-300 text-black dark:text-white ${todo.completed ?
                'bg-[#e4f8d6] dark:bg-[#c6e9a7]' : 'bg-gray-100 dark:bg-gray-700'
                }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleTodo}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? 'border-gray-600 px-2.5 dark:border-white' : 'border-transparent'
                    } ${todo.completed ? 'line-through dark:text-black' : ''}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;
                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {isTodoEditable ? <TfiSave size={17} /> : <SlPencil size={18} />}
            </button>
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-gray-300 justify-center items-center bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shrink-0"
                onClick={deleteTodo}
            >
                <RiDeleteBinLine size={20} className='text-[#dc4c3e] dark:text-[#ff0000] ' />
            </button>
        </div>
    )
}

export default TodoItem