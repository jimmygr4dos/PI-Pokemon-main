/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should get 200', () =>
      agent.get('/pokemons').expect(200)
    );

    it('should return status 404 and the correct message if pokemon\'s name is invalid', async () => {
      const res = await request(app).get('/pokemons/P0K3M0N');
      expect(res.statusCode).toBe(404);
      expect(res.text).toBe("This Pokemon doesn't exist!");
    })

    it('should return status 404 and the correct message if pokemon\'s Id is invalid', async () => {
      const res = await request(app).get('/pokemons/0');
      expect(res.statusCode).toBe(404);
      expect(res.text).toBe("This Pokemon doesn't exist!");
    })

  });
});
