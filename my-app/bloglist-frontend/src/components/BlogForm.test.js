import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('When creating a blog it has right information', () => { // muokkaa
    const addBlog = jest.fn()
  
    const component = render(
      <BlogForm createBlog={addBlog} />
    )
  
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, { 
      target: { value: 'Seiskan luku' } 
    })
    fireEvent.change(author, { 
      target: { value: 'Paavo Väyrynen' } 
    })
    fireEvent.change(url, { 
      target: { value: 'https://seiska.fi' } 
    })
    fireEvent.submit(form)

    console.log(addBlog.mock.calls)

    expect(addBlog.mock.calls).toHaveLength(1)

    expect(addBlog.mock.calls[0][0]).toEqual({
      title: 'Seiskan luku',
      author: 'Paavo Väyrynen',
      url: 'https://seiska.fi',
    })
  })