const categoyID = 1;
var allRow;

describe('Testing for food resource', () => {

    // check content-type in header
    it('check the response of the query to the food resource', () => {
        cy.request('categories/' + categoyID + '/foods/')
            .then((response) => {
                expect(response.status).to.eq(200)
                    //.its('headers').its('content-type').should('include', 'application/json')
                expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8')
                    // check success property inside response, it must be true
                expect(response.body).to.have.property('success', true)
                    //check the businessMessage property inside the response, it must be empty
                expect(response.body.businessMessage).to.have.lengthOf(0)
                    //check the objects property inside the response, it should have the array of foods
                expect(response.body.objects.foods).to.exist
                    //check the array of foods within the response, it must have id property
                expect(response.body.objects.foods[0]).to.have.property('id')
                    //check the array of foods within the response, it must have title property
                expect(response.body.objects.foods[0]).to.have.property('title')
                    //check the array of foods within the response, it must have description property
                expect(response.body.objects.foods[0]).to.have.property('description')
                    //check the array of foods within the response, it must have description property
                expect(response.body.objects.foods[0]).to.have.property('description')
                    //check the array of foods within the response, it must have price property
                expect(response.body.objects.foods[0]).to.have.property('price')
                    //check the array of foods within the response, it must have ingredients property
                expect(response.body.objects.foods[0]).to.have.property('ingredients')
                    //check the array of foods within the response, it must have img_1 property
                expect(response.body.objects.foods[0]).to.have.property('img_1')
                    //check the array of foods within the response, it must have img_2 property
                expect(response.body.objects.foods[0]).to.have.property('img_2')
                    //check the array of foods within the response, it must have category_id property
                expect(response.body.objects.foods[0]).to.have.property('category_id')
                    // check if the category_id returned by the first record matches the categoryID queried
                expect(response.body.objects.foods[0].category_id).to.eq(categoyID)
            })
    });

    // this test allows you to connect to the database and bring all records to make comparisons with the api
    it('query test - take all records from foods with category_id =' + categoyID, () => {
        cy.task('queryDb', 'SELECT * FROM foods WHERE category_id = ' + categoyID).then(function(result) {
            allRow = result;
        })
    })

    // compare all records in the foods table to the all records in the API
    it('compare quantity of records from foods, between db and api', () => {
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