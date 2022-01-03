var faker = require('faker');
const testUser = Cypress.env('env').testUser;
var id;
var row;

describe('Test create a category', () => {

    it('POST - create a category with the correct properties', () => {
        cy.request({
                method: 'POST',
                url: 'categories/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                body: {
                    description: faker.fake("{{lorem.word}}"),
                    icon: faker.fake("{{image.avatar}}")
                },
            })
            .then((response) => {
                // check when all correct properties are sent, status code must be 201
                expect(response.status).to.eq(201)
                    // check when all correct properties are sent, success property must be true
                expect(response.body).to.have.property('success', true)
                    // check when all correct properties are sent, businessMessage property must have a message
                expect(response.body.businessMessage.message).to.exist
                    // check when all correct properties are sent, objects property must have a category
                expect(response.body.objects.category).to.exist
                    // check when all correct properties are sent, category property must have a id
                expect(response.body.objects.category.id).to.exist
                    // check when all correct properties are sent, category property must have a description
                expect(response.body.objects.category.description).to.exist
                    // check when all correct properties are sent, category property must have a icon
                expect(response.body.objects.category.icon).to.exist

                id = response.body.objects.category['id'];
            })
    })

})

describe('Testing for category resource', () => {

    it('GET - check the response of the query to the category resource', () => {
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
    it('GET - compare the category id, between db and api', () => {
        cy.request('categories/' + id).its('body.objects.category.id').should('be.equal', row['id']);
    })

    // compare the record in the category table to record in the API
    it('GET - compare the category description, between db and api', () => {
        cy.request('categories/' + id).its('body.objects.category.description').should('be.equal', row['description']);
    })

    // compare the record in the category table to record in the API
    it('GET - compare the category icon, between db and api', () => {
        cy.request('categories/' + id).its('body.objects.category.icon').should('be.equal', row['icon']);
    })

});