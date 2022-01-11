describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Paavo Väyrynen',
      username: 'Paavo',
      password: 'paavo123'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')

  })

  it('login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {

      cy.get('#username').type('Paavo')
      cy.get('#password').type('paavo123')
      cy.contains('login').click()
      cy.contains('Paavo Väyrynen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Paavo')
      cy.get('#password').type('asdasd')
      cy.contains('login').click()
      cy.contains('Paavo Väyrynen logged in').should('not.visible')
      cy.contains('wrong username or password')

    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'Paavo', password: 'paavo123'
      }).then(response => {
        localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('add blog').click()
      cy.get('#title').type('Some Blog')
      cy.get('#author').type('Some Author')
      cy.get('#url').type('hymy.fi')
      cy.contains('create').click()
      cy.contains('Some Blog')
    })
    it('A blog can be liked', function () {
      cy.contains('add blog').click()
      cy.get('#title').type('Some Blog')
      cy.get('#author').type('Some Author')
      cy.get('#url').type('hymy.fi')
      cy.contains('create').click()
      cy.contains('Some Blog')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('like').click()
      cy.contains('2 likes')
    })
    it('A blog can be removed', function () {
      cy.contains('add blog').click()
      cy.get('#title').type('Some Blog')
      cy.get('#author').type('Some Author')
      cy.get('#url').type('hymy.fi')
      cy.contains('create').click()
      cy.contains('Some Blog')
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('Blog removed')
    })
    it('Blogs are shorted by likes', function() {
      cy.contains('add blog').click()
      cy.get('#title').type('blog1')
      cy.get('#author').type('Some Author')
      cy.get('#url').type('hymy.fi')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('like').click()

      cy.contains('add blog').click()
      cy.get('#title').type('blog2')
      cy.get('#author').type('Some Author')
      cy.get('#url').type('hymy.fi')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('0 likes').click()
        .contains('like').click()
				.contains('like').click()
				.contains('like').click()

      cy.contains('add blog').click()
      cy.get('#title').type('blog3')
      cy.get('#author').type('Some Author')
      cy.get('#url').type('hymy.fi')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('0 likes').click()
      .contains('like').click()
      .contains('like').click()

      cy.wait(300)
      
      cy.get('.blogHeader')
				.first()
				.contains('blog2')

      cy.get('.blogHeader')
        .last()
        .contains('blog1')
      

  })

  })
  
})