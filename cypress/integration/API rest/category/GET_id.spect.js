const id = 1;
var row;

describe('Testing for category resource', () => {

    it('check the response of the query to the category resource', () => {
        cy.request('categories/' + id)
            .then((response) => {
                expect(response.status).to.eq(200)
                    //.its('headers').its('content-type').should('include', 'application/json')
                expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
                    // check success property inside response, it must be true
                expect(response.body).to.have.property('success', true)
                    //check the businessMessage property inside the response, it must be empty
                expect(response.body.businessMessage).to.have.lengthOf(0)
                    //check the objects property inside the response, it should have category
                expect(response.body.objects.category).to.exist
                    //check category inside response, it should have id property
                expect(response.body.objects.category).to.have.property('id')
                    //check category inside response, it should have description property
                expect(response.body.objects.category).to.have.property('description')
                    //check category inside response, it should have icon property
                expect(response.body.objects.category).to.have.property('icon')
            })
    });

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