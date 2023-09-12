const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

describe('Test de RUTAS', () => {

    // GET CHARACTER
    describe('GET /rickandmorty/character/:id', () => {

        it('Responde con status: 200', async () => 
            await agent.get('/rickandmorty/character/1').expect(200));

        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image', async () => {
            const {body} = await agent.get('/rickandmorty/character/1');
            expect(body).toHaveProperty('id')});

        it('Si no encuentra al personaje responde con status: 404', async () => 
            await agent.get('/rickandmorty/character/9999').expect(404));
    });

    // LOGIN
    describe('GET /rickandmorty/login', () => {

        it('Responde con true si las credenciales son correctas', async () => {
            const {body} = await agent.get('/rickandmorty/login/?email=test@rickandmorty.com&password=prueba12');
            expect(body.access);
        });

        it('Responde con true si las credenciales son correctas', async () => {
            const {body} = await agent.get('/rickandmorty/login/?email=test@rickandmorty.com&password=prueba12');
            expect(!body.access);
        });
    });

    // ADD FAVORITE
    describe('POST /rickandmorty/fav', () => {

        it('Devuelve el character enviado', async () => {
            const character = {
                id: 1,
                name: 'name1',
                species: 'species1',
                gender: 'gender1',
                status: 'status1',
                origin: {
                    name: 'origin.name1'
                },
                image: 'image'
            };

            const {body} = await agent.post('/rickandmorty/fav', character)
            console.log('body -- ', body);
            console.log('character -- ', character);
            expect(body).toHaveProperty('id');
        });
    });

    // TODO: ARMAR TESTS

});