var faker = require('faker');
const testUser = Cypress.env('env').testUser;
const testNonAdminUser = Cypress.env('env').testNonAdminUser;
var id;
var newFood = {
    title: faker.fake("{{lorem.word}}"),
    price: faker.fake("{{datatype.float}}"),
    description: faker.fake("{{lorem.sentence}}"),
    ingredients: faker.fake("{{lorem.words}}")
}

// To create a food, a category must exist
describe('Test create a category', () => {

    it('POST - create a category with the correct properties', () => {
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

                id = response.body.objects.category['id'];
            })
    })

});


describe('Test cases where request does not have the correct properties in the body', () => {

    // Verify if request has id property
    it('body has id property', () => {
        cy.request({
                method: 'POST',
                url: 'categories/' + id + '/foods/',
                body: {
                    id: 22,
                    title: faker.fake("{{lorem.word}}"),
                    price: faker.fake("{{datatype.float}}"),
                    description: faker.fake("{{lorem.sentence}}"),
                    ingredients: faker.fake("{{lorem.words}}")
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

    // Verify if request has category_id property
    it('body has category_id property', () => {
        cy.request({
                method: 'POST',
                url: 'categories/' + id + '/foods/',
                body: {
                    category_id: 22,
                    title: faker.fake("{{lorem.word}}"),
                    price: faker.fake("{{datatype.float}}"),
                    description: faker.fake("{{lorem.sentence}}"),
                    ingredients: faker.fake("{{lorem.words}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has category_id property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has category_id property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has category_id property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has category_id property, businessError.param property is equal to category_id
                expect(response.body.businessError[0]).to.have.property('param', 'category_id')
                    // Verify if request has category_id property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has not title property
    it('body has not title property', () => {
        cy.request({
                method: 'POST',
                url: 'categories/' + id + '/foods/',
                body: {
                    price: faker.fake("{{datatype.float}}"),
                    description: faker.fake("{{lorem.sentence}}"),
                    ingredients: faker.fake("{{lorem.words}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has title property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has title property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has title property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has title property, businessError.param property is equal to title
                expect(response.body.businessError[0]).to.have.property('param', 'title')
                    // Verify if request has title property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has not price property
    it('body has not price property', () => {
        cy.request({
                method: 'POST',
                url: 'categories/' + id + '/foods/',
                body: {
                    title: faker.fake("{{lorem.word}}"),
                    description: faker.fake("{{lorem.sentence}}"),
                    ingredients: faker.fake("{{lorem.words}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has price property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has price property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has price property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has price property, businessError.param property is equal to price
                expect(response.body.businessError[0]).to.have.property('param', 'price')
                    // Verify if request has price property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has not description property
    it('body has not description property', () => {
        cy.request({
                method: 'POST',
                url: 'categories/' + id + '/foods/',
                body: {
                    title: faker.fake("{{lorem.word}}"),
                    price: faker.fake("{{datatype.float}}"),
                    ingredients: faker.fake("{{lorem.words}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has description property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has description property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has description property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has description property, businessError.param property is equal to description
                expect(response.body.businessError[0]).to.have.property('param', 'description')
                    // Verify if request has description property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has not ingredients property
    it('body has not ingredients property', () => {
        cy.request({
                method: 'POST',
                url: 'categories/' + id + '/foods/',
                body: {
                    title: faker.fake("{{lorem.word}}"),
                    price: faker.fake("{{datatype.float}}"),
                    description: faker.fake("{{lorem.sentence}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has ingredients property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has ingredients property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has ingredients property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has ingredients property, businessError.param property is equal to ingredients
                expect(response.body.businessError[0]).to.have.property('param', 'ingredients')
                    // Verify if request has ingredients property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when 2 properties are missing in request body
    it('body has not 2 properties', () => {
        cy.request({
                method: 'POST',
                url: 'categories/' + id + '/foods/',
                body: {
                    description: faker.fake("{{lorem.sentence}}"),
                    ingredients: faker.fake("{{lorem.words}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not all properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not all properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not all properties, businessError property length must be 1
                expect(response.body.businessError).to.have.length(2)
                    // Verify if request has not all properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when 3 properties are missing in request body
    it('body has not 3 properties', () => {
        cy.request({
                method: 'POST',
                url: 'categories/' + id + '/foods/',
                body: {
                    ingredients: faker.fake("{{lorem.words}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not all properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not all properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not all properties, businessError property length must be 1
                expect(response.body.businessError).to.have.length(3)
                    // Verify if request has not all properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when 4 properties are missing in request body
    it('body has not 4 properties', () => {
        cy.request({
                method: 'POST',
                url: 'categories/' + id + '/foods/',
                body: {

                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(4)
                    // Verify if request has not property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when has id property and all properties are missing in request body
    it('body has id property and has not properties', () => {
        cy.request({
                method: 'POST',
                url: 'categories/' + id + '/foods/',
                body: {
                    id: 22,
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(5)
                    // Verify if request has not property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when has id property and all properties are missing in request body
    it('body has id and category_id property and has not properties', () => {
        cy.request({
                method: 'POST',
                url: 'categories/' + id + '/foods/',
                body: {
                    id: 22,
                    category_id: 22,
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not icon property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not icon property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not icon property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(6)
                    // Verify if request has not icon property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check validations for properties
    // the title property must have at least 2 character
    it('body has the property title, with 1 character', () => {
        cy.request({
            method: 'POST',
            url: 'categories/' + id + '/foods/',
            body: {
                title: 'a',
                price: faker.fake("{{datatype.float}}"),
                description: faker.fake("{{lorem.sentence}}"),
                ingredients: faker.fake("{{lorem.words}}")
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not title property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not title property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not title property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not title property, businessError.param property is equal to title
            expect(response.body.businessError[0]).to.have.property('param', 'title')
                // Verify if request has not title property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // the price property must be float
    it('body has the price property, with 1 character', () => {
        cy.request({
            method: 'POST',
            url: 'categories/' + id + '/foods/',
            body: {
                title: faker.fake("{{lorem.word}}"),
                price: faker.fake("{{lorem.word}}"),
                description: faker.fake("{{lorem.sentence}}"),
                ingredients: faker.fake("{{lorem.words}}")
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not price property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not price property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not price property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not price property, businessError.param property is equal to price
            expect(response.body.businessError[0]).to.have.property('param', 'price')
                // Verify if request has not price property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // the title description must have at least 2 character
    it('body has the description title, with 1 character', () => {
        cy.request({
            method: 'POST',
            url: 'categories/' + id + '/foods/',
            body: {
                title: faker.fake("{{lorem.word}}"),
                price: faker.fake("{{datatype.float}}"),
                description: 'a',
                ingredients: faker.fake("{{lorem.words}}")
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

    // the title ingredients must have at least 2 character
    it('body has the ingredients title, with 1 character', () => {
        cy.request({
            method: 'POST',
            url: 'categories/' + id + '/foods/',
            body: {
                title: faker.fake("{{lorem.word}}"),
                price: faker.fake("{{datatype.float}}"),
                description: faker.fake("{{lorem.sentence}}"),
                ingredients: 'a'
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not ingredients property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not ingredients property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not ingredients property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not ingredients property, businessError.param property is equal to ingredients
            expect(response.body.businessError[0]).to.have.property('param', 'ingredients')
                // Verify if request has not ingredients property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })
});

describe('Test cases where request does not have the correct properties in the header', () => {

    // Verify if request has a wrong token
    it('header has a wrong token', () => {
        cy.request({
                method: 'POST',
                url: 'categories/' + id + '/foods/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'Incorrect'
                },
                body: {
                    title: faker.fake("{{lorem.word}}"),
                    price: faker.fake("{{datatype.float}}"),
                    description: faker.fake("{{lorem.sentence}}"),
                    ingredients: faker.fake("{{lorem.words}}")
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
                url: 'categories/' + id + '/foods/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    title: faker.fake("{{lorem.word}}"),
                    price: faker.fake("{{datatype.float}}"),
                    description: faker.fake("{{lorem.sentence}}"),
                    ingredients: faker.fake("{{lorem.words}}")
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
                    // businessError.param property must to be "User"
                expect(response.body.businessError[0].param).to.eq("User")
                    // objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

});

describe('Test cases where the request has the correct properties in the body and header', () => {

    it('create a food with the correct properties and include images', function() {

        //Declarations
        const fileName = 'img/img1.png';
        const fileName2 = 'img/img2.png';
        const method = 'POST';
        const url = 'http://localhost:3000/foods/api/v1/categories/' + id + '/foods/';
        const fileType = 'image/png';

        // Get file from fixtures as binary
        const imgBin = cy.fixture(fileName, 'binary');
        const imgBin2 = cy.fixture(fileName2, 'binary');

        // File in binary format gets converted to blob so it can be sent as Form data
        const img_1 = Cypress.Blob.binaryStringToBlob(imgBin, fileType);
        const img_2 = Cypress.Blob.binaryStringToBlob(imgBin2, fileType);

        // Build up the form
        const formData = new FormData();
        formData.set('img_1', img_1, fileName); //adding a file to the form
        formData.set('img_2', img_2, fileName2); //adding a file to the form
        formData.set('title', newFood.title);
        formData.set('price', newFood.price);
        formData.set('description', newFood.description);
        formData.set('ingredients', newFood.ingredients);

        // Perform the request
        cy.form_request(method, url, testUser.token, formData, function(response) {
            const res = JSON.parse(response.response);

            // check when all correct properties are sent, status code must be 201
            expect(response.status).to.eq(201);
            // check when all correct properties are sent, success property must be true
            expect(res).to.have.property('success', true)
                // check when all correct properties are sent, businessMessage property must have a message
            expect(res.businessMessage.message).to.exist
                // check when all correct properties are sent, objects property must have a food
            expect(res.objects.food).to.exist
                // check when all correct properties are sent, food property must have a title
            expect(res.objects.food.title).to.exist
                // check when all correct properties are sent, food property must have a price
            expect(res.objects.food.price).to.exist
                // check when all correct properties are sent, food property must have a description
            expect(res.objects.food.description).to.exist
                // check when all correct properties are sent, food property must have a ingredients
            expect(res.objects.food.ingredients).to.exist
                // check when all correct properties are sent, food property must have a id
            expect(res.objects.food.id).to.exist
                // check when all correct properties are sent, food property must have a img_1
            expect(res.objects.food.img_1).to.exist
                // check when all correct properties are sent, food property must have a img_2
            expect(res.objects.food.img_2).to.exist
                // all parameters must match
            expect(res.objects.food).to.have.property('title', newFood.title)
            expect(res.objects.food).to.have.property('price', Number(newFood.price))
            expect(res.objects.food).to.have.property('description', newFood.description)
            expect(res.objects.food).to.have.property('ingredients', newFood.ingredients)
            expect(res.objects.food).to.have.property('img_1', "img1.png")
            expect(res.objects.food).to.have.property('img_2', "img2.png")

        });

    })

});