const testUser = Cypress.env('env').testUser;
const testNonAdminUser = Cypress.env('env').testNonAdminUser;
var id;

describe('Test create a order', () => {

    // check when all correct properties are sent, all parameters must match
    it('create a food with the correct properties', () => {
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
            id = response.body.objects.order.id;
        })
    })

})


describe('Test cases where request does not have the correct properties in the body', () => {

    // Verify if request has id property
    it('body has id property', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + id,
                body: {
                    id: 22,
                    payment_type: 'cash',
                    delivery_method: 'delivery',
                    commentary: 'commentary',
                    address_id: 22
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

    // Verify if request has status property
    it('body has status property', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + id,
                body: {
                    status: 'inProgress',
                    payment_type: 'cash',
                    delivery_method: 'delivery',
                    commentary: 'commentary',
                    address_id: 22
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

    // Verify if request has user_id property
    it('body has user_id property', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + id,
                body: {
                    user_id: '22',
                    payment_type: 'cash',
                    delivery_method: 'delivery',
                    commentary: 'commentary',
                    address_id: 22
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



})