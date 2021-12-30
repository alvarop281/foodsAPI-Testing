const categoyID = 1;
var foodID;
var row;

describe('Testing for food resource', () => {

    // this test allows you to connect to the database and bring the first records to make comparisons with the api
    it('query test - take the first record from foods with category_id =' + categoyID, () => {
        cy.task('queryDb', 'SELECT * FROM foods WHERE category_id = ' + categoyID).then(function(result) {
            row = result[0];
            foodID = result[0]['id'];
        })
    })

    // check content-type in header
    it('verify request returns JSON', () => {
        cy.request('foods/' + foodID)
            .its('headers').its('content-type').should('include', 'application/json')
    });

    // check status code
    it('verify the status', () => {
        cy.request('foods/' + foodID)
            .its('status').should('be.equal', 200)
    })

    // check success property inside response, it must be true
    it('verify success property', () => {
        cy.request('foods/' + foodID)
            .its('body.success').should('be.equal', true)
    })

    //check the businessMessage property inside the response, it must be empty
    it('verify businessMessage property', () => {
        cy.request('foods/' + foodID)
            .its('body.businessMessage').should('have.length', 0)
    })

    //check the property of the objects inside the response, it must have the property food
    it('verify objects property', () => {
        cy.request('foods/' + foodID)
            .its('body.objects').should('has.property', 'food')
    })

    //check food inside response, it should have id property
    it('verify id property', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food').should('has.property', 'id');
    })

    //check food inside response, it must have title property
    it('verify title property', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food').should('has.property', 'title');
    })

    //check food inside response, it must have description property
    it('verify description property', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food').should('has.property', 'description');
    })

    //check food inside response, it must have price property
    it('verify price property', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food').should('has.property', 'price');
    })

    //check food inside response, it must have ingredients property
    it('verify ingredients property', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food').should('has.property', 'ingredients');
    })

    //check food inside response, it must have img_1 property
    it('verify img_1 property', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food').should('has.property', 'img_1');
    })

    //check food inside response, it must have img_2 property
    it('verify img_2 property', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food').should('has.property', 'img_2');
    })

    //check food inside response, it must have category_id property
    it('verify category_id property', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food').should('has.property', 'category_id');
    })

    // compare the record in the food table to record in the API
    it('compare the food id, between db and api', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food.id').should('be.equal', row['id']);
    })

    // compare the record in the food table to record in the API
    it('compare the food title, between db and api', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food.title').should('be.equal', row['title']);
    })

    // compare the record in the food table to record in the API
    it('compare the food description, between db and api', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food.description').should('be.equal', row['description']);
    })

    // compare the record in the food table to record in the API
    it('compare the food img_1, between db and api', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food.img_1').should('be.equal', row['img_1']);
    })

    // compare the record in the food table to record in the API
    it('compare the food img_2, between db and api', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food.img_2').should('be.equal', row['img_2']);
    })

    // compare the record in the food table to record in the API
    it('compare the food ingredients, between db and api', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food.ingredients').should('be.equal', row['ingredients']);
    })

    // compare the record in the food table to record in the API
    it('compare the food price, between db and api', () => {
        cy.request('foods/' + foodID)
            .its('body.objects.food.price').should('be.equal', row['price']);
    })
})