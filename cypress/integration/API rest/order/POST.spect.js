var faker = require('faker');
const testNonAdminUser = Cypress.env('env').testNonAdminUser;
const testUser = Cypress.env('env').testUser;

describe('Test cases where request does not have the correct properties in the body', () => {

    // Verify if request has id property
    it('body has id property', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                body: {
                    id: 22
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

    // Verify if request has payment_type property
    it('body has payment_type property', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                body: {
                    payment_type: 'cash'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has payment_type property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has payment_type property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has payment_type property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has payment_type property, businessError.param property is equal to payment_type
                expect(response.body.businessError[0]).to.have.property('param', 'payment_type')
                    // Verify if request has payment_type property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has delivery_method property
    it('body has delivery_method property', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                body: {
                    delivery_method: 'delivery'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has delivery_method property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has delivery_method property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has delivery_method property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has delivery_method property, businessError.param property is equal to payment_type
                expect(response.body.businessError[0]).to.have.property('param', 'delivery_method')
                    // Verify if request has delivery_method property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has commentary property
    it('body has commentary property', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                body: {
                    commentary: 'a'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has commentary property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has commentary property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has commentary property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has commentary property, businessError.param property is equal to commentary
                expect(response.body.businessError[0]).to.have.property('param', 'commentary')
                    // Verify if request has commentary property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has status property
    it('body has status property', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                body: {
                    status: 'active'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has status property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has status property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has status property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has status property, businessError.param property is equal to status
                expect(response.body.businessError[0]).to.have.property('param', 'status')
                    // Verify if request has status property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has address_id property
    it('body has address_id property', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                body: {
                    address_id: '22'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has address_id property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has address_id property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has address_id property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has address_id property, businessError.param property is equal to address_id
                expect(response.body.businessError[0]).to.have.property('param', 'address_id')
                    // Verify if request has address_id property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has user_id property
    it('body has user_id property', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                body: {
                    user_id: '22'
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

    // check when has 2 properties in request body
    it('body has 2 properties', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                body: {
                    id: 22,
                    payment_type: 'cash'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has 2 properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has 2 properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has 2 properties, businessError property length must be 1
                expect(response.body.businessError).to.have.length(2)
                    // Verify if request has 2 properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when has 3 properties in request body
    it('body has 3 properties', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                body: {
                    id: 22,
                    payment_type: 'cash',
                    delivery_method: 'delivery'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has 3 properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has 3 properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has 3 properties, businessError property length must be 1
                expect(response.body.businessError).to.have.length(3)
                    // Verify if request has 3 properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when has 4 properties in request body
    it('body has 4 properties', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                body: {
                    id: 22,
                    payment_type: 'cash',
                    delivery_method: 'delivery',
                    commentary: 'a'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has 4 properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has 4 properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has 4 properties, businessError property length must be 1
                expect(response.body.businessError).to.have.length(4)
                    // Verify if request has 4 properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when has 5 properties in request body
    it('body has 5 properties', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                body: {
                    id: 22,
                    payment_type: 'cash',
                    delivery_method: 'delivery',
                    commentary: 'a',
                    status: 'active'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has 5 properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has 5 properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has 5 properties, businessError property length must be 1
                expect(response.body.businessError).to.have.length(5)
                    // Verify if request has 5 properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when has 6 properties in request body
    it('body has 6 properties', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                body: {
                    id: 22,
                    payment_type: 'cash',
                    delivery_method: 'delivery',
                    commentary: 'a',
                    status: 'active',
                    address_id: '22'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has 6 properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has 6 properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has 6 properties, businessError property length must be 1
                expect(response.body.businessError).to.have.length(6)
                    // Verify if request has 6 properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when has 7 properties in request body
    it('body has 7 properties', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                body: {
                    id: 22,
                    payment_type: 'cash',
                    delivery_method: 'delivery',
                    commentary: 'a',
                    status: 'active',
                    address_id: '22',
                    user_id: '22'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has 7 properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has 7 properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has 7 properties, businessError property length must be 1
                expect(response.body.businessError).to.have.length(7)
                    // Verify if request has 7 properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })
})

describe('Test cases where request does not have the correct properties in the header', () => {

    // Verify if request has a wrong token
    it('header has a wrong token', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/orders/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'Incorrect'
                },
                body: {},
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
                url: 'users/' + testNonAdminUser.id + '/orders/',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {},
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
                url: 'users/' + testNonAdminUser.id + '/orders/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                body: {},
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
                method: 'POST',
                url: 'users/' + testUser.id + '/orders/',
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

describe('Test cases where the request has the correct properties in the body and header', () => {

    // check when all correct properties are sent, all parameters must match
    it('create a order with the correct properties - all parameters must match', () => {
        cy.request({
            method: 'POST',
            url: 'users/' + testNonAdminUser.id + '/orders/',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testNonAdminUser.token
            },
            body: {}
        }).then((response) => {
            // check when all correct properties are sent, status code must be 201
            expect(response.status).to.eq(201)
                // check when all correct properties are sent, success property must be true
            expect(response.body).to.have.property('success', true)
                // check when all correct properties are sent, businessMessage property must have a message
            expect(response.body.businessMessage.message).to.exist
                // check when all correct properties are sent, objects property must have a order
            expect(response.body.objects.order).to.exist
                // check when all correct properties are sent, order property must have a id
            expect(response.body.objects.order.id).to.exist
                // check when all correct properties are sent, status property must have a order
            expect(response.body.objects.order.status).to.exist
                // check when all correct properties are sent, user_id property must have a order
            expect(response.body.objects.order.user_id).to.exist

            expect(response.body.objects.order).to.have.property('status', 'active')
            expect(response.body.objects.order).to.have.property('user_id', testNonAdminUser.id)
        })
    })

})