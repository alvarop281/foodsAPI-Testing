var faker = require('faker');
const testUser = Cypress.env('env').testUser;

describe('Tests for the post (login) method of the authentication resource', () => {

    // the password property must have at least 6 character
    it('body has the password property, with 5 character', () => {
        cy.request({
            method: 'POST',
            url: 'auth/login/',
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                password: "12345"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('success', false)
            expect(response.body.businessError).to.have.length(1)
            expect(response.body.businessError['0']).to.have.property('param', 'password')
            expect(response.body.businessError['0']).to.have.property('msg', 'Invalid Password')
            expect(response.body.objects).to.have.length(0)
        })
    })

    // the phone_number property must have at least 12 character
    it('body has the phone_number property, with 11 character', () => {
        cy.request({
            method: 'POST',
            url: 'auth/login/',
            body: {
                phone_number: 12345678901,
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('success', false)
            expect(response.body.businessError).to.have.length(1)
            expect(response.body.businessError['0']).to.have.property('param', 'phone_number')
            expect(response.body.businessError['0']).to.have.property('msg', 'You must indicate your Phone Number')
            expect(response.body.objects).to.have.length(0)
        })
    })

    // the password property must have at least 6 character
    // the phone_number property must have at least 12 character
    it('body has the password property, with 5 character and has the phone_number property, with 11 character', () => {
        cy.request({
            method: 'POST',
            url: 'auth/login/',
            body: {
                phone_number: 12345678901,
                password: "12345"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('success', false)
            expect(response.body.businessError).to.have.length(2)
            expect(response.body.businessError['0']).to.have.property('param', 'password')
            expect(response.body.businessError['1']).to.have.property('param', 'phone_number')
            expect(response.body.objects).to.have.length(0)
        })
    })

    // check when password is wrong
    it('body has the wrong password', () => {
        cy.request({
            method: 'POST',
            url: 'auth/login/',
            body: {
                phone_number: testUser.phone_number,
                password: "12345"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('success', false)
            expect(response.body.businessError).to.have.length(1)
            expect(response.body.businessError['0']).to.have.property('param', 'password')
            expect(response.body.businessError['0']).to.have.property('msg', 'Invalid Password')
            expect(response.body.objects).to.have.length(0)
        })
    })

    // check when phone_number is wrong
    it('body has the wrong phone_number', () => {
        cy.request({
            method: 'POST',
            url: 'auth/login/',
            body: {
                phone_number: 123456789012,
                password: testUser.password
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401)
            expect(response.body).to.have.property('success', false)
            expect(response.body.businessError['0']).to.have.property('param', 'phone_number')
            expect(response.body.businessError['0']).to.have.property('msg', 'Invalid phone number')
            expect(response.body.objects).to.have.length(0)
        })
    })

    // check when all correct properties are sent
    it('All correct properties are sent', () => {
        cy.request({
            method: 'POST',
            url: 'auth/login/',
            body: {
                phone_number: testUser.phone_number,
                password: testUser.password
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('success', true)
            expect(response.body.businessMessage.token).to.exist
            expect(response.body.objects.user).to.exist
            expect(response.body.objects.user).to.have.property('id')
            expect(response.body.objects.user).to.have.property('dni')
            expect(response.body.objects.user).to.have.property('full_name')
            expect(response.body.objects.user).to.have.property('phone_number')
        })
    })

})