var allRow;

describe('Testing for category resource', () => {

    it('verify the response of the query to the category resource', () => {
        cy.request('categories/')
            .then((response) => {
                expect(response.status).to.eq(200)
                    //.its('headers').its('content-type').should('include', 'application/json')
                expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
                    // check success property inside response, it must be true
                expect(response.body).to.have.property('success', true)
                    //check the businessMessage property inside the response, it must be empty
                expect(response.body.businessMessage).to.have.lengthOf(0)
                    //check the objects property inside the response, it should have the array of categories
                expect(response.body.objects.categories).to.exist
                    //check the array of categories within the response, it must have id property
                expect(response.body.objects.categories[0]).to.have.property('id')
                    //check the array of categories within the response, it must have description property
                expect(response.body.objects.categories[0]).to.have.property('description')
                    //check the array of categories within the response, it must have icon property
                expect(response.body.objects.categories[0]).to.have.property('icon')
            })
    });

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