
const validUser = {
  username: Cypress.env('validUsername'),
  password: Cypress.env('validPassword')
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('[data-test-id="login-form"]')
  })
})

describe('Login', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ ...validUser, name: 'TestName' })
    cy.visit('http://localhost:3000')
  })

  it('succeeds with correct credentials', function() {

    cy.get('[data-test-id="login-form"] input[name="Username"]').type(validUser.username)
    cy.get('[data-test-id="login-form"] input[name="Password"]').type(validUser.password)
    cy.contains('login').click()

    cy.contains('Logout')
    cy.contains('blogs')
    cy.get('[data-test-id="blog-form"]')

  })

  it('fails with wrong credentials', function() {
    cy.get('[data-test-id="login-form"] input[name="Username"]').type('invalidUsername')
    cy.get('[data-test-id="login-form"] input[name="Password"]').type('invalidPassword')
    cy.contains('login').click()

    cy.contains('invalid username or password')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })
})

describe('When logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ ...validUser, name: 'TestName' })
    cy.login(validUser)
    cy.visit('http://localhost:3000')
  })

  it('A blog can be created', function() {

    const newBlog = {
      title: 'Test title',
      author: 'Test author',
      url: 'www.testurl.com'
    }

    cy.contains('new blog').click()
    cy.get('[data-test-id="blog-form"] input[name="title"]').type(newBlog.title)
    cy.get('[data-test-id="blog-form"] input[name="author"]').type(newBlog.author)
    cy.get('[data-test-id="blog-form"] input[name="url"]').type(newBlog.url)
    cy.get('[data-test-id="blog-form"]').contains('create').click()

    cy.contains(`a new blog ${newBlog.title} by ${newBlog.author}`)
      .should('have.css', 'color', 'rgb(0, 128, 0)')
  })

  it('like a blog', function() {

    const newBlog = {
      title: 'Test title',
      author: 'Test author',
      url: 'www.testurl.com'
    }

    cy.createBlog(newBlog)
    cy.visit('http://localhost:3000')

    cy.contains('view').click()
    cy.contains('Likes: 0').as('likesCounter')
    cy.contains('button', 'like').click()
    cy.get('@likesCounter').should('contain', 'Likes: 1')
  })

  it('remove a blog', function() {
    const secondUser = {
      username: 'secondUser',
      password: 'secondpass'
    }

    const firstUserBlog = {
      title: 'First Test title',
      author: 'First Test author',
      url: 'www.testurl1.com'
    }

    const secondUserBlog = {
      title: 'Second Test title',
      author: 'Second Test author',
      url: 'www.testurl2.com'
    }

    cy.createBlog(firstUserBlog)
    cy.logout()

    cy.createUser({ ...secondUser, name: 'Second Test Name' })
    cy.login(secondUser)
    cy.createBlog(secondUserBlog)

    cy.visit('http://localhost:3000')

    cy.contains('First Test title').find('button').click()
    cy.contains('Author: First Test author').parent().as('firstContainer')
    cy.get('@firstContainer').find('button').should('not.exist')

    cy.contains('Second Test title').find('button').click()
    cy.contains('Author: Second Test author').parent().as('secondContainer')
    cy.get('@secondContainer').find('button').click()

    cy.contains('First Test title').should('exist')
    cy.contains('Second Test title').should('not.exist')
  })

  it('order of blogs by likes number', function() {

    const firstBlog = {
      title: 'First Test title',
      author: 'First Test author',
      url: 'www.testurl1.com',
      likes: 1
    }

    const secondBlog = {
      title: 'Second Test title',
      author: 'Second Test author',
      url: 'www.testurl2.com',
      likes: 2
    }

    const thirthBlog = {
      title: 'Thirth Test title',
      author: 'Thirth Test author',
      url: 'www.testurl3.com',
      likes: 3
    }

    const fourthBlog = {
      title: 'Fourth Test title',
      author: 'Fourth Test author',
      url: 'www.testurl4.com',
      likes: 4
    }

    cy.createBlog(firstBlog)
    cy.createBlog(secondBlog)
    cy.createBlog(thirthBlog)
    cy.createBlog(fourthBlog)

    cy.visit('http://localhost:3000')

    cy.wait(2000)
    cy.get('[data-test-id="blog-list"]').as('blogList')

    cy.get('@blogList').within(() => {
      cy.get('div')
        .first()
        .should('to.contain', 'Fourth Test title')
        .next()
        .should('to.contain', 'Thirth Test title')
        .next()
        .should('to.contain', 'Second Test title')
        .next()
        .should('to.contain', 'First Test title')
    })
  })
})
