const categoyID = 1;
var allRow;

describe('Testing for category resource', () => {

    // check content-type in header
    it('verify request returns JSON', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('headers').its('content-type').should('include', 'application/json')
    });

    // check status code
    it('verify the status', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('status').should('be.equal', 200)
    })

    // check success property inside response, it must be true
    it('verify success property', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.success').should('be.equal', true)
    })

    //check the businessMessage property inside the response, it must be empty
    it('verify businessMessage property', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.businessMessage').should('have.length', 0)
    })

    //check the objects property inside the response, it should have the array of foods
    it('verify objects property', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects').should('has.property', 'foods')
    })

    //check the array of foods within the response, it must have id property
    it('verify id property', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0').should('has.property', 'id');
    })

    //check the array of foods within the response, it must have title property
    it('verify title property', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0').should('has.property', 'title');
    })

    //check the array of foods within the response, it must have description property
    it('verify description property', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0').should('has.property', 'description');
    })

    //check the array of foods within the response, it must have price property
    it('verify price property', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0').should('has.property', 'price');
    })

    //check the array of foods within the response, it must have ingredients property
    it('verify ingredients property', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0').should('has.property', 'ingredients');
    })

    //check the array of foods within the response, it must have img_1 property
    it('verify img_1 property', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0').should('has.property', 'img_1');
    })

    //check the array of foods within the response, it must have img_2 property
    it('verify img_2 property', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0').should('has.property', 'img_2');
    })

    //check the array of foods within the response, it must have category_id property
    it('verify category_id property', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0').should('has.property', 'category_id');
    })

    // check if the category_id returned by the first record matches the categoryID queried
    it('verify category_id matches categoryID', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0.category_id').should('be.equal', categoyID)
    })

    // this test allows you to connect to the database and bring all records to make comparisons with the api
    it('query test - take all records from foods with category_id =' + categoyID, () => {
        cy.task('queryDb', 'SELECT * FROM foods WHERE category_id = ' + categoyID).then(function(result) {
            allRow = result;
        })
    })

    // compare all records in the foods table to the all records in the API
    it('compare quantity of records from category, between db and api', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods').should('have.length', allRow['length']);
    })

    // compare the first record in the foods table to the first record in the API
    it('compare the foods id, between db and api', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0.id').should('be.equal', allRow[0]['id']);
    })

    // compare the first record in the foods table to the first record in the API
    it('compare the foods title, between db and api', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0.title').should('be.equal', allRow[0]['title']);
    })

    // compare the first record in the foods table to the first record in the API
    it('compare the foods description, between db and api', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0.description').should('be.equal', allRow[0]['description']);
    })

    // compare the first record in the foods table to the first record in the API
    it('compare the foods img_1, between db and api', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0.img_1').should('be.equal', allRow[0]['img_1']);
    })

    // compare the first record in the foods table to the first record in the API
    it('compare the foods img_2, between db and api', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0.img_2').should('be.equal', allRow[0]['img_2']);
    })

    // compare the first record in the foods table to the first record in the API
    it('compare the foods ingredients, between db and api', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0.ingredients').should('be.equal', allRow[0]['ingredients']);
    })

    // compare the first record in the foods table to the first record in the API
    it('compare the foods price, between db and api', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .its('body.objects.foods.0.price').should('be.equal', allRow[0]['price']);
    })
});