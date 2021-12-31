const userBuyer = Cypress.env('env').userBuyer;

describe('Tests for the Get (profile) method of the authentication resource', () => {

    // execute get method without token in header
    it('execute get method without token in header', () => {
        cy.request({
                method: 'GET',
                url: 'auth/profile/',
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                expect(response.status).to.eq(401)
                expect(response.body).to.have.property('success', false)
                expect(response.body.businessError).to.have.property('param', 'token')
                expect(response.body.businessError).to.have.property('msg', 'Access denied')
                expect(response.body.objects).to.have.length(0)
            })
    });

    // execute get method with wrong token in header
    it('execute get method with wrong token in header', () => {
        cy.request({
                method: 'GET',
                url: 'auth/profile/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': '1'
                },
                failOnStatusCode: false
            })
            .then((response) => {
                expect(response.status).to.eq(401)
                expect(response.body).to.have.property('success', false)
                expect(response.body.businessError).to.have.property('param', 'token')
                expect(response.body.businessError).to.have.property('msg', 'Access denied')
                expect(response.body.objects).to.have.length(0)
            })
    });

    // execute get method with correct token in header
    it('execute get method with correct token in header', () => {
        cy.request({
                method: 'GET',
                url: 'auth/profile/',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': userBuyer.token
                },
            })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('success', true)
                expect(response.body.businessMessage).to.exist
                expect(response.body.objects.user).to.exist
                    // expect(response.body.objects.user).to.have.property('id')
                expect(response.body.objects.user).to.have.property('dni')
                expect(response.body.objects.user).to.have.property('full_name')
                expect(response.body.objects.user).to.have.property('phone_number')
            })
    });
})