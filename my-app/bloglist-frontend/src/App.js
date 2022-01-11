import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)
  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setInfoMessage(`a new blog "${blogObject.title}" by "${blogObject.author}" added`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
      })
  }

  const likeBlog = async (id) => {
    const blog = await blogService.get(id);

    const blogObject = {
      likes: blog.likes + 1,
    }
    const newBlog = await blogService.update(id, blogObject)
    setBlogs(blogs.map(blog => blog.id !== newBlog.id ? blog : newBlog))

  }

  const deleteBlog = async (id) => { 
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setErrorMessage('Blog removed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('deletion failed')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }




  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} color='red' />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (

    <div>
      <h2>blogs</h2>
      <Notification message={infoMessage} color='green' />
      <Notification message={errorMessage} color='red' />
      <form onSubmit={handleLogout}>
        {user.name} logged in
        <button type="submit">logout</button>
      </form>
      <div>
        {blogs.sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} likeBlog={() => likeBlog(blog.id)} deleteBlog={() => deleteBlog(blog.id)} sameUser={user.username === blog.user.username} />
          )}
      </div>
      <div>
        <Togglable buttonLabel="add blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      </div>
    </div>
  )
}

export default App
