import React, { useState, useRef, useEffect } from 'react';
import TodoList from './todolist'
import './index.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function randomID(name) {
    const min = 1;
    const max = 100;
    const rand = name + (min + Math.random() * (max - min));
    return rand
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: randomID(name.charAt(1)), name: name, complete: false }]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function clearAll() {
    const newTodo = []

    setTodos(newTodo)
  }

  return (
    <div class="grocer">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type="text" />
      <a class="buttons" onClick={handleAddTodo}>Add Item</a>
      <a class="buttons" onClick={handleClearTodos}>Remove Completed</a>
      <a class="buttons" onClick={clearAll}>Remove All</a>

      <div class="remain">
        <div class="total">{todos.filter(todo => !todo.complete).length} Left to do</div>
        <div class="total">{todos.length} Total items in list</div>

      </div>
    </div>
  );
}

export default App;
