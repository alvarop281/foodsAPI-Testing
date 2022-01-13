var faker = require('faker');
const testUser = Cypress.env('env').testUser;
const testNonAdminUser = Cypress.env('env').testNonAdminUser;

describe('Test method put for user resource', () => {

    // Verify if request has id property
    it('PUT - body has id property', () => {
        cy.request({
                method: 'PUT',
                url: '/users/' + testUser.id,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
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

    // Verify if request has not phone_number property
    it('PUT - body has not phone_number property', () => {
        cy.request({
            method: 'PUT',
            url: '/users/' + testUser.id,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not phone_number property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not phone_number property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not phone_number property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not phone_number property, businessError.param property is equal to phone_number
            expect(response.body.businessError[0]).to.have.property('param', 'phone_number')
                // Verify if request has not phone_number property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // Verify if request has not full_name property
    it('PUT - body has not full_name property', () => {
        cy.request({
            method: 'PUT',
            url: '/users/' + testUser.id,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
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

    // Verify if request has not dni property
    it('PUT - body has not dni property', () => {
        cy.request({
            method: 'PUT',
            url: '/users/' + testUser.id,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).then((response) => {
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

    // check when 2 properties are missing in request body
    it('PUT - body has not 2 properties - businessError.length = 2', () => {
        cy.request({
                method: 'PUT',
                url: '/users/' + testUser.id,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                body: {
                    dni: faker.fake("19{{finance.account}}"),
                    password: faker.fake("{{internet.password}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not icon property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not icon property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not icon property, businessError property length must be 2
                expect(response.body.businessError).to.have.length(2)
                    // Verify if request has not icon property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when 3 properties are missing in request body
    it('PUT - body has not 3 properties - businessError.length = 3', () => {
        cy.request({
                method: 'PUT',
                url: '/users/' + testUser.id,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                body: {},
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

    // check when has id property and all properties are missing in request body
    it('PUT - body has id property and has not properties - businessError.length = 4', () => {
        cy.request({
                method: 'PUT',
                url: '/users/' + testUser.id,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
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
                    // Verify if request has not icon property, businessError property length must be 4
                expect(response.body.businessError).to.have.length(4)
                    // Verify if request has not icon property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check validations for properties
    // the phone_number property must have at least 12 character
    it('PUT - body has the property phone_number, with 11 character', () => {
        cy.request({
            method: 'PUT',
            url: '/users/' + testUser.id,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                phone_number: '12345678901',
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not phone_number property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not phone_number property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not phone_number property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not phone_number property, businessError.param property is equal to phone_number
            expect(response.body.businessError[0]).to.have.property('param', 'phone_number')
                // Verify if request has not phone_number property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // the full_name property must have at least 1 character
    it('PUT - body has the property full_name, with 0 character', () => {
        cy.request({
            method: 'PUT',
            url: '/users/' + testUser.id,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: "",
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

    // the dni property must have at least 9 character
    it('PUT - body has the property dni, with 8 character', () => {
        cy.request({
            method: 'PUT',
            url: '/users/' + testUser.id,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: "12345678",
                password: faker.fake("{{internet.password}}")
            },
            failOnStatusCode: false
        }).then((response) => {
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

    // the password property must have at least 6 character
    it('PUT - body has the password property, with 5 character', () => {
        cy.request({
            method: 'PUT',
            url: '/users/' + testUser.id,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: "12345"
            },
            failOnStatusCode: false
        }).then((response) => {
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

    // Verify if request has a wrong token
    it('PUT - header has a wrong token', () => {
        cy.request({
                method: 'PUT',
                url: '/users/' + testUser.id,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'Incorrect'
                },
                body: {
                    phone_number: faker.fake("{{phone.phoneNumber}}"),
                    full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                    dni: faker.fake("19{{finance.account}}"),
                    password: faker.fake("{{internet.password}}")
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
    it('PUT - header has a token of a non-administrator user', () => {
        cy.request({
                method: 'PUT',
                url: '/users/' + testUser.id,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    phone_number: faker.fake("{{phone.phoneNumber}}"),
                    full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                    dni: faker.fake("19{{finance.account}}"),
                    password: faker.fake("{{internet.password}}")
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

    // Verify if request has a correct token but wrong id
    it('PUT - header has a correct token but wrong id', () => {
        cy.request({
                method: 'PUT',
                url: '/users/' + 9999999,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                body: {
                    phone_number: faker.fake("{{phone.phoneNumber}}"),
                    full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                    dni: faker.fake("19{{finance.account}}"),
                    password: faker.fake("{{internet.password}}")
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

    // check when all correct properties are sent
    it('PUT - update a user with the correct properties', () => {
        cy.request({
            method: 'PUT',
            url: '/users/' + testUser.id,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                phone_number: faker.fake("{{phone.phoneNumber}}"),
                full_name: faker.fake("{{name.firstName}} {{name.lastName}}"),
                dni: faker.fake("19{{finance.account}}"),
                password: faker.fake("{{internet.password}}")
            }
        }).then((response) => {
            // check when all correct properties are sent, status code must be 200
            expect(response.status).to.eq(200)
                // check when all correct properties are sent, success property must be true
            expect(response.body).to.have.property('success', true)
                // check when all correct properties are sent, businessMessage property must have a message
            expect(response.body.businessMessage[0].message).to.exist
                // check when all correct properties are sent, businessMessage property must have a token
            expect(response.body.businessMessage[0].token).to.exist
                // check when all correct properties are sent, objects property must have a user
            expect(response.body.objects.user).to.exist
                // check when all correct properties are sent, user property must have a phone_number
            expect(response.body.objects.user.phone_number).to.exist
                // check when all correct properties are sent, user property must have a full_name
            expect(response.body.objects.user.full_name).to.exist
                // check when all correct properties are sent, user property must have a dni
            expect(response.body.objects.user.dni).to.exist
                // check when all correct properties are sent, user property must have a id
            expect(response.body.objects.user.id).to.exist
        })
    })

    // check when all correct properties are sent, all parameters must match
    it('PUT - update a user with the correct properties - all parameters must match', () => {
        cy.request({
            method: 'PUT',
            url: '/users/' + testUser.id,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                phone_number: testUser.phone_number,
                full_name: testUser.full_name,
                dni: testUser.dni,
                password: testUser.password
            }
        }).then((response) => {

            // check when all correct properties are sent, status code must be 200
            expect(response.status).to.eq(200)
                // check when all correct properties are sent, success property must be true
            expect(response.body).to.have.property('success', true)
                // check when all correct properties are sent, businessMessage property must have a message
            expect(response.body.businessMessage[0].message).to.exist
                // check when all correct properties are sent, businessMessage property must have a token
            expect(response.body.businessMessage[0].token).to.exist
                // check when all correct properties are sent, objects property must have a user
            expect(response.body.objects.user).to.exist
                // check when all correct properties are sent, user property must have a phone_number
            expect(response.body.objects.user.phone_number).to.exist
                // check when all correct properties are sent, user property must have a full_name
            expect(response.body.objects.user.full_name).to.exist
                // check when all correct properties are sent, user property must have a dni
            expect(response.body.objects.user.dni).to.exist
                // check when all correct properties are sent, user property must have a id
            expect(response.body.objects.user.id).to.exist

            expect(response.body.objects.user).to.have.property('phone_number', testUser.phone_number)
            expect(response.body.objects.user).to.have.property('full_name', testUser.full_name)
            expect(response.body.objects.user).to.have.property('dni', testUser.dni)
            expect(response.body.objects.user).to.have.property('id', testUser.id)
        })
    })

})