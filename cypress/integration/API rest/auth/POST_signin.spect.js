var faker = require('faker');
const userBuyer = Cypress.env('env').userBuyer;
const userTest = {
    phone_number: faker.fake("{{phone.phoneNumber}}"),
    full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
    dni: faker.fake("19{{finance.account}}"),
    password: faker.fake("{{internet.password}}")
}

describe('Tests for the post (signin) method of the authentication resource', () => {

    // -    -   -   -   - Verify if request has id property
    // Verify if request has id property, status code must be 400
    it('body has id property - status 400', () => {
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
        }).its('status').should('be.equal', 400)
    })

    // Verify if request has id property, success property must be false
    it('body has id property - success = false', () => {
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
        }).its('body.success').should('be.equal', false)
    })

    // Verify if request has id property, objects property length must be 0
    it('body has id property - objects.length = 0', () => {
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
        }).its('body.objects').should('have.length', 0)
    })

    // Verify if request has id property, businessError property length must be 1
    it('body has id property - businessError.length = 1', () => {
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
        }).its('body.businessError').should('have.length', 1)
    })

    // Verify if request has id property, businessError.param property is equal to id
    it('body has id property - businessError.param is equal to id', () => {
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
        }).its('body.businessError.0.param').should('be.equal', "id")
    })

    // -    -   -   -   - Verify if request has id property
    // -    -   -   -   - Verify if request has not full_name property

    // Verify if request has not full_name property, status code must be 400
    it('body has not full_name property - status 400', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('status').should('be.equal', 400)
    })

    // Verify if request has not full_name property, success property must be false
    it('body has not full_name property - success = false', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.success').should('be.equal', false)
    })

    // Verify if request has not full_name property, objects property length must be 0
    it('body has not full_name property - objects.length = 0', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.objects').should('have.length', 0)
    })

    // Verify if request has not full_name property, businessError property length must be 1
    it('body has not full_name property - businessError.length = 1', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.businessError').should('have.length', 1)
    })

    // Verify if request has not full_name property, businessError.param property is equal to full_name
    it('body has not full_name property - businessError.param has is equal to full_name', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.businessError.0.param').should('be.equal', "full_name")
    })

    // -    -   -   -   - Verify if request has not full_name property
    // -    -   -   -   - Verify if request has not phone_number property

    // Verify if request has not phone_number property, status code must be 400
    it('body has not phone_number property - status 400', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('status').should('be.equal', 400)
    })

    // Verify if request has not phone_number property, success property must be false
    it('body has not phone_number property - success = false', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.success').should('be.equal', false)
    })

    // Verify if request has not phone_number property, objects property length must be 0
    it('body has not phone_number property - objects.length = 0', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.objects').should('have.length', 0)
    })

    // Verify if request has not phone_number property, businessError property length must be 1
    it('body has not phone_number property - businessError.length = 1', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.businessError').should('have.length', 1)
    })

    // Verify if request has not phone_number property, businessError.param property is equal to phone_number
    it('body has not phone_number property - businessError.param is equal to phone_number', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.businessError.0.param').should('be.equal', "phone_number")
    })

    // -    -   -   -   - Verify if request has not phone_number property
    // -    -   -   -   - Verify if request has not dni property

    // Verify if request has not dni property, status code must be 400
    it('body has not dni property - status 400', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('status').should('be.equal', 400)
    })

    // Verify if request has not dni property, success property must be false
    it('body has not dni property - success = false', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.success').should('be.equal', false)
    })

    // Verify if request has not dni property, objects property length must be 0
    it('body has not dni property - objects.length = 0', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.objects').should('have.length', 0)
    })

    // Verify if request has not dni property, businessError property length must be 1
    it('body has not dni property - businessError.length = 1', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.businessError').should('have.length', 1)
    })

    // Verify if request has not dni property, businessError.param property is equal to dni
    it('body has not dni property - businessError.param is equal to dni', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.businessError.0.param').should('be.equal', "dni")
    })

    // -    -   -   -   - Verify if request has not dni property
    // -    -   -   -   - Verify if request has not password property
    // Verify if request has not password property, status code must be 400
    it('body has not password property - status 400', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}")
            },
            failOnStatusCode: false
        }).its('status').should('be.equal', 400)
    })

    // Verify if request has not password property, success property must be false
    it('body has not password property - success = false', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}")
            },
            failOnStatusCode: false
        }).its('body.success').should('be.equal', false)
    })

    // Verify if request has not password property, objects property length must be 0
    it('body has not password property - objects.length = 0', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}")
            },
            failOnStatusCode: false
        }).its('body.objects').should('have.length', 0)
    })

    // Verify if request has not password property, businessError property length must be 1
    it('body has not password property - businessError.length = 1', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}")
            },
            failOnStatusCode: false
        }).its('body.businessError').should('have.length', 1)
    })

    // Verify if request has not password property, businessError.param property is equal to password
    it('body has not password property - businessError.param is equal to password', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}")
            },
            failOnStatusCode: false
        }).its('body.businessError.0.param').should('be.equal', "password")
    })

    // -    -   -   -   - Verify if request has id property

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
                phone_number: userBuyer.phone_number,
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.businessError.param').should('be.equal', "phone_number or dni")
    })

    // check when trying to add a dni already used by another user
    it('body has the dni property, with a dni already used - businessError.param is equal to phone_number or dni', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: userBuyer.dni,
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).its('body.businessError.param').should('be.equal', "phone_number or dni")
    })

    // check when all correct properties are sent, status code must be 201
    it('signin with the correct properties - status code must be 201', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            }
        }).its('status').should('be.equal', 201)
    })

    // check when all correct properties are sent, success property must be true
    it('signin with the correct properties - success property must be true', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            }
        }).its('body.success').should('be.equal', true)
    })

    // check when all correct properties are sent, businessMessage property must have a message
    it('signin with the correct properties - businessMessage property must have a message', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            }
        }).its('body.businessMessage').should('has.property', 'message')
    })

    // check when all correct properties are sent, businessMessage property must have a token
    it('signin with the correct properties - businessMessage property must have a token', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            }
        }).its('body.businessMessage').should('has.property', 'token')
    })

    // check when all correct properties are sent, objects property must have a user
    it('signin with the correct properties - objects property must have a user', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            }
        }).its('body.objects').should('has.property', 'user')
    })

    // check when all correct properties are sent, user property must have a id
    it('signin with the correct properties - user property must have a id', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            }
        }).its('body.objects.user').should('has.property', 'id')
    })

    // check when all correct properties are sent, user property must have a phone_number
    it('signin with the correct properties - user property must have a phone_number', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            }
        }).its('body.objects.user').should('has.property', 'phone_number')
    })

    // check when all correct properties are sent, user property must have a full_name
    it('signin with the correct properties - user property must have a full_name', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            }
        }).its('body.objects.user').should('has.property', 'full_name')
    })

    // check when all correct properties are sent, user property must have a dni
    it('signin with the correct properties - user property must have a dni', () => {
        cy.request({
            method: 'POST',
            url: 'auth/signin/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            }
        }).its('body.objects.user').should('has.property', 'dni')
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