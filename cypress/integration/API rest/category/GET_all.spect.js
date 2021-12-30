var allRow;

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

    // this test allows you to connect to the database and bring all records to make comparisons with the api
    it('query test - take all records from categories', () => {
        cy.task('queryDb', 'SELECT * FROM categories').then(function(result) {
            allRow = result;
        })
    })

    // compare all records in the category table to the all records in the API
    it('compare quantity of records from category, between db and api', () => {
        cy.request('categories/').its('body.objects.categories').should('have.length', allRow['length']);
    })

    // compare the first record in the category table to the first record in the API
    it('compare the category id, between db and api', () => {
        cy.request('categories/').its('body.objects.categories.0.id').should('be.equal', allRow[0]['id']);
    })

    // compare the first record in the category table to the first record in the API
    it('compare the category description, between db and api', () => {
        cy.request('categories/').its('body.objects.categories.0.description').should('be.equal', allRow[0]['description']);
    })

    // compare the first record in the category table to the first record in the API
    it('compare the category icon, between db and api', () => {
        cy.request('categories/').its('body.objects.categories.0.icon').should('be.equal', allRow[0]['icon']);
    })

});