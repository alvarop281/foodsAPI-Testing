var faker = require('faker');
const testUser = Cypress.env('env').testUser;
const testNonAdminUser = Cypress.env('env').testNonAdminUser;
const newCategory = {
    description: faker.fake("{{lorem.word}}"),
    icon: faker.fake("{{image.avatar}}")
}

describe('Test method post for category resource', () => {

    // Verify if request has id property
    it('body has id property', () => {
        cy.request({
                method: 'POST',
                url: 'categories/',
                body: {
                    id: 22,
                    description: faker.fake("{{lorem.word}}"),
                    icon: faker.fake("{{image.avatar}}")
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

    // Verify if request has not description property
    it('body has not description property', () => {
        cy.request({
            method: 'POST',
            url: 'categories/',
            body: {
                icon: faker.fake("{{image.avatar}}")
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not description property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not description property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not description property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not description property, businessError.param property is equal to description
            expect(response.body.businessError[0]).to.have.property('param', 'description')
                // Verify if request has not description property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // Verify if request has not icon property
    it('body has not icon property', () => {
        cy.request({
            method: 'POST',
            url: 'categories/',
            body: {
                description: faker.fake("{{lorem.word}}")
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not icon property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not icon property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not icon property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not icon property, businessError.param property is equal to icon
            expect(response.body.businessError[0]).to.have.property('param', 'icon')
                // Verify if request has not icon property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // check when 2 properties are missing in request body
    it('body has not 2 properties - businessError.length = 2', () => {
        cy.request({
                method: 'POST',
                url: 'categories/',
                body: {},
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not icon property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not icon property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not icon property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(2)
                    // Verify if request has not icon property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when has id property and all properties are missing in request body
    it('body has id property and has not properties - businessError.length = 3', () => {
        cy.request({
                method: 'POST',
                url: 'categories/',
                body: {
                    id: 22
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not icon property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not icon property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not icon property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(3)
                    // Verify if request has not icon property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check validations for properties
    // the description property must have at least 2 character
    it('body has the property description, with 1 character', () => {
        cy.request({
            method: 'POST',
            url: 'categories/',
            body: {
                description: "a",
                icon: faker.fake("{{image.avatar}}")
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not description property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not description property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not description property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not description property, businessError.param property is equal to description
            expect(response.body.businessError[0]).to.have.property('param', 'description')
                // Verify if request has not description property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // the icon property must have at least 2 character
    it('body has the property icon, with 1 character', () => {
        cy.request({
            method: 'POST',
            url: 'categories/',
            body: {
                description: faker.fake("{{lorem.word}}"),
                icon: "a"
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not icon property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not icon property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not icon property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not icon property, businessError.param property is equal to icon
            expect(response.body.businessError[0]).to.have.property('param', 'icon')
                // Verify if request has not icon property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // Verify if request has a wrong token
    it('header has a wrong token', () => {
        cy.request({
                method: 'POST',
                url: 'categories/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'Incorrect'
                },
                body: {
                    description: faker.fake("{{lorem.word}}"),
                    icon: faker.fake("{{image.avatar}}")
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


    // Verify if request has a token of a non-administrator user
    it('header has a token of a non-administrator user', () => {
        cy.request({
                method: 'POST',
                url: 'categories/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    description: faker.fake("{{lorem.word}}"),
                    icon: faker.fake("{{image.avatar}}")
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
                expect(response.body.businessError[0].param).to.eq("User")
                    // objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when all correct properties are sent
    it('create a category with the correct properties', () => {
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
            })
    })


    // check when all correct properties are sent, all parameters must match
    it('create a category with the correct properties - all parameters must match', () => {
        cy.request({
            method: 'POST',
            url: 'categories/',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                description: newCategory.description,
                icon: newCategory.icon
            }
        }).then((response) => {
            expect(response.body.objects.category).to.have.property('description', newCategory.description)
            expect(response.body.objects.category).to.have.property('icon', newCategory.icon)
        })
    })
});