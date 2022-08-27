import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = newToken ? `Bearer ${newToken}` : null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = blog => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const update = (id, blog) => {
  const config= {
    headers: {
      Authorization: token
    }
  }
  const request = axios.put(`${baseUrl}/${id}`, blog, config)
  return request.then(response => response.data)
}

const remove = id => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  axios.delete(`${baseUrl}/${id}`, config)
}

const blogService = {
  getAll,
  create,
  setToken,
  update,
  remove
}
export default blogService