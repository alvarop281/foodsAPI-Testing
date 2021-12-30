const id = 1;
var row;

describe('Testing for category resource', () => {

    // check content-type in header
    it('verify request returns JSON', () => {
        cy.request('categories/' + id)
            .its('headers').its('content-type').should('include', 'application/json')
    });

    // check status code
    it('verify the status', () => {
        cy.request('categories/' + id).its('status').should('be.equal', 200)
    })

    // check success property inside response, it must be true
    it('verify success property', () => {
        cy.request('categories/' + id).its('body.success').should('be.equal', true)
    })

    //check the businessMessage property inside the response, it must be empty
    it('verify businessMessage property', () => {
        cy.request('categories/' + id).its('body.businessMessage').should('have.length', 0)
    })

    //check the property of the objects inside the response, it must have the property category
    it('verify objects property', () => {
        cy.request('categories/' + id).its('body.objects').should('has.property', 'category')
    })

    //check category inside response, it should have id property
    it('verify id property', () => {
        cy.request('categories/' + id).its('body.objects.category').should('has.property', 'id');
    })

    //check the category inside the response, it should have the description property
    it('verify description property', () => {
        cy.request('categories/' + id).its('body.objects.category').should('has.property', 'description');
    })

    //check the category inside the response, it must have icon property
    it('verify icon property', () => {
        cy.request('categories/' + id).its('body.objects.category').should('has.property', 'icon');
    })

    // this test allows you to connect to the database and bring the record to make comparisons with the api
    it('query test - take the record with id = 1 the category table', () => {
        cy.task('queryDb', 'SELECT * FROM categories WHERE id =' + id).then(function(result) {
            row = result['0'];
        })
    })

    // compare the record in the category table to record in the API
    it('compare the category id, between db and api', () => {
        cy.request('categories/' + id).its('body.objects.category.id').should('be.equal', row['id']);
    })

    // compare the record in the category table to record in the API
    it('compare the category description, between db and api', () => {
        cy.request('categories/' + id).its('body.objects.category.description').should('be.equal', row['description']);
    })

    // compare the record in the category table to record in the API
    it('compare the category icon, between db and api', () => {
        cy.request('categories/' + id).its('body.objects.category.icon').should('be.equal', row['icon']);
    })

});