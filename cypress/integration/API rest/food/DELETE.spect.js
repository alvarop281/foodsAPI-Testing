var faker = require('faker');
const testUser = Cypress.env('env').testUser;
const testNonAdminUser = Cypress.env('env').testNonAdminUser;
const categoyID = 1;
var foodID;
var newFood = {
    title: faker.fake("{{lorem.word}}"),
    price: faker.fake("{{datatype.float}}"),
    description: faker.fake("{{lorem.sentence}}"),
    ingredients: faker.fake("{{lorem.words}}")
}

describe('Test create a food', () => {

    // check when all correct properties are sent   http://localhost:3000/foods/api/v1/foods/:id
    it('create a food with the correct properties', () => {
        cy.request({
                method: 'POST',
                url: 'categories/' + categoyID + '/foods/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                body: {
                    title: newFood.title,
                    price: newFood.price,
                    description: newFood.description,
                    ingredients: newFood.ingredients
                },
            })
            .then((response) => {
                // check when all correct properties are sent, status code must be 201
                expect(response.status).to.eq(201)
                    // check when all correct properties are sent, success property must be true
                expect(response.body).to.have.property('success', true)
                    // check when all correct properties are sent, businessMessage property must have a message
                expect(response.body.businessMessage.message).to.exist
                    // check when all correct properties are sent, objects property must have a food
                expect(response.body.objects.food).to.exist
                    // check when all correct properties are sent, food property must have a title
                expect(response.body.objects.food.title).to.exist
                    // check when all correct properties are sent, food property must have a price
                expect(response.body.objects.food.price).to.exist
                    // check when all correct properties are sent, food property must have a description
                expect(response.body.objects.food.description).to.exist
                    // check when all correct properties are sent, food property must have a ingredients
                expect(response.body.objects.food.ingredients).to.exist
                    // check when all correct properties are sent, food property must have a id
                expect(response.body.objects.food.id).to.exist
                    // check when all correct properties are sent, food property must have a img_1
                expect(response.body.objects.food.img_1).to.exist
                    // check when all correct properties are sent, food property must have a img_2
                expect(response.body.objects.food.img_2).to.exist
                    // all parameters must match
                expect(response.body.objects.food).to.have.property('title', newFood.title)
                expect(response.body.objects.food).to.have.property('price', Number(newFood.price))
                expect(response.body.objects.food).to.have.property('description', newFood.description)
                expect(response.body.objects.food).to.have.property('ingredients', newFood.ingredients)

                foodID = response.body.objects.food.id;
            })
    })
})

describe('Test method delete for food resource', () => {

    // Verify if request has a wrong token
    it('DELETE - header has a wrong token', () => {
        cy.request({
                method: 'DELETE',
                url: '/foods/' + foodID,
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

    // Verify if request has a token of a non-administrator user
    it('DELETE - header has a token of a non-administrator user', () => {
        cy.request({
                method: 'DELETE',
                url: '/foods/' + foodID,
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
                expect(response.body.businessError[0].param).to.eq("User")
                    // objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has wrong id
    it('DELETE - body has wrong id', () => {
        cy.request({
                method: 'DELETE',
                url: '/foods/' + 9999999,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has id property, status code must be 400
                expect(response.status).to.eq(401)
                    // Verify if request has id property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has id property, businessError.param property is equal to id
                expect(response.body.businessError[0].param).to.eq("id")
                    // Verify if request has id property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when all correct properties are sent
    it('DELETE - delete a foods', () => {
        cy.request({
                method: 'DELETE',
                url: '/foods/' + foodID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
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