var faker = require('faker');
const testUser = Cypress.env('env').testUser;
const categoyID = 1;
var foodID;
var newFood = {
    title: faker.fake("{{lorem.word}}"),
    price: faker.fake("{{datatype.float}}"),
    description: faker.fake("{{lorem.sentence}}"),
    ingredients: faker.fake("{{lorem.words}}")
}

describe('Test create a food', () => {

    // check when all correct properties are sent
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
                expect(response.body.objects.newFood).to.exist
                    // check when all correct properties are sent, food property must have a title
                expect(response.body.objects.newFood.title).to.exist
                    // check when all correct properties are sent, food property must have a price
                expect(response.body.objects.newFood.price).to.exist
                    // check when all correct properties are sent, food property must have a description
                expect(response.body.objects.newFood.description).to.exist
                    // check when all correct properties are sent, food property must have a ingredients
                expect(response.body.objects.newFood.ingredients).to.exist
                    // all parameters must match
                expect(response.body.objects.newFood).to.have.property('title', newFood.title)
                expect(response.body.objects.newFood).to.have.property('price', newFood.price)
                expect(response.body.objects.newFood).to.have.property('description', newFood.description)
                expect(response.body.objects.newFood).to.have.property('ingredients', newFood.ingredients)
                foodID = response.body.objects.newFood.id;
                console.log(foodID)
            })
    })
});