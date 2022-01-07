import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from './Todo'
import { completeTodo, deleteTodo } from './TodoView'

test('renders content', () => {
  const todo = {
    text: 'Component testing is done with react-testing-library',
    done: false
  }

  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  const component = render(
    <Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete}/>
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})