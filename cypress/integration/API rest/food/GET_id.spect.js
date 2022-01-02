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