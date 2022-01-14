var faker = require('faker');
const testNonAdminUser = Cypress.env('env').testNonAdminUser;
const testUser = Cypress.env('env').testUser;
const newAddress = {
    address: faker.fake("{{address.streetName}}"),
    reference: faker.fake("{{address.streetAddress}}")
}
var address;
var allRow;

describe('Test create a address', () => {

    // check when all correct properties are sent, all parameters must match
    it('POST - create a address with the correct properties', () => {
        cy.request({
            method: 'POST',
            url: 'users/' + testNonAdminUser.id + '/addresses/',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testNonAdminUser.token
            },
            body: {
                address: newAddress.address,
                reference: newAddress.reference
            }
        }).then((response) => {
            // check when all correct properties are sent, status code must be 201
            expect(response.status).to.eq(201)
                // check when all correct properties are sent, success property must be true
            expect(response.body).to.have.property('success', true)
                // check when all correct properties are sent, businessMessage property must have a message
            expect(response.body.businessMessage.message).to.exist
                // check when all correct properties are sent, objects property must have a address
            expect(response.body.objects.address).to.exist
                // check when all correct properties are sent, address property must have a id
            expect(response.body.objects.address.id).to.exist
                // check when all correct properties are sent, address property must have a address
            expect(response.body.objects.address.address).to.exist
                // check when all correct properties are sent, address property must have a reference
            expect(response.body.objects.address.reference).to.exist

            expect(response.body.objects.address).to.have.property('address', newAddress.address)
            expect(response.body.objects.address).to.have.property('reference', newAddress.reference)
            address = response.body.objects.address;
        })
    })

})

describe('Test cases where request does not have the correct properties in the header', () => {

    // Verify if request has a wrong token
    it('header has a wrong token', () => {
        cy.request({
                method: 'GET',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'Incorrect'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // status code must be 401
                expect(response.status).to.eq(401)
                    // success property must be false
                expect(response.body).to.have.property('success', false)
                    // businessError.param property must to exist
                expect(response.body.businessError[0].param).to.exist
                    // businessError.param property must to be "token"
                expect(response.body.businessError[0].param).to.eq("token")
                    // objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has a wrong token
    it('header has not token', () => {
        cy.request({
                method: 'GET',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // status code must be 401
                expect(response.status).to.eq(401)
                    // success property must be false
                expect(response.body).to.have.property('success', false)
                    // businessError.param property must to exist
                expect(response.body.businessError[0].param).to.exist
                    // businessError.param property must to be "token"
                expect(response.body.businessError[0].param).to.eq("token")
                    // objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has a wrong token
    it("header has another user's token", () => {
        cy.request({
                method: 'GET',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // status code must be 401
                expect(response.status).to.eq(403)
                    // success property must be false
                expect(response.body).to.have.property('success', false)
                    // businessError.param property must to exist
                expect(response.body.businessError[0].param).to.exist
                    // businessError.param property must to be "token"
                expect(response.body.businessError[0].param).to.eq("userId")
                    // objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })
})

describe('Test cases where the request does not have the correct id in the URL', () => {
    // Verify if request has a wrong token
    it("URL has another user's id", () => {
        cy.request({
                method: 'GET',
                url: 'users/' + testUser.id + '/addresses/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // status code must be 401
                expect(response.status).to.eq(403)
                    // success property must be false
                expect(response.body).to.have.property('success', false)
                    // businessError.param property must to exist
                expect(response.body.businessError[0].param).to.exist
                    // businessError.param property must to be "token"
                expect(response.body.businessError[0].param).to.eq("userId")
                    // objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })
})

describe('Testing for address resource', () => {

    it('GET - verify the response of the query to the category resource', () => {
        cy.request({
                method: 'GET',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                }
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                    //.its('headers').its('content-type').should('include', 'application/json')
                expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
                    // check success property inside response, it must be true
                expect(response.body).to.have.property('success', true)
                    //check the businessMessage property inside the response, it must be empty
                expect(response.body.businessMessage).to.have.lengthOf(0)
                    //check the objects property inside the response, it should have the array of addresses
                expect(response.body.objects.addresses).to.exist
                    //check the array of addresses within the response, it must have id property
                expect(response.body.objects.addresses[0]).to.have.property('id')
                    //check the array of addresses within the response, it must have address property
                expect(response.body.objects.addresses[0]).to.have.property('address')
                    //check the array of addresses within the response, it must have reference property
                expect(response.body.objects.addresses[0]).to.have.property('reference')
                    //check the array of addresses within the response, it must have user_id property
                expect(response.body.objects.addresses[0]).to.have.property('user_id')
            })
    });

    // this test allows you to connect to the database and bring all records to make comparisons with the api
    it('query test - take all records from address', () => {
        cy.task('queryDb', 'SELECT * FROM addresses WHERE user_id =' + testNonAdminUser.id).then(function(result) {
            allRow = result;
        })
    })

    // compare all records in the addresses table to the all records in the API
    it('GET - compare quantity of records from addresses, between db and api', () => {
        cy.request({
                method: 'GET',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                }
            })
            .its('body.objects.addresses').should('have.length', allRow['length']);
    })

    // compare the first record in the address table to the first record in the API
    it('GET - compare the id address, between db and api', () => {
        cy.request({
                method: 'GET',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                }
            })
            .its('body.objects.addresses.0.id').should('be.equal', allRow[0]['id']);
    })

    // compare the first record in the address table to the first record in the API
    it('GET - compare the address address, between db and api', () => {
        cy.request({
                method: 'GET',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                }
            })
            .its('body.objects.addresses.0.address').should('be.equal', allRow[0]['address']);
    })

    // compare the first record in the address table to the first record in the API
    it('GET - compare the reference address, between db and api', () => {
        cy.request({
                method: 'GET',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                }
            })
            .its('body.objects.addresses.0.reference').should('be.equal', allRow[0]['reference']);
    })

    // compare the first record in the address table to the first record in the API
    it('GET - compare the user_id address, between db and api', () => {
        cy.request({
                method: 'GET',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                }
            })
            .its('body.objects.addresses.0.user_id').should('be.equal', allRow[0]['user_id']);
    })
})