import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../../setup/schema';

describe('users graphql', () => {
  let server;
  beforeAll(() => {
    server = express();
    server.use(
      "/",
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    );
  });

  it('fetches all the users', async (done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: ` {users { email }}`})
      expect(response.body.data.users.length).toBe(2);
      done();
  });

  it('fetches a users email given a primary key id', async (done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: ` { user(id: 1) { email } }`})
      .expect(200);

      expect(response.body.data.user.email).toBe('admin@crate.com')
       done();
  })

  it('fetches all the users data if we ask for it all', async (done) => {
    const response = await request(server)
      .post('/graphql')
      .send({query: ` { user(id: 1) { name email role createdAt} }`})
      .expect(200);

      expect(response.body).toMatchObject({
        data: {
          user: {
            name: 'The Admin',
            email: 'admin@crate.com',
            role: 'ADMIN',
            createdAt: '1607395980682'
          }
        }
      })
      done();
  })
})
