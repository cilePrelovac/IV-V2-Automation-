/// <reference types="Cypress"/>
class bookNavigation{
    getCampaign(i){
        const button=cy.get('.campaign-card-title').eq(i)
        button.click()
        return this
    }
    navigate(){
        const button=cy.contains('Book')
        button.click()
        return this
    }
    pending(){
      const button=cy.get('[name="pending"]')  
      button.click()
      return this
    }
    negotiations(){
        const button=cy.get('[name="negotiate"]')  
        button.click()
        return this
    }
    requested(){
        const button=cy.get('[name="requested"]')  
        button.click()
        return this
    }
    bestPicks(){
        const button=cy.get('[name="bestPicks"]')  
        button.click()
        return this
    }
}

export default bookNavigation