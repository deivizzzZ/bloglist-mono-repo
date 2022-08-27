describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'root',
      name: 'Root User',
      password: 'pswd'
    })
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', () => {
    cy.contains('log in to application')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('[name="username"]').type('root')
      cy.get('[name="password"]').type('pswd')
      cy.get('#login-form-button').click()
      cy.contains('blogs')
    })

    it('fails with wrong credentials', () => {
      cy.get('[name="username"]').type('not-a-user')
      cy.get('[name="password"]').type('not-a-password')
      cy.get('#login-form-button').click()
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'root', password: 'pswd' })
    })

    it('A blog can be created', () => {
      cy.contains('create new blog').click()
      cy.get('[name="title"]').type('A blog created by Cypress')
      cy.get('[name="author"]').type('Ludvig Amide')
      cy.get('[name="url"]').type('http://acypressblog.com')
      cy.get('#blog-form-button').click()
      cy.get('.blog').should('contain', 'A blog created by Cypress Ludvig Amide')
    })

    describe('If a blog exists', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'A blog created by Cypress',
          author: 'Ludvig Amide',
          url: 'http://acypressblog.com',
          likes: 0
        })
      })

      it('A user can like it', () => {
        cy.contains('view').click()
        cy.get('.likes button').click()
        cy.get('.likes').should('contain', 'likes 1')
      })

      it('The user who created it can delete it', () => {
        cy.contains('view').click()
        cy.get('.remove button').click()
        cy.get('.blog').should('not.exist')
      })

      describe('But other users', () => {
        beforeEach(() => {
          cy.request('POST', 'http://localhost:3003/api/users', {
            username: 'another',
            name: 'Another User',
            password: 'nthr'
          })
          cy.login({ username: 'another', password: 'nthr' })
        })

        it('cannot delete it', () => {
          cy.contains('view').click()
          cy.get('.remove button').should('not.exist')
        })
      })
    })

    describe('If there are multiple blogs', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'The title with the second most likes',
          author: 'Ludvig Amide',
          url: 'http://second.com',
          likes: 3
        })
        cy.createBlog({
          title: 'The title with the most likes',
          author: 'Ludvig Amide',
          url: 'http://first.com',
          likes: 5
        })
      })

      it('the blogs are ordered according to likes', () => {
        cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
      })
    })
  })
})