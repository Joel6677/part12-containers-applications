import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
      <div>
        <h2>Create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title
            <input
            id = "title"
            type = "text"
            value = {newTitle}
            name ="Title"
            onChange={({ target }) => setNewTitle(target.value)}
            />
          </div>
          <div>
            author
            <input
            id = "author"
            type = "text"
            value = {newAuthor}
            name ="Author"
            onChange={({ target }) => setNewAuthor(target.value)}
            />
          </div>
          <div>
            url
            <input
            id = "url"
            type = "text"
            value = {newUrl}
            name ="Url"
            onChange={({ target }) => setNewUrl(target.value)}
            />
          </div>
          <div>
          <button id="createBlog" type="submit">create</button>
          </div>
        </form>
      </div>
    )
}

export default BlogForm