describe('Testing for category resource', () => {

    it('verify request returns JSON', () => {
        cy.request('categories/')
            .its('headers').its('content-type').should('include', 'application/json')
    });

    it('verify the status', () => {
        cy.request('categories/').its('status').should('be.equal', 200)
    })

    // check success property inside response, it must be true
    it('verify success property', () => {
        cy.request('categories/').its('body.success').should('be.equal', true)
    })

    //check the businessMessage property inside the response, it must be empty
    it('verify businessMessage property', () => {
        cy.request('categories/').its('body.businessMessage').should('have.length', 0)
    })

    //check the objects property inside the response, it should have the array of categories
    it('verify objects property', () => {
        cy.request('categories/').its('body.objects').should('has.property', 'categories')
    })

    //check the array of categories within the response, it must have id property
    it('verify id property', () => {
        cy.request('categories/').its('body.objects.categories.0').should('has.property', 'id');
    })

    //check the array of categories within the response, it must have description property
    it('verify description property', () => {
        cy.request('categories/').its('body.objects.categories.0').should('has.property', 'description');
    })

    //check the array of categories within the response, it must have icon property
    it('verify icon property', () => {
        cy.request('categories/').its('body.objects.categories.0').should('has.property', 'icon');
    })

});