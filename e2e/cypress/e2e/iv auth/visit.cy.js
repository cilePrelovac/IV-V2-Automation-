/// <reference types="Cypress"/>
describe("Authentication", () => {
    it('does message is right for empty fields', () => {
        cy.visit('/')
        cy.get('[id="username"]').click()
        cy.get('[id="password"]').focus().blur()
        cy.get('[type="submit"]').click()
        cy.get('[id="username-helper-text"]')
            .should('have.text', 'Required field')
            .and('have.css', 'color', 'rgb(237, 64, 82)')
        cy.get('[id="password-helper-text"]')
            .should('have.text', 'Required field')
            .and('have.css', 'color', 'rgb(237, 64, 82)')
    })
    it('does message is right for wrong email and right password', () => {
        cy.login('dejan@dejan.com','Dejan12345!')
        cy.get('.mb-10 > .font-weight-normal')
            .should('have.text', 'The login detail is incorrect')
            .and('have.css', 'color', 'rgb(237, 64, 82)')
    })
})