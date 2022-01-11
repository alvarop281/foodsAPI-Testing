var faker = require('faker');
const testUser = Cypress.env('env').testUser;
const categoyID = 1;
var foodID;
var row;

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
                console.log(foodID)
            })
    })
});

describe('Testing for food resource', () => {

    // this test allows you to connect to the database and bring the first records to make comparisons with the api
    it('query test - take the first record from foods with category_id =' + categoyID, () => {
        cy.task('queryDb', 'SELECT * FROM foods WHERE category_id = ' + categoyID).then(function(result) {
            row = result[0];
            foodID = result[0]['id'];
        })
    })

    it('check the response of the query to the food resource', () => {
        cy.request('foods/' + foodID)
            .then((response) => {
                expect(response.status).to.eq(200)
                    //.its('headers').its('content-type').should('include', 'application/json')
                expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
                    // check success property inside response, it must be true
                expect(response.body).to.have.property('success', true)
                    //check the businessMessage property inside the response, it must be empty
                expect(response.body.businessMessage).to.have.lengthOf(0)
                    //check the property of the objects inside the response, it must have the property food
                expect(response.body.objects.food).to.exist
                    //check food inside response, it should have id property
                expect(response.body.objects.food).to.have.property('id')
                    //check food inside response, it must have title property
                expect(response.body.objects.food).to.have.property('title')
                    //check food inside response, it must have description property
                expect(response.body.objects.food).to.have.property('description')
                    //check food inside response, it must have price property
                expect(response.body.objects.food).to.have.property('price')
                    //check food inside response, it must have ingredients property
                expect(response.body.objects.food).to.have.property('ingredients')
                    //check food inside response, it must have img_1 property
                expect(response.body.objects.food).to.have.property('img_1')
                    //check food inside response, it must have img_2 property
                expect(response.body.objects.food).to.have.property('img_2')
                    //check food inside response, it must have category_id property
                expect(response.body.objects.food).to.have.property('category_id')
            })
    });

    // compare the record in the food table to record in the API
    it('compare food, between db and api', () => {
        cy.request('foods/' + foodID)
            .then((response) => {
                expect(response.body.objects.food.id).to.eq(row['id'])
                expect(response.body.objects.food.title).to.eq(row['title'])
                expect(response.body.objects.food.description).to.eq(row['description'])
                expect(response.body.objects.food.img_1).to.eq(row['img_1'])
                expect(response.body.objects.food.img_2).to.eq(row['img_2'])
                expect(response.body.objects.food.ingredients).to.eq(row['ingredients'])
                expect(response.body.objects.food.price).to.eq(row['price'])
            })
    })
})