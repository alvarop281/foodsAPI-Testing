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

var updateFood = {
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

describe('Test method put for foot resource', () => {

    // Verify if request has id property
    it('PUT - body has id property', () => {
        cy.request({
                method: 'PUT',
                url: '/foods/' + foodID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
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
    it('PUT - body has category_id property', () => {
        cy.request({
                method: 'PUT',
                url: '/foods/' + foodID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                body: {
                    category_id: 1,
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
    it('PUT - body has not title property', () => {
        cy.request({
            method: 'PUT',
            url: '/foods/' + foodID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
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

    // Verify if request has not price property
    it('PUT - body has not price property', () => {
        cy.request({
            method: 'PUT',
            url: '/foods/' + foodID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                title: faker.fake("{{lorem.word}}"),
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

    // Verify if request has not description property
    it('PUT - body has not description property', () => {
        cy.request({
            method: 'PUT',
            url: '/foods/' + foodID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                title: faker.fake("{{lorem.word}}"),
                price: faker.fake("{{datatype.float}}"),
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

    // Verify if request has not ingredients property
    it('PUT - body has not ingredients property', () => {
        cy.request({
            method: 'PUT',
            url: '/foods/' + foodID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                title: faker.fake("{{lorem.word}}"),
                price: faker.fake("{{datatype.float}}"),
                description: faker.fake("{{lorem.sentence}}")
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

    // check when 2 properties are missing in request body
    it('PUT - body has not 2 properties - businessError.length = 2', () => {
        cy.request({
                method: 'PUT',
                url: '/foods/' + foodID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                body: {
                    description: faker.fake("{{lorem.sentence}}"),
                    ingredients: faker.fake("{{lorem.words}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not 2 properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not 2 properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not 2 properties, businessError property length must be 2
                expect(response.body.businessError).to.have.length(2)
                    // Verify if request has not 2 properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when 3 properties are missing in request body
    it('PUT - body has not 3 properties - businessError.length = 3', () => {
        cy.request({
                method: 'PUT',
                url: '/foods/' + foodID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                body: {
                    ingredients: faker.fake("{{lorem.words}}")
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not 3 properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not 3 properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not 3 properties, businessError property length must be 3
                expect(response.body.businessError).to.have.length(3)
                    // Verify if request has not 3 properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when 4 properties are missing in request body
    it('PUT - body has not 4 properties - businessError.length = 4', () => {
        cy.request({
                method: 'PUT',
                url: '/foods/' + foodID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                body: {},
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not 4 properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not 4 properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not 4 properties, businessError property length must be 4
                expect(response.body.businessError).to.have.length(4)
                    // Verify if request has not 4 properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when 4 properties are missing in request body and has id property
    it('PUT - body has id property and has not properties', () => {
        cy.request({
                method: 'PUT',
                url: '/foods/' + foodID,
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
                // Verify if request has not 4 properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not 4 properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not 4 properties, businessError property length must be 5
                expect(response.body.businessError).to.have.length(5)
                    // Verify if request has not 4 properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when 4 properties are missing in request body and has id and category_id property
    it('PUT - body has id and category_id and has not properties', () => {
        cy.request({
                method: 'PUT',
                url: '/foods/' + foodID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                body: {
                    id: 22,
                    category_id: 1
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not 4 properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not 4 properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not 4 properties, businessError property length must be 6
                expect(response.body.businessError).to.have.length(6)
                    // Verify if request has not 4 properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check validations for properties
    // the title property must have at least 2 character
    it('PUT - body has title property, with 1 character', () => {
        cy.request({
            method: 'PUT',
            url: '/foods/' + foodID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                title: "a",
                price: faker.fake("{{datatype.float}}"),
                description: faker.fake("{{lorem.sentence}}"),
                ingredients: faker.fake("{{lorem.words}}")
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has title property with 1 character, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has title property with 1 character, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has title property with 1 character, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has title property with 1 character, businessError.param property is equal to title
            expect(response.body.businessError[0]).to.have.property('param', 'title')
                // Verify if request has title property with 1 character, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // the price property must be float
    it('PUT - body has price property, with 1 character', () => {
        cy.request({
            method: 'PUT',
            url: '/foods/' + foodID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                title: faker.fake("{{lorem.word}}"),
                price: "a",
                description: faker.fake("{{lorem.sentence}}"),
                ingredients: faker.fake("{{lorem.words}}")
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has price property with 1 character, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has price property with 1 character, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has price property with 1 character, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has price property with 1 character, businessError.param property is equal to price
            expect(response.body.businessError[0]).to.have.property('param', 'price')
                // Verify if request has price property with 1 character, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })


    // the description property must have at least 2 character
    it('PUT - body has description property, with 1 character', () => {
        cy.request({
            method: 'PUT',
            url: '/foods/' + foodID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                title: faker.fake("{{lorem.word}}"),
                price: faker.fake("{{datatype.float}}"),
                description: 'a',
                ingredients: faker.fake("{{lorem.words}}")
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has description property with 1 character, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has description property with 1 character, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has description property with 1 character, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has description property with 1 character, businessError.param property is equal to description
            expect(response.body.businessError[0]).to.have.property('param', 'description')
                // Verify if request has description property with 1 character, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // the ingredients property must have at least 2 character
    it('PUT - body has ingredients property, with 1 character', () => {
        cy.request({
            method: 'PUT',
            url: '/foods/' + foodID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testUser.token
            },
            body: {
                title: faker.fake("{{lorem.word}}"),
                price: faker.fake("{{datatype.float}}"),
                description: faker.fake("{{lorem.sentence}}"),
                ingredients: "a"
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has ingredients property with 1 character, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has ingredients property with 1 character, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has ingredients property with 1 character, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has ingredients property with 1 character, businessError.param property is equal to ingredients
            expect(response.body.businessError[0]).to.have.property('param', 'ingredients')
                // Verify if request has ingredients property with 1 character, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // Verify if request has a wrong token
    it('PUT - header has a wrong token', () => {
        cy.request({
                method: 'PUT',
                url: '/foods/' + foodID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'incorrect'
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
    it('PUT - header has a token of a non-administrator user', () => {
        cy.request({
                method: 'PUT',
                url: '/foods/' + foodID,
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
                    // businessError.param property must to be "token"
                expect(response.body.businessError[0].param).to.eq("User")
                    // objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has wrong id property
    it('PUT - body has wrong id property', () => {
        cy.request({
                method: 'PUT',
                url: '/foods/' + 999999,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
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

})

describe('Test cases where the request has the correct properties in the body and header', () => {

    it('PUT - update a food with the correct properties', () => {
        //Declarations
        const fileName = 'img/r1.png';
        const fileName2 = 'img/r2.png';
        const method = 'PUT';
        const url = 'http://localhost:3000/foods/api/v1/foods/' + foodID;
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
        formData.set('title', updateFood.title);
        formData.set('price', updateFood.price);
        formData.set('description', updateFood.description);
        formData.set('ingredients', updateFood.ingredients);

        // Perform the request
        cy.form_request(method, url, testUser.token, formData, function(response) {
            const res = JSON.parse(response.response);
            // check when all correct properties are sent, status code must be 201
            expect(response.status).to.eq(200);
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
                //expect(res.objects.food.id).to.exist
                // check when all correct properties are sent, food property must have a img_1
            expect(res.objects.food.img_1).to.exist
                // check when all correct properties are sent, food property must have a img_2
            expect(res.objects.food.img_2).to.exist
                // all parameters must match
            expect(res.objects.food).to.have.property('title', updateFood.title)
            expect(res.objects.food).to.have.property('price', updateFood.price)
            expect(res.objects.food).to.have.property('description', updateFood.description)
            expect(res.objects.food).to.have.property('ingredients', updateFood.ingredients)
            expect(res.objects.food).to.have.property('img_1', "r1.png")
            expect(res.objects.food).to.have.property('img_2', "r2.png")

        });

    })

})