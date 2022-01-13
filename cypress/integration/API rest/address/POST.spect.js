var faker = require('faker');
const testNonAdminUser = Cypress.env('env').testNonAdminUser;
const testUser = Cypress.env('env').testUser;
const newAddress = {
    address: faker.fake("{{address.streetName}}"),
    reference: faker.fake("{{address.streetAddress}}")
}

describe('Test cases where request does not have the correct properties in the body', () => {

    // Verify if request has id property
    it('body has id property', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                body: {
                    id: 22,
                    address: faker.fake("{{address.streetName}}"),
                    reference: faker.fake("{{address.streetAddress}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has id property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has id property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has id property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has id property, businessError.param property is equal to id
                expect(response.body.businessError[0]).to.have.property('param', 'id')
                    // Verify if request has id property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has user_id property
    it('body has user_id property', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                body: {
                    user_id: 22,
                    address: faker.fake("{{address.streetName}}"),
                    reference: faker.fake("{{address.streetAddress}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has user_id property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has user_id property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has user_id property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has user_id property, businessError.param property is equal to user_id
                expect(response.body.businessError[0]).to.have.property('param', 'user_id')
                    // Verify if request has user_id property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has not address property
    it('body has not address property', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                body: {
                    reference: faker.fake("{{address.streetAddress}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has address property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has address property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has address property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has address property, businessError.param property is equal to address
                expect(response.body.businessError[0]).to.have.property('param', 'address')
                    // Verify if request has address property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })


    // Verify if request has not reference property
    it('body has not reference property', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                body: {
                    address: faker.fake("{{address.streetName}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has reference property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has reference property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has reference property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has reference property, businessError.param property is equal to reference
                expect(response.body.businessError[0]).to.have.property('param', 'reference')
                    // Verify if request has reference property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when 2 properties are missing in request body
    it('body has not 2 properties', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                body: {},
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not all properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not all properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not all properties, businessError property length must be 1
                expect(response.body.businessError).to.have.length(2)
                    // Verify if request has not all properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when has id property and all properties are missing in request body
    it('body has id property and has not properties', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                body: {
                    id: 22,
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not icon property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not icon property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not icon property, businessError property length must be 3
                expect(response.body.businessError).to.have.length(3)
                    // Verify if request has not icon property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when has id and user_id property and all properties are missing in request body
    it('body has id and user_id property and has not properties', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                body: {
                    id: 22,
                    user_id: 22
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not icon property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not icon property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not icon property, businessError property length must be 4
                expect(response.body.businessError).to.have.length(4)
                    // Verify if request has not icon property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check validations for properties
    // the address property must have at least 2 character
    it('body has the address property, with 1 character', () => {
        cy.request({
            method: 'POST',
            url: 'users/' + testNonAdminUser.id + '/addresses/',
            body: {
                address: "a",
                reference: faker.fake("{{address.streetAddress}}")
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not address property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not address property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not address property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not address property, businessError.param property is equal to address
            expect(response.body.businessError[0]).to.have.property('param', 'address')
                // Verify if request has not address property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // the reference property must have at least 2 character
    it('body has the reference property, with 1 character', () => {
        cy.request({
            method: 'POST',
            url: 'users/' + testNonAdminUser.id + '/addresses/',
            body: {
                address: faker.fake("{{address.streetName}}"),
                reference: "a"
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not reference property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not reference property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not reference property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not reference property, businessError.param property is equal to reference
            expect(response.body.businessError[0]).to.have.property('param', 'reference')
                // Verify if request has not reference property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

})


describe('Test cases where request does not have the correct properties in the header', () => {

    // Verify if request has a wrong token
    it('header has a wrong token', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'Incorrect'
                },
                body: {
                    address: faker.fake("{{address.streetName}}"),
                    reference: faker.fake("{{address.streetAddress}}")
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
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    address: faker.fake("{{address.streetName}}"),
                    reference: faker.fake("{{address.streetAddress}}")
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
                method: 'POST',
                url: 'users/' + testUser.id + '/addresses/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    address: faker.fake("{{address.streetName}}"),
                    reference: faker.fake("{{address.streetAddress}}")
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

describe('Test cases where the request has the correct properties in the body and header', () => {

    // check when all correct properties are sent, all parameters must match
    it('create a address with the correct properties - all parameters must match', () => {
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
        })
    })

})