import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('only title and author are rendered', () => {
  const blog = {
    title: 'Seiskan luku',
    author: 'Paavo Väyrynen',
    url: 'http://iltalehti.fi',
    likes: 55,
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Seiskan luku'
  )
  expect(component.container).toHaveTextContent(
    'Paavo Väyrynen'
  )
  const div = component.container.querySelector('.showWhenVisible')
  expect(div).toHaveStyle('display: none')
})

test('likes and url are showed after clicking', () => {
  const blog = {
    title: 'Seiskan luku',
    author: 'Paavo Väyrynen',
    url: 'http://iltalehti.fi',
    likes: 55,
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} handleShowChange={mockHandler} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'http://iltalehti.fi'
  )
  expect(component.container).toHaveTextContent(
    '55'
  )

})

test('clicking like twice calls event handler twice', () => {
  const blog = {
    title: 'Seiskan luku',
    author: 'Paavo Väyrynen',
    url: 'http://iltalehti.fi',
    likes: 55,
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} likeBlog={mockHandler} />
  )
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

})