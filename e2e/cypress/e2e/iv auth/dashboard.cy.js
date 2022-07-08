/// <reference types="Cypress"/>
import '../../support/commands'
const cardView = '.d-flex > :nth-child(4) > svg'
const listView = '.d-flex > .mr-2.btn'
const selection1 = '#combo-box-demo-option-0'
const managing1 = '#mui-1-option-0'
const expected = [
  'Campaign',
  'Offers',
  'Messages',
  'Negotiations',
  'Reported',
  'Status',
  'Actions'
]
const campaignTypingPositive = "spa"
const campaignTypingNegative = "123fasdrweq"

describe('Dashboard - List view', () => {
  beforeEach('viewport', () => {
    cy.restoreLocalStorage();
    cy.viewport(1920, 1080)
    cy.visit('/')
    cy.logIn('platform@influencevision.com', 'Dejan12345!')
    cy.viewMode(listView)
  })

  it('Checking the elements', () => {
    cy.viewMode(listView)

    cy.get('.table').children().then(() => {
      cy.get('.table').should('exist').and('be.visible')
      cy.get('.table').children().then((items) => {
        for (let i = 0; i < items.length + 5; i++) {
          cy.get('tr')
            .eq(0)
            .find('th')
            .eq(i)
            .should('have.text', expected[i])
        }
      })
    })
  })
  it('Filtering Campaigns by name', () => {
    cy.get('#outlined-basic').type(campaignTypingPositive, '{enter}')
    cy.wait(4000)
      cy.filteringCampaign(campaignTypingPositive,'tbody', 'tr','[class="text-left"]',  'h6')
  })
  it('Filtering Campaign by status',()=>{
    cy.campFiltering('[id="combo-box-demo"]', '[id="combo-box-demo-listbox"]', selection1)
    cy.wait(2000)
cy.filteringCampaign('published','tbody', 'tbody' ,'tr', '[class*="status"]')
  })
})
describe('Dashboard - Card view', () => {
  beforeEach('before', () => {
    cy.viewport(1920, 1080)
    cy.visit('/')
    cy.logIn('platform@influencevision.com', 'Dejan12345!')
    cy.viewMode(cardView)
  })
  it('Filtering Campaigns by name - positive test', () => {
    cy.get('#outlined-basic').type(campaignTypingPositive, '{enter}')
    cy.wait(4000)
    cy.filteringCampaign(campaignTypingPositive, '[class="mt-4 row"]', '[class="col-md-6 col-xl-4 d-flex "]', '[class="brand-card card"]', 'h4')
  })
  it('Filtering Campaigns by name - negative test', () => {
    cy.get('#outlined-basic').type(campaignTypingNegative, '{enter}')
    cy.wait(4000)
    cy.get('.text-center>h5')
      .should('have.text', 'Campaign list empty!')
  })
  it('Filtering Campaign by status', () => {
    //Draft
    cy.campFiltering('[id="combo-box-demo"]', '[id="combo-box-demo-listbox"]', selection1)
    cy.wait(4000)
    cy.filteringCampaign('published', '[class="mt-4 row"]', '[class="col-md-6 col-xl-4 d-flex "]', '[class="position-relative"]', 'p')
  
  })
  it('Filtering Campaign by Managing', () => {
    cy.campFiltering('[id="mui-1"]', '[id="mui-1-listbox"]', managing1)
    cy.wait(3000)
    cy.filteringCampaign('Dejan Maksimovic', '[class="mt-4 row"]', '[class="col-md-6 col-xl-4 d-flex "]', '[class="d-flex flex-column mx-2"]', 'h6')
  })
  it('Navigation to the tabs from the card view',()=>{
    cy.tabNavCardView('[class="mt-4 row"]','[class="col-md-6 col-xl-4 d-flex "]','[class="background-gray-100 default-radius px-2 py-3 my-3"]','button','[id*="T-book"]','0')
    cy.tabNavCardView('[class="mt-4 row"]','[class="col-md-6 col-xl-4 d-flex "]','[class="background-gray-100 default-radius px-2 py-3 my-3"]','button','[id*="T-manage"]','1')
    cy.tabNavCardView('[class="mt-4 row"]','[class="col-md-6 col-xl-4 d-flex "]','[class="background-gray-100 default-radius px-2 py-3 my-3"]','button','[id*="T-measure"]','2')
    cy.tabNavCardView('[class="mt-4 row"]','[class="col-md-6 col-xl-4 d-flex "]','[class="background-gray-100 default-radius px-2 py-3 my-3"]','button','[id*="T-messages"]','3')
    cy.get('.breadcrumb-item')
      .should('have.text','Dashboard')
  })
  it('Actions',()=>{


  })
})
