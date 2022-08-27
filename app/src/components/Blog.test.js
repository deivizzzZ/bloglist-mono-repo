import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const user = {
    username: 'test',
    name: 'Test User'
  }
  const blog = {
    title: 'This is a test',
    author: 'Me',
    url: 'www.test.com',
    likes: 0,
    user
  }
  const mockHandler = jest.fn()

  beforeEach(() => {
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    component = render(<Blog blog={blog} addLike={mockHandler} />)
  })

  test('renders title and author but not url or likes by default', () => {
    component.getByText(blog.title + ' ' + blog.author)

    const url = component.container.querySelector('.url')
    const likes = component.container.querySelector('.likes')

    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('url and likes are shown when the button is clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const url = component.container.querySelector('.url')
    const likes = component.container.querySelector('.likes')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('when the like button is clicked twice the event handler is called twice', () => {
    const showButton = component.getByText('view')
    fireEvent.click(showButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler).toHaveBeenCalledTimes(2)
  })
})