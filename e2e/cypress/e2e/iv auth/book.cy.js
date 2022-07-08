/// <reference types="Cypress"/>
import '../../support/commands'
import bookNavigation from '../../support/pageObjects.cy'
const bn = new bookNavigation
const beforeEachCampaign =Number();
describe('Book',()=>{
    beforeEach('asdf',()=>{
        cy.restoreLocalStorage();
        cy.viewport(1920,1080)
        cy.visit('/')
        cy.logIn('platform@influencevision.com', 'Dejan12345!')
        bn.getCampaign(beforeEachCampaign)
        bn.navigate()
    })
    it('Selecting - Deselecting offers',()=>{
        //Selecting
        cy.get('[type="checkbox"]')
        .first()
        .check()
        cy.get('.booking-card > :nth-child(2) > .text-primary')
        .wait(3000)
        .should('have.text',' 1')
        cy.get('[class="progress-sm progress-bar"]')
        .should('exist')
        .and('be.visible')
        //Deselecting 
        cy.get('[type="checkbox"]')
        .first()
        .uncheck()
        cy.get('.booking-card > :nth-child(2) > .text-primary')
        .wait(3000)
        .should('have.text',' 0')
        cy.get('[class="progress-sm progress-bar"]')
        .should('not.be.visible')  
    })
    it('Multiple selecting ',()=>{
        cy.get('[type="checkbox"]')
        .first()
        .check()
        cy.get('[type="checkbox"]')
        .eq(2)
        .check()
        cy.get('.booking-card > :nth-child(2) > .text-primary')
        .wait(3000)
        .should('have.text',' 2')
        //Deselection with CLEAR SELECTION button
        cy.get('.btn-clear-selection')
        .click()
        cy.get('.booking-card > :nth-child(2) > .text-primary')
        .wait(3000)
        .should('have.text',' 0')
        cy.get('[class="progress-sm progress-bar"]')
        .should('not.be.visible') 
    })
    it('',()=>{})
    
})