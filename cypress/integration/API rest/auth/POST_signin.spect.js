var faker = require('faker');

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


    /*it('signin new user', () => {
        cy.request('POST', 'auth/signin/', {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            })
            .its('body').then((body) => {
                newId = body.id;
            })
    })*/


})