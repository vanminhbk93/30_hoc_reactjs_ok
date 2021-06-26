import React, { Fragment, useState, useEffect } from 'react'
import TodoItem from './TodoItem'
import AddTodo from './AddTodo'
import axios from 'axios'

import { v4 as uuidv4 } from 'uuid'

const Todos = () => {
  const [todosState, setTodosState] = useState([])

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get(
          'https://jsonplaceholder.typicode.com/todos?_limit=10'
        )
        // console.log(res.data)
        setTodosState(res.data)
      } catch (error) {
        console.log(error.message)
      }
    }

    getTodos()
  }, [])

  const markComplete = id => {
    const newTodos = todosState.map(todo => {
      if (todo.id === id) todo.completed = !todo.completed
      return todo
    })

    setTodosState(newTodos)
  }

  const deleteTodo = async id => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      const newTodos = todosState.filter(todo => todo.id !== id)
      setTodosState(newTodos)
    } catch (error) {
      console.log(error.message)
    }
  }

  const addTodo = async title => {
    try {
      const res = await axios.post(
        'https://jsonplaceholder.typicode.com/todos',
        {
          title,
          completed: false
        }
      )
      console.log(res.data)
      const newTodos = [...todosState, res.data]
      setTodosState(newTodos)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Fragment>
      <AddTodo addTodoFunc={addTodo} />
      {todosState.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            todoProps={todo}
            markCompleteFunc={markComplete}
            deleteTodoFunc={deleteTodo}
          />
        )
      })}
    </Fragment>
  )
}

export default Todos
