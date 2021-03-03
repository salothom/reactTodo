import React from 'react'
import Todo from './todo'
import './index.css';

export default function TodoList({ todos, toggleTodo }) {
    return (<div>
        <h2>Grocery List</h2>
        <div class="list">
            {todos.map(todo => {
                return <Todo key={todo.id} toggleTodo={toggleTodo} todo={todo} />
            })}
        </div>


    </div>

    )
}