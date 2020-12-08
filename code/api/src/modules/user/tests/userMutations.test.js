import request from 'supertest';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from '../../../setup/schema';

describe('users graphql', () => {
  let server;
  beforeAll( async (done) => {
    server = express();
    server.use(
      "/",
      graphqlHTTP({
        schema: schema,
        graphiql: false
      })
    );
    done();
  });

  it('fetches all the users', async (done) => {
    const response = await request(server)
      .post('/graphql')
      .send({mutation: ` {userSignup { email: 'foo@bar.test', name: 'baz', password: '1234'}}`})
    console.log(response.body.data);
      // expect(response.body.data.length).toBe(2);
      done();
  });


})

