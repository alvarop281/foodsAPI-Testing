var faker = require('faker');
const testUser = Cypress.env('env').testUser;
const userTest = {
    phone_number: faker.fake("{{phone.phoneNumber}}"),
    full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
    dni: faker.fake("19{{finance.account}}"),
    password: faker.fake("{{internet.password}}")
}

describe('Tests for the post (signin) method of the authentication resource', () => {

    // Verify if request has id property
    it('body has id property', () => {
        cy.request({
                method: 'POST',
                url: 'auth/signin/',
                body: {
                    id: 22,
                    phone_number: faker.fake("{{phone.phoneNumber}}"),
                    full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                    dni: faker.fake("19{{finance.account}}"),
                    password: faker.fake("{{internet.password}}")
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


    // Verify if request has not full_name property
    it('body has not full_name property', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not full_name property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not full_name property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not full_name property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not full_name property, businessError.param property is equal to full_name
            expect(response.body.businessError[0]).to.have.property('param', 'full_name')
                // Verify if request has not full_name property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // Verify if request has not phone_number property           
    it('body has not phone_number property', () => {
        cy.request({
                method: 'POST',
                url: 'auth/signin/',
                body: {
                    full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                    dni: faker.fake("19{{finance.account}}"),
                    password: faker.fake("{{internet.password}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not phone_number property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not phone_number property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not phone_number property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has not phone_number property, businessError.param property is equal to full_name
                expect(response.body.businessError[0]).to.have.property('param', 'phone_number')
                    // Verify if request has not phone_number property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has not dni property
    it('body has not dni property', () => {
        cy.request({
                method: 'POST',
                url: 'auth/signin/',
                body: {
                    phone_number: faker.fake("{{phone.phoneNumber}}"),
                    full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                    password: faker.fake("{{internet.password}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not dni property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not dni property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not dni property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has not dni property, businessError.param property is equal to dni
                expect(response.body.businessError[0]).to.have.property('param', 'dni')
                    // Verify if request has not dni property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })


    // Verify if request has not password property
    it('body has not password property', () => {
        cy.request({
                method: 'POST',
                url: 'auth/signin/',
                body: {
                    phone_number: faker.fake("{{phone.phoneNumber}}"),
                    full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                    dni: faker.fake("19{{finance.account}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not password property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not password property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not password property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has not password property, businessError.param property is equal to password
                expect(response.body.businessError[0]).to.have.property('param', 'password')
                    // Verify if request has not password property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when 2 properties are missing in request body
    it('body has not 2 properties - businessError.length = 2', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}")
            },
            failOnStatusCode: false
        }).its('body.businessError').should('have.length', 2)
    })

    // check when 3 properties are missing in request body
    it('body has not 3 properties - businessError.length = 3', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                dni: faker.fake("19{{finance.account}}")
            },
            failOnStatusCode: false
        }).its('body.businessError').should('have.length', 3)
    })

    // check when 4 properties are missing in request body
    it('body has not 4 properties - businessError.length = 4', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {},
            failOnStatusCode: false
        }).its('body.businessError').should('have.length', 4)
    })

    // check when has id property and all properties are missing in request body
    it('body has id property and has not properties - businessError.length = 5', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                id: 22
            },
            failOnStatusCode: false
        }).its('body.businessError').should('have.length', 5)
    })

    // check validations for properties
    // the full_name property must have at least 1 character
    it('body has the property full_name, with 0 character - businessError.param is equal to full_name', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: "",
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.businessError.0.param').should('be.equal', "full_name")
    })

    // the password property must have at least 6 character
    it('body has the property password, with 5 character - businessError.param is equal to password', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: "12345"
            },
            failOnStatusCode: false
        }).its('body.businessError.0.param').should('be.equal', "password")
    })

    // the dni property must have at least 9 character
    it('body has the property dni, with 8 character - businessError.param is equal to dni', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: "12345678",
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.businessError.0.param').should('be.equal', "dni")
    })

    // the phone_number property must have at least 12 character
    it('body has the property phone_number, with 11 character - businessError.param is equal to phone_number', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: "12345678901",
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.businessError.0.param').should('be.equal', "phone_number")
    })

    // check when trying to add a phone already used by another user
    it('body has the phone_number property, with a phone already used - businessError.param is equal to phone_number or dni', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: testUser.phone_number,
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.businessError.0.param').should('be.equal', "phone_number or dni")
    })

    // check when trying to add a dni already used by another user
    it('body has the dni property, with a dni already used - businessError.param is equal to phone_number or dni', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: testUser.dni,
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.businessError.0.param').should('be.equal', "phone_number or dni")
    })

    // check when all correct properties are sent
    it('signin with the correct properties', () => {
        cy.request({
                method: 'POST',
                url: 'auth/signin/',
                body: {
                    phone_number: faker.fake("{{phone.phoneNumber}}"),
                    full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                    dni: faker.fake("19{{finance.account}}"),
                    password: faker.fake("{{internet.password}}")
                }
            })
            .then((response) => {
                // check when all correct properties are sent, status code must be 201
                expect(response.status).to.eq(201)
                    // check when all correct properties are sent, success property must be true
                expect(response.body).to.have.property('success', true)
                    // check when all correct properties are sent, businessMessage property must have a message
                expect(response.body.businessMessage.message).to.exist
                    // check when all correct properties are sent, businessMessage property must have a token
                expect(response.body.businessMessage.token).to.exist
                    // check when all correct properties are sent, objects property must have a user
                expect(response.body.objects.user).to.exist
                    // check when all correct properties are sent, user property must have a id
                expect(response.body.objects.user.id).to.exist
                    // check when all correct properties are sent, user property must have a phone_number
                expect(response.body.objects.user.phone_number).to.exist
                    // check when all correct properties are sent, user property must have a full_name
                expect(response.body.objects.user.full_name).to.exist
                    // check when all correct properties are sent, user property must have a dni
                expect(response.body.objects.user.dni).to.exist
            })
    })

    // check when all correct properties are sent, all parameters must match
    it('signin with the correct properties - all parameters must match', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: userTest.phone_number,
                full_name: userTest.full_name,
                dni: userTest.dni,
                password: userTest.password
            }
        }).then((response) => {
            expect(response.body.objects.user).to.have.property('full_name', userTest.full_name)
            expect(response.body.objects.user).to.have.property('phone_number', userTest.phone_number)
            expect(response.body.objects.user).to.have.property('dni', userTest.dni)
        })
    })
})