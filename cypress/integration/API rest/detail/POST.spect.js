var faker = require('faker');
const testNonAdminUser = Cypress.env('env').testNonAdminUser;
const testUser = Cypress.env('env').testUser;
var orderID;
var foodID;
var categoryID;

describe('Test create a order', () => {

    // check when all correct properties are sent, all parameters must match
    it('create a food with the correct properties', () => {
        cy.request({
            method: 'POST',
            url: 'users/' + testNonAdminUser.id + '/orders/',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testNonAdminUser.token
            },
            body: {}
        }).then((response) => {
            // check when all correct properties are sent, status code must be 201
            expect(response.status).to.eq(201)
                // check when all correct properties are sent, success property must be true
            expect(response.body).to.have.property('success', true)
                // check when all correct properties are sent, businessMessage property must have a message
            expect(response.body.businessMessage.message).to.exist
                // check when all correct properties are sent, objects property must have a order
            expect(response.body.objects.order).to.exist
                // check when all correct properties are sent, order property must have a id
            expect(response.body.objects.order.id).to.exist
                // check when all correct properties are sent, status property must have a order
            expect(response.body.objects.order.status).to.exist
                // check when all correct properties are sent, user_id property must have a order
            expect(response.body.objects.order.user_id).to.exist

            expect(response.body.objects.order).to.have.property('status', 'active')
            expect(response.body.objects.order).to.have.property('user_id', testNonAdminUser.id)
            orderID = response.body.objects.order.id;
        })
    })

})

describe('Test create a category', () => {

    // check when all correct properties are sent, all parameters must match
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
            }
        }).then((response) => {
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
            categoryID = response.body.objects.category.id
        })
    })

})

describe('Test create a food', () => {

    it('create a food with the correct properties and include images', function() {

        //Declarations
        const fileName = 'img/img1.png';
        const fileName2 = 'img/img2.png';
        const method = 'POST';
        const url = 'http://localhost:3000/foods/api/v1/categories/' + categoryID + '/foods/';
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
        formData.set('title', faker.fake("{{lorem.word}}"));
        formData.set('price', 3.5);
        formData.set('description', faker.fake("{{lorem.sentence}}"));
        formData.set('ingredients', faker.fake("{{lorem.words}}"));

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
            foodID = res.objects.food.id;
        });

    })

});

describe('Detail - Test cases where request does not have the correct properties in the body', () => {

    // Verify if request has id property
    it('body has id property', () => {
        cy.request({
                method: 'POST',
                url: 'orders/' + orderID + '/details/',
                body: {
                    id: 22,
                    ordered_quantity: 1,
                    food_id: foodID || 1
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

    // Verify if request has unit_price property
    it('body has unit_price property', () => {
        cy.request({
                method: 'POST',
                url: 'orders/' + orderID + '/details/',
                body: {
                    unit_price: 22,
                    ordered_quantity: 1,
                    food_id: foodID
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has unit_price property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has unit_price property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has unit_price property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has unit_price property, businessError.param property is equal to unit_price
                expect(response.body.businessError[0]).to.have.property('param', 'unit_price')
                    // Verify if request has unit_price property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has total_by_product property
    it('body has total_by_product property', () => {
        cy.request({
                method: 'POST',
                url: 'orders/' + orderID + '/details/',
                body: {
                    total_by_product: 22,
                    ordered_quantity: 1,
                    food_id: foodID
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has total_by_product property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has total_by_product property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has total_by_product property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has total_by_product property, businessError.param property is equal to total_by_product
                expect(response.body.businessError[0]).to.have.property('param', 'total_by_product')
                    // Verify if request has total_by_product property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has order_id property
    it('body has order_id property', () => {
        cy.request({
                method: 'POST',
                url: 'orders/' + orderID + '/details/',
                body: {
                    order_id: 22,
                    ordered_quantity: 1,
                    food_id: foodID
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has order_id property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has order_id property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has order_id property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has order_id property, businessError.param property is equal to order_id
                expect(response.body.businessError[0]).to.have.property('param', 'order_id')
                    // Verify if request has order_id property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has not ordered_quantity property
    it('body has not ordered_quantity property', () => {
        cy.request({
            method: 'POST',
            url: 'orders/' + orderID + '/details/',
            body: {
                food_id: foodID
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not ordered_quantity property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not ordered_quantity property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not ordered_quantity property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not ordered_quantity property, businessError.param property is equal to ordered_quantity
            expect(response.body.businessError[0]).to.have.property('param', 'ordered_quantity')
                // Verify if request has not ordered_quantity property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // Verify if request has not food_id property
    it('body has not food_id property', () => {
        cy.request({
            method: 'POST',
            url: 'orders/' + orderID + '/details/',
            body: {
                ordered_quantity: 1,
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not food_id property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not food_id property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not food_id property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not food_id property, businessError.param property is equal to food_id
            expect(response.body.businessError[0]).to.have.property('param', 'food_id')
                // Verify if request has not food_id property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // check when 2 properties are missing in request body
    it('body has not 2 properties - businessError.length = 2', () => {
        cy.request({
                method: 'POST',
                url: 'orders/' + orderID + '/details/',
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
                url: 'orders/' + orderID + '/details/',
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

    // check when has id property and all properties are missing in request body
    it('body has id and unit_price property and has not properties', () => {
        cy.request({
                method: 'POST',
                url: 'orders/' + orderID + '/details/',
                body: {
                    id: 22,
                    unit_price: 3
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

    // check when has id property and all properties are missing in request body
    it('body has id, unit_price and total_by_product property and has not properties', () => {
        cy.request({
                method: 'POST',
                url: 'orders/' + orderID + '/details/',
                body: {
                    id: 22,
                    unit_price: 3,
                    total_by_product: 999
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not icon property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not icon property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not icon property, businessError property length must be 5
                expect(response.body.businessError).to.have.length(5)
                    // Verify if request has not icon property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when has id property and all properties are missing in request body
    it('body has id, unit_price, total_by_product and order_id property and has not properties', () => {
        cy.request({
                method: 'POST',
                url: 'orders/' + orderID + '/details/',
                body: {
                    id: 22,
                    unit_price: 3,
                    total_by_product: 999,
                    order_id: 1
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not icon property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not icon property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not icon property, businessError property length must be 6
                expect(response.body.businessError).to.have.length(6)
                    // Verify if request has not icon property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check validations for properties
    // the ordered_quantity property
    it('body has the ordered_quantity property, with 0 character', () => {
        cy.request({
            method: 'POST',
            url: 'orders/' + orderID + '/details/',
            body: {
                ordered_quantity: 0,
                food_id: 1
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not ordered_quantity property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not ordered_quantity property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not ordered_quantity property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not ordered_quantity property, businessError.param property is equal to ordered_quantity
            expect(response.body.businessError[0]).to.have.property('param', 'ordered_quantity')
                // Verify if request has not ordered_quantity property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // the food_id property
    it('body has the food_id property, with 0 character', () => {
        cy.request({
            method: 'POST',
            url: 'orders/' + orderID + '/details/',
            body: {
                ordered_quantity: 1,
                food_id: 0
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not food_id property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not food_id property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not food_id property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not food_id property, businessError.param property is equal to food_id
            expect(response.body.businessError[0]).to.have.property('param', 'food_id')
                // Verify if request has not food_id property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // the food_id property is wrong
    it('body has worng food_id property', () => {
        cy.request({
            method: 'POST',
            url: 'orders/' + orderID + '/details/',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testNonAdminUser.token
            },
            body: {
                ordered_quantity: 1,
                food_id: 9999
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not food_id property, status code must be 400
            expect(response.status).to.eq(401)
                // Verify if request has not food_id property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not food_id property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not food_id property, businessError.param property is equal to food_id
            expect(response.body.businessError[0]).to.have.property('param', 'food_id')
                // Verify if request has not food_id property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

})

describe('Test cases where request does not have the correct properties in the header', () => {

    // Verify if request has a wrong token
    it('header has a wrong token', () => {
        cy.request({
                method: 'POST',
                url: 'orders/' + orderID + '/details/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'Incorrect'
                },
                body: {
                    ordered_quantity: 1,
                    food_id: foodID
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

    // Verify if request has a wrong token
    it('header has not token', () => {
        cy.request({
                method: 'POST',
                url: 'orders/' + orderID + '/details/',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    ordered_quantity: 1,
                    food_id: foodID
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

})

describe('Test cases where the request has the correct properties in the body and header', () => {

    // check when all correct properties are sent, all parameters must match
    it('create a detail with the correct properties - all parameters must match', () => {
        cy.request({
            method: 'POST',
            url: 'orders/' + orderID + '/details/',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testNonAdminUser.token
            },
            body: {
                ordered_quantity: 2,
                food_id: foodID
            }
        }).then((response) => {
            // check when all correct properties are sent, status code must be 201
            expect(response.status).to.eq(201)
                // check when all correct properties are sent, success property must be true
            expect(response.body).to.have.property('success', true)
                // check when all correct properties are sent, businessMessage property must have a message
            expect(response.body.businessMessage.message).to.exist
                // check when all correct properties are sent, objects property must have a detail
            expect(response.body.objects.detail).to.exist
                // check when all correct properties are sent, detail property must have a id
            expect(response.body.objects.detail.id).to.exist
                // check when all correct properties are sent, detail property must have a order_id
            expect(response.body.objects.detail.order_id).to.exist
                // check when all correct properties are sent, detail property must have a unit_price
            expect(response.body.objects.detail.unit_price).to.exist
                // check when all correct properties are sent, detail property must have a total_by_product
            expect(response.body.objects.detail.total_by_product).to.exist
                // check when all correct properties are sent, detail property must have a ordered_quantity
            expect(response.body.objects.detail.ordered_quantity).to.exist
                // check when all correct properties are sent, detail property must have a food_id
            expect(response.body.objects.detail.food_id).to.exist

            expect(response.body.objects.detail).to.have.property('order_id', orderID)
            expect(response.body.objects.detail).to.have.property('ordered_quantity', 2)
            expect(response.body.objects.detail).to.have.property('food_id', foodID)
            expect(response.body.objects.detail).to.have.property('unit_price', 3.5)
            expect(response.body.objects.detail).to.have.property('total_by_product', 7)

        })
    })

})


describe('test case when trying to create a detail with an already used foodID', () => {

    // A detail already exists for this order with the same food_id
    it('A detail already exists for this order with the same food_id', () => {
        cy.request({
            method: 'POST',
            url: 'orders/' + orderID + '/details/',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testNonAdminUser.token
            },
            body: {
                ordered_quantity: 1,
                food_id: foodID
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not food_id property, status code must be 400
            expect(response.status).to.eq(401)
                // Verify if request has not food_id property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not food_id property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not food_id property, businessError.param property is equal to food_id
            expect(response.body.businessError[0]).to.have.property('param', 'food_id')
                // Verify if request has not food_id property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })
})