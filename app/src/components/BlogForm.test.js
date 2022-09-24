import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('form calls event handler with right details when a new blog is created', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  const newBlog = {
    title: 'testing a form',
    author: 'myself',
    url: 'www.form.com'
  }

  const component = render(<BlogForm createBlog={mockHandler} />)

  const titleInput = component.container.querySelector('.title input')
  const authorInput = component.container.querySelector('.author input')
  const urlInput = component.container.querySelector('.url input')
  const createButton = component.getByText('create')

  await user.type(titleInput, newBlog.title)
  await user.type(authorInput, newBlog.author)
  await user.type(urlInput, newBlog.url)
  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe(newBlog.title)
  expect(mockHandler.mock.calls[0][0].author).toBe(newBlog.author)
  expect(mockHandler.mock.calls[0][0].url).toBe(newBlog.url)
})
