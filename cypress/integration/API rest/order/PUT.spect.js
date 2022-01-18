var faker = require('faker');
const testUser = Cypress.env('env').testUser;
const testNonAdminUser = Cypress.env('env').testNonAdminUser;
var orderID;
var categoryID;
var foodID;
var detailID;
var addressID;

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

describe('Test create a address', () => {

    // check when all correct properties are sent, all parameters must match
    it('create a address with the correct properties - all parameters must match', () => {
        cy.request({
            method: 'POST',
            url: 'users/' + testNonAdminUser.id + '/addresses/',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testNonAdminUser.token
            },
            body: {
                address: faker.fake("{{address.streetName}}"),
                reference: faker.fake("{{address.streetAddress}}")
            }
        }).then((response) => {
            // check when all correct properties are sent, status code must be 201
            expect(response.status).to.eq(201)
                // check when all correct properties are sent, success property must be true
            expect(response.body).to.have.property('success', true)
                // check when all correct properties are sent, businessMessage property must have a message
            expect(response.body.businessMessage.message).to.exist
                // check when all correct properties are sent, objects property must have a address
            expect(response.body.objects.address).to.exist
                // check when all correct properties are sent, address property must have a id
            expect(response.body.objects.address.id).to.exist
                // check when all correct properties are sent, address property must have a address
            expect(response.body.objects.address.address).to.exist
                // check when all correct properties are sent, address property must have a reference
            expect(response.body.objects.address.reference).to.exist

            addressID = response.body.objects.address.id;
        })
    })

})

describe('Test cases when request does not have the correct properties in the header', () => {

    // Verify if request has a wrong token
    it('header has a wrong token', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'Incorrect'
                },
                body: {
                    commentary: 'commentary',
                    address_id: addressID,
                    delivery_method: 'delivery',
                    payment_type: 'cash'
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
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    commentary: 'commentary',
                    address_id: addressID,
                    delivery_method: 'delivery',
                    payment_type: 'cash'
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
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testUser.token
                },
                body: {
                    commentary: 'commentary',
                    address_id: addressID,
                    delivery_method: 'delivery',
                    payment_type: 'cash'
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
                method: 'PUT',
                url: 'users/' + 99999999 + '/orders/' + orderID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    commentary: 'commentary',
                    address_id: addressID,
                    delivery_method: 'delivery',
                    payment_type: 'cash'
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
                    // businessError.param property must to be "userId"
                expect(response.body.businessError[0].param).to.eq("userId")
                    // objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if URL has a wrong detail_id
    it('URL has a wrong detail_id', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + 9999999999,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    commentary: 'commentary',
                    address_id: addressID,
                    delivery_method: 'delivery',
                    payment_type: 'cash'
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

})

describe('Test cases where request does not have the correct properties in the body', () => {

    // Verify if request has id property
    it('body has id property', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    id: 22,
                    payment_type: 'cash',
                    delivery_method: 'delivery',
                    commentary: 'commentary',
                    address_id: addressID
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

    // Verify if request has status property
    it('body has status property', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    status: 'inProgress',
                    payment_type: 'cash',
                    delivery_method: 'delivery',
                    commentary: 'commentary',
                    address_id: addressID
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has status property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has status property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has status property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has status property, businessError.param property is equal to status
                expect(response.body.businessError[0]).to.have.property('param', 'status')
                    // Verify if request has status property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has user_id property
    it('body has user_id property', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    user_id: '22',
                    payment_type: 'cash',
                    delivery_method: 'delivery',
                    commentary: 'commentary',
                    address_id: addressID
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has user_id property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has user_id property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has user_id property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has user_id property, businessError.param property is equal to user_id
                expect(response.body.businessError[0]).to.have.property('param', 'user_id')
                    // Verify if request has user_id property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has not payment_type property
    it('body has not payment_type property', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    delivery_method: 'delivery',
                    commentary: 'commentary',
                    address_id: addressID
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has payment_type property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has payment_type property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has payment_type property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has payment_type property, businessError.param property is equal to payment_type
                expect(response.body.businessError[0]).to.have.property('param', 'payment_type')
                    // Verify if request has payment_type property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has not delivery_method property
    it('body has not delivery_method property', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    payment_type: 'cash',
                    commentary: 'commentary',
                    address_id: addressID
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has delivery_method property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has delivery_method property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has delivery_method property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has delivery_method property, businessError.param property is equal to delivery_method
                expect(response.body.businessError[0]).to.have.property('param', 'delivery_method')
                    // Verify if request has delivery_method property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has not commentary property
    it('body has not commentary property', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    payment_type: 'cash',
                    delivery_method: 'delivery',
                    address_id: addressID
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has commentary property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has commentary property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has commentary property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has commentary property, businessError.param property is equal to commentary
                expect(response.body.businessError[0]).to.have.property('param', 'commentary')
                    // Verify if request has commentary property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // Verify if request has not address_id property
    it('body has not address_id property', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    payment_type: 'cash',
                    delivery_method: 'delivery',
                    commentary: 'commentary'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                //Verify if request has address_id property, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has address_id property, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has address_id property, businessError property length must be 1
                expect(response.body.businessError).to.have.length(1)
                    // Verify if request has address_id property, businessError.param property is equal to address_id
                expect(response.body.businessError[0]).to.have.property('param', 'address_id')
                    // Verify if request has address_id property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when 3 properties are missing in request body
    it('body has not 3 properties', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {
                    address_id: addressID
                },
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not all properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not all properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not all properties, businessError property length must be 3
                expect(response.body.businessError).to.have.length(3)
                    // Verify if request has not all properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when 4 properties are missing in request body
    it('body has not 4 properties', () => {
        cy.request({
                method: 'PUT',
                url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': testNonAdminUser.token
                },
                body: {},
                failOnStatusCode: false
            })
            .then((response) => {
                // Verify if request has not all properties, status code must be 400
                expect(response.status).to.eq(400)
                    // Verify if request has not all properties, success property must be false
                expect(response.body).to.have.property('success', false)
                    // Verify if request has not all properties, businessError property length must be 4
                expect(response.body.businessError).to.have.length(4)
                    // Verify if request has not all properties, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when has id property and all properties are missing in request body
    it('body has id property and has not properties', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
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
                    // Verify if request has not icon property, businessError property length must be 3
                expect(response.body.businessError).to.have.length(3)
                    // Verify if request has not icon property, objects property length must be 0
                expect(response.body.objects).to.have.length(0)
            })
    })

    // check when has id and status properties and all properties are missing in request body
    it('body has id and status properties and has not properties', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                body: {
                    id: 22,
                    status: 'active'
                },
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

    // check when has id, status and user_id properties and all properties are missing in request body
    it('body has id, status and user_id properties and has not properties', () => {
        cy.request({
                method: 'POST',
                url: 'users/' + testNonAdminUser.id + '/addresses/',
                body: {
                    id: 22,
                    status: 'active',
                    user_id: 22
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
    // the commentary property must have at least 2 character
    it('body has the commentary property, with 1 character', () => {
        cy.request({
            method: 'PUT',
            url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testNonAdminUser.token
            },
            body: {
                payment_type: 'cash',
                delivery_method: 'delivery',
                commentary: 'a',
                address_id: addressID
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not commentary property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not commentary property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not commentary property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not commentary property, businessError.param property is equal to commentary
            expect(response.body.businessError[0]).to.have.property('param', 'commentary')
                // Verify if request has not commentary property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // the address_id property must have at least 1 character
    it('body has the address_id property, with 0 character', () => {
        cy.request({
            method: 'PUT',
            url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testNonAdminUser.token
            },
            body: {
                payment_type: 'cash',
                delivery_method: 'delivery',
                commentary: 'commentary',
                address_id: ''
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not address_id property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not address_id property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not address_id property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not address_id property, businessError.param property is equal to address_id
            expect(response.body.businessError[0]).to.have.property('param', 'address_id')
                // Verify if request has not address_id property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

    // the delivery_method property must be delivery or pickUp
    it('body has the delivery_method property, without value', () => {
        cy.request({
            method: 'PUT',
            url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testNonAdminUser.token
            },
            body: {
                payment_type: 'cash',
                delivery_method: '',
                commentary: 'commentary',
                address_id: addressID
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not delivery_method property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not delivery_method property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not delivery_method property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not delivery_method property, businessError.param property is equal to delivery_method
            expect(response.body.businessError[0]).to.have.property('param', 'delivery_method')
                // Verify if request has not delivery_method property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })


    // the payment_type property must be cash or transfer or card
    it('body has the payment_type property, without value', () => {
        cy.request({
            method: 'PUT',
            url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testNonAdminUser.token
            },
            body: {
                payment_type: '',
                delivery_method: 'delivery',
                commentary: 'commentary',
                address_id: addressID
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verify if request has not payment_type property, status code must be 400
            expect(response.status).to.eq(400)
                // Verify if request has not payment_type property, success property must be false
            expect(response.body).to.have.property('success', false)
                // Verify if request has not payment_type property, businessError property length must be 1
            expect(response.body.businessError).to.have.length(1)
                // Verify if request has not payment_type property, businessError.param property is equal to payment_type
            expect(response.body.businessError[0]).to.have.property('param', 'payment_type')
                // Verify if request has not payment_type property, objects property length must be 0
            expect(response.body.objects).to.have.length(0)
        })
    })

})


describe('Test cases where the request has the correct properties', () => {

    // check when all correct properties are sent
    it('update a order with the correct properties - delivery_method = pickUp', () => {
        cy.request({
            method: 'PUT',
            url: 'users/' + testNonAdminUser.id + '/orders/' + orderID,
            headers: {
                'Content-Type': 'application/json',
                'auth-token': testNonAdminUser.token
            },
            body: {
                payment_type: 'cash',
                delivery_method: 'pickUp',
                commentary: 'commentary',
                address_id: addressID
            }
        }).then((response) => {
            // check when all correct properties are sent, status code must be 201
            expect(response.status).to.eq(200)
                // check when all correct properties are sent, success property must be true
            expect(response.body).to.have.property('success', true)
                // check when all correct properties are sent, businessMessage property must have a message
            expect(response.body.businessMessage.message).to.exist
                // check when all correct properties are sent, objects property must have a address
            expect(response.body.objects.order).to.exist
                // check when all correct properties are sent, order property must have a id
            expect(response.body.objects.order.id).to.exist
                // check when all correct properties are sent, order property must have a commentary
            expect(response.body.objects.order.commentary).to.exist
                // check when all correct properties are sent, order property must have a delivery_method
            expect(response.body.objects.order.delivery_method).to.exist
                // check when all correct properties are sent, order property must have a payment_type
            expect(response.body.objects.order.payment_type).to.exist
                // check when all correct properties are sent, order property must have a status
            expect(response.body.objects.order.status).to.exist
                // check when all correct properties are sent, order property must have a user_id
            expect(response.body.objects.order.user_id).to.exist

            expect(response.body.objects.order).to.have.property('id', orderID.toString())
            expect(response.body.objects.order).to.have.property('delivery_method', "pickUp")
            expect(response.body.objects.order).to.have.property('payment_type', "cash")
            expect(response.body.objects.order).to.have.property('status', "inProgress")
            expect(response.body.objects.order).to.have.property('user_id', testNonAdminUser.id.toString())

        })
    })

})