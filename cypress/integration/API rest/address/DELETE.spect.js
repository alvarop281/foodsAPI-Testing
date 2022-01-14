var faker = require('faker');
const testNonAdminUser = Cypress.env('env').testNonAdminUser;
const testUser = Cypress.env('env').testUser;
var id;

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
                address: faker.fake("{{address.streetName}}"),
                reference: faker.fake("{{address.streetAddress}}")
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
            id = response.body.objects.address.id;
        })
    })

})

describe('Test cases where request does not have the correct properties in the header', () => {

    // Verify if request has a wrong token
    it('header has a wrong token', () => {
        cy.request({
                method: 'DELETE',
                url: 'users/' + testNonAdminUser.id + '/addresses/' + id,
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
                method: 'DELETE',
                url: 'users/' + testNonAdminUser.id + '/addresses/' + id,
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
                method: 'DELETE',
                url: 'users/' + testNonAdminUser.id + '/addresses/' + id,
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

describe('Test cases where the request does not have the correct user_id in the URL', () => {
    // Verify if request has a wrong user_id
    it("URL has another user's user_id", () => {
        cy.request({
                method: 'DELETE',
                url: 'users/' + testUser.id + '/addresses/' + id,
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

    // Verify if request has a wrong id
    it("URL has another user's id", () => {
        cy.request({
                method: 'DELETE',
                url: 'users/' + testNonAdminUser.id + '/addresses/' + 999999,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
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
                expect(response.body.businessError[0].param).to.eq("user_id")
                    // objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })
})

describe('Test method delete for food resource', () => {
    // check when all correct properties are sent
    it('DELETE - delete a foods', () => {
        cy.request({
                method: 'DELETE',
                url: 'users/' + testNonAdminUser.id + '/addresses/' + id,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                }
            })
            .then((response) => {
                // check when all correct properties are sent, status code must be 200
                expect(response.status).to.eq(200)
                    // check when all correct properties are sent, success property must be true
                expect(response.body).to.have.property('success', true)
                    // check when all correct properties are sent, businessMessage property must have a message
                expect(response.body.businessMessage.message).to.exist
            })
    })
})