import React,  { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, sameUser}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDeleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      deleteBlog()
    }
    
  }
  
  const [visible, setVisible] = useState(false)
 
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenSameUser = { display: sameUser ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div className='blogHeader'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className="showWhenVisible">
        {blog.url}<br />
        {blog.author}<br />
        {blog.likes} likes <button onClick={likeBlog}>like</button><br />
        <div style={showWhenSameUser}>
          <button onClick={handleDeleteBlog}>remove</button>
        </div>
      </div>
    </div>
)}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  sameUser: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
