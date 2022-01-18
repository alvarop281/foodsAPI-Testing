var faker = require('faker');
const testUser = Cypress.env('env').testUser;
const testNonAdminUser = Cypress.env('env').testNonAdminUser;
var categoryID;
var foodID;
var orderID;
var detailID;

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
            foodID = res.objects.food.id
        });

    })

})

describe('Test cases when request does not have the correct properties in the header', () => {

    // Verify if request has a wrong token
    it('header has a wrong token', () => {
        cy.request({
                method: 'DELETE',
                url: 'orders/' + orderID + '/details/' + detailID,
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

    // Verify if request has a wrong token
    it('header has not token', () => {
        cy.request({
                method: 'DELETE',
                url: 'orders/' + orderID + '/details/' + detailID,
                headers: {
                    'Content-Type': 'application/json'
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
    it("header has another user's token", () => {
        cy.request({
                method: 'DELETE',
                url: 'orders/' + orderID + '/details/' + detailID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
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
                expect(response.body.businessError[0].param).to.eq("orderId")
                    // objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })
})

describe('Test create a detail', () => {

    // check when all correct properties are sent, all parameters must match
    it('create a detail with the correct properties', () => {
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
            detailID = response.body.objects.detail.id;
        })
    })

})

describe('Test cases when request does not have the correct properties in the URL', () => {

    // Verify if URL has a wrong order_id
    it('URL has a wrong order_id', () => {
        cy.request({
                method: 'DELETE',
                url: 'orders/' + 99999999 + '/details/' + detailID,
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
                    // businessError.param property must to be "orderId"
                expect(response.body.businessError[0].param).to.eq("orderId")
                    // objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if URL has a wrong detail_id
    it('URL has a wrong detail_id', () => {
        cy.request({
                method: 'DELETE',
                url: 'orders/' + orderID + '/details/' + 99999999,
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
                    // businessError.param property must to be "detail_id"
                expect(response.body.businessError[0].param).to.eq("detail_id")
                    // objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

})

describe('test case when trying to delete a detail', () => {

    // check when all correct properties are sent
    it('DELETE - delete a detail', () => {
        cy.request({
            method: 'DELETE',
            url: 'orders/' + orderID + '/details/' + detailID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testNonAdminUser.token
            }
        }).then((response) => {
            // check when all correct properties are sent, status code must be 200
            expect(response.status).to.eq(200)
                // check when all correct properties are sent, success property must be true
            expect(response.body).to.have.property('success', true)
                // check when all correct properties are sent, businessMessage property must have a message
            expect(response.body.businessMessage.message).to.exist
        })
    })
})