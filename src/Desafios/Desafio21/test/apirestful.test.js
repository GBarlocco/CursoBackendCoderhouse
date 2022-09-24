const request = require(`supertest`)(`http://localhost:8080/test/productos`);
const expect = require(`chai`).expect;

//Test BDD:
describe(`Test api restful entregable 21 - productos`, () => {
    describe(`GET / `, () => {

        it(`Debería retornar status 200`, async () => {
            const response = await request.get(`/`);

            expect(response.status).to.eql(200);
        });

        it(`Debería retornar un arreglo`, async () => {
            const response = await request.get(`/`);

            expect(typeof response._body).to.eql(`object`);
        });
    });

    describe(`POST /`, () => {
        it(`Debería agregar un producto`, async () => {
            const response = await request.post(`/`).send({
                nombre: `producto desde supertest / chai`,
                precio: 1234,
                url: `URL desde supertest / chai`,
                descripcion: `descripción desde supertest / chai`,
                timestamp: new Date().toDateString(),
                codigo: 33333,
                stock: 3,
                cantidad: 0
            });

            expect(response.status).to.eql(201);
        });
    });

    describe(`DELETE / `, () => {

        it(`Debería retornar status 200`, async () => {
            //Colocar id conocido de la DB
            const response = await request.delete(`/632f59fdbafb1e1f9d20e787`);

            expect(response.status).to.eql(200);
        });
    });

    
});
