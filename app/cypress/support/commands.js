Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', { username, password })
    .then(response => {
      localStorage.setItem('loggedUser', JSON.stringify(response.body))
    })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: { title, author, url, likes },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})