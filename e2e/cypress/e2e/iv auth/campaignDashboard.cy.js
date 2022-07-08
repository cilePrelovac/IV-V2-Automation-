/// <reference types="Cypress"/>
import '../../support/commands'
import bookNavigation from '../../support/pageObjects.cy'
const campnum="0"

const bn = new bookNavigation





function Number() {
    var number = "";
    var num = "12345670";
    for (var i = 0; i < 1; i++)
        number += num.charAt(Math.floor(Math.random() * num.length));
    return number;
}
const beforeEachCampaign =Number();
const campaignNumber = Number();
const booktextExpected = [
    'Total matched influencers',
    'Offers received',
    'Influencers booked'
]
const measuretextExpected = [
    'Total views',
    'Influencers reported',
    'Engagement score'
]

describe('Campaign - Dashboard', () => {
    beforeEach('viewport,login', () => {
        cy.viewport(1920, 1080)
        cy.visit('/')
        cy.logIn('platform@influencevision.com', 'Dejan12345!')
        cy.wait(1000)
        bn.getCampaign(beforeEachCampaign)
    })
    it('Tabs navigation from header', () => {
        //Checking every tab  
        cy.tabNavigation('[id*="T-dashboard"]')//dashboard
        cy.tabNavigation('[id*="T-book"]')//book
        cy.tabNavigation('[id*="T-manage"]')//manage
        cy.tabNavigation('[id*="T-measure"]')//measure
        cy.tabNavigation('[id*="T-messages"]')//messages
    })
    it('Tabs navigation from the Dashboard', () => {
        cy.tabNavDash('.col-lg-7 > .p-4.mb-3 > :nth-child(1) > .btn', '[id*="T-book"]')//book
        //Back to the Dashboard
        cy.tabNavigation('[id*="T-dashboard"]')
        cy.tabNavDash('#root > div.d-flex.pl-0.pr-0.container-fluid > div.pt-md-5.pt-3.p-xl-5.container > div > div.p-0.p-md-2.col-lg-7 > div:nth-child(2) > div.d-flex.justify-content-between > button', '[id*="T-manage"]')//manage
        //Back to the Dashboard
        cy.tabNavigation('[id*="T-dashboard"]')
        cy.tabNavDash('.col-lg-5 > :nth-child(2) > .justify-content-between > .btn', '[id*="T-measure"]')//measure
    })
    it.only('Tabs overview - Dashboard', () => {
        //book overview
    /*    cy.get('.col-lg-7 > .p-4.mb-3').children().then(() => {
            cy.get('h3').eq(0).should('have.text', 'Book')
            cy.get('[class="align-items-center my-3 row"]').children().then((items) => {
                for (let i = 0; i < items.length + 1; i++) {
                    cy.get('.col-lg-7 > .p-4.mb-3 > .row > :nth-child(1)')
                        .find('div')
                        .eq(i)
                        .find('h6')
                        .should('have.text', booktextExpected[i])
                }
            })
        })
        //campaign management
        cy.get('h3')
            .eq(2)
            .should('have.text', 'Campaign Management')
            .and('have.css', 'font-size', '24px')
            .and('have.css', 'font-weight', '800')
        //manage
        cy.get('h3')
            .eq(1)
            .should('have.text', 'Manage')
        cy.get('table[class="table-vertical-center dashboard-table table"]').children().then(() => {
            cy.get('tbody').children().then((items) => {
                for (let i = 0; i < items.length; i++) {
                    cy.get('tr')
                        .eq(i + 1)
                        .find('td')
                        .eq(0)
                        .find('h6')
                        .should('have.css', 'font-size', '14px')
                        .and('not.be.empty')

                }
            })
        })
*/
        //measure
        cy.get('.d-lg-flex > .col-lg-5 > :nth-child(2)').children().then(() => {
            cy.get('h3').eq(3).should('have.text', 'Measure')
            cy.get('[class="my-3 row"]').children().then((items) => {
                for (let i = 0; i < items.length; i++) {
                    cy.get('[class="col-sm-4"]')

                        .eq(i)
                        .find('h6')
                        .should('have.text', measuretextExpected[i])
                }
            })
        })


    })
    it('Layout - Change Campaign', () => {
        //Change Campaign with dropdown menu //
        cy.get('.col-md-5 > .d-flex > img')
            .click()
        cy.get('[data-testid="ArrowDropDownIcon"]')
            .click()
        cy.get('[id="combo-box-demo-listbox"]')
            .find('li')
            .should('have.length.at.most', 10) //lenght of the items can be maximum 10 
        cy.url().then(url => {
            cy.dropDownMenuChangeCampaign(campaignNumber)
            cy.url().should('not.eq', url)
        })
        cy.get('[data-testid="ArrowDropDownIcon"]')
            .click()
        cy.get('[id="combo-box-demo-listbox"]')
            .find('li')
            .eq(campaignNumber)
            .invoke('text')
            .then((previousText) => {
                cy.get('.col-md-7 > h5')
                    .invoke('text')
                    .should("eq", previousText)
            })
        //Change campaign with the side bar menu 
        cy.url().then(url => {
            cy.sideBarChangeCampaign(campnum)
            cy.url().should('not.eq', url)
        })
        cy.get('.tooltip-inner')
        .invoke('text')
            .then((previousText)=>{
                cy.get('.col-md-7 > h5')
                .invoke('text')
                .should("eq",previousText)
            })
    })

})