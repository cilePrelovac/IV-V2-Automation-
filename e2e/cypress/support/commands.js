// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('logIn', (email, password) => {
    cy.get('[id="username"]').type(email)
    cy.get('[id="password"]').type(password)
    cy.get('[type="submit"]').click()
})
Cypress.Commands.add('tabNavigation', (tab) => {
    cy.get(tab)
        .click({ force: true })
    cy.get(tab)
        .invoke('attr', 'aria-selected')
        .should('eql', 'true')
})
Cypress.Commands.add('tabNavDash', (button, tab) => {
    cy.get(button)
        .click({ force: true })
    cy.get(tab)
        .invoke('attr', 'aria-selected')
        .should('eql', 'true')
})
Cypress.Commands.add('dropDownMenuChangeCampaign', (num) => {
    cy.get('.col-md-5 > .d-flex > img')
        .click()
    cy.get('[data-testid="ArrowDropDownIcon"]')
        .click()
    cy.get('[id="combo-box-demo-listbox"]')
        .find('li')
        .eq(num)
        .click()
})
Cypress.Commands.add('sideBarChangeCampaign',(num)=>{
    cy.get('.left-side-bar')
    .find('a')
    .eq(num)
    .click()
})
Cypress.Commands.add('viewMode',(mode)=>{
    cy.get(mode).click()
})
Cypress.Commands.add('filteringCampaign',(typing,body,div1,div2,h)=>{
    cy.get(body).children().then((items) => {
        for (let i = 0; i < items.length-1; i++) {
          cy.get(div1)
            .find(div2)
            .eq(i)
            .find(h)
            .contains(typing,{matchCase: false})
        }
      })
})
Cypress.Commands.add('campFiltering',(filtering,list,selection)=>{
    cy.get(filtering).click()
    cy.get(list)
    cy.get(selection)
        .click()
    
})

Cypress.Commands.add("saveLocalStorage", () => {
    Object.keys(localStorage).forEach(key => {
      LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
  });
  Cypress.Commands.add("restoreLocalStorage", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
      localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
  });
  Cypress.Commands.add("tabNavCardView",(card,div1,div2,button,tab,num)=>{
    cy.url().then(url => {
        cy.get(card).children().then((items) => {
          for (let i = 0; i < items.length-5; i++) {
            cy.get(div1)
              .find(div2)
              .eq(i)
              .find(button)
              .eq(num)
              .click()
              cy.url().should('not.eq', url)
              cy.get(tab)
              .invoke('attr', 'aria-selected')
              .should('eql', 'true')
              cy.visit('/brand/dashboard')
          }
        })
        })
  })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
