import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';
import { RestaurantService } from 'src/restaurants/restaurants.service';
import { DataSource } from 'typeorm';
import { string } from 'joi';

describe('Restaurant (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;
  let JSONWEBTOKEN_CLIENT: string;
  let JSONWEBTOKEN_OWNER: string;

  const GRAPHQL_PATH = '/graphql';

  const restaurantService = {
    createRestaurant: () => {
      console.log('mock createRestaurant');
      // return ['test'];
      return {
        ok: true,
        error: 'maybe~!',
        restaurantId: 7,
      };
    },
  };

  const roleCheck = (query: string, token: string) => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('x-jwt', token)
      .send({ query })
      .expect(200)
      .expect((res) => {
        expect(res.body.errors[0].message).toBe('Forbidden resource');
      });
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // .overrideProvider(RestaurantService)
      // .useValue(restaurantService)
      .compile();

    app = moduleRef.createNestApplication();
    dataSource = moduleRef.get<DataSource>(DataSource);

    await app.init();
  });

  describe('User account init', () => {
    const testUser_client = {
      email: 'testUser_client@mail.com',
      password: '1234',
      role: 'Client',
    };
    const testUser_owner = {
      email: 'testUser_owner@mail.com',
      password: '1234',
      role: 'Owner',
    };

    it('create client account', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          mutation {
            createAccount( input: {
              email:"${testUser_client.email}",
              password:"${testUser_client.password}",
              role:${testUser_client.role}
            }) {
              ok
              error
            }
          }
        `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBe(true);
        });
    });
    it('create owner account', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          mutation {
            createAccount( input: {
              email:"${testUser_owner.email}",
              password:"${testUser_owner.password}",
              role:${testUser_owner.role}
            }) {
              ok
              error
            }
          }
        `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBe(true);
        });
    });
    it('login client', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          mutation {
            login( input: {
              email:"${testUser_client.email}",
              password:"${testUser_client.password}",
            }) {
              ok
              error
              token
            }
          }
        `,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.token).toEqual(expect.any(String));
          JSONWEBTOKEN_CLIENT = login.token;
        });
    });
    it('login owner', async () => {
      return await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
          mutation {
            login( input: {
              email:"${testUser_owner.email}",
              password:"${testUser_owner.password}",
            }) {
              ok
              error
              token
            }
          }
        `,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.token).toEqual(expect.any(String));
          JSONWEBTOKEN_OWNER = login.token;
        });
    });
  });

  afterAll(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
    await app.close();
  });

  it('EditRestaurantOutput,', () => {
    'EditRestaurantOutput';
  });
  it('restaurants', () => {
    'restaurants';
  });
  it('restaurant', () => {
    'restaurant';
  });

  const basicRequest = () => {
    return request(app.getHttpServer()).post('/graphql');
  };
  const publicRequest = (query: string) => {
    return basicRequest().send({ query });
  };
  const privateRequest = (query: string, token: string) => {
    return basicRequest()
      .set({
        'x-jwt': token,
      })
      .send({ query });
  };

  describe('createRestaurants', () => {
    it('create Restaurants', async () => {
      return await privateRequest(
        `
          mutation {
            createRestaurants( input: {
              name:"Korean BBQ",
              categoryName:"BBQ",
            }) {
              ok
              error
              restaurantId
            }
          }
        `,
        JSONWEBTOKEN_OWNER,
      )
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { createRestaurants },
            },
          } = res;
          expect(createRestaurants.ok).toBe(true);
          expect(createRestaurants.restaurantId).toEqual(expect.any(Number));
        });
    });
    it('권한없는 사용자 레스토랑 생성 시도', () => {
      return roleCheck(
        `
        mutation {
          createRestaurants( input: {
            name:"Mexican BBQ",
            categoryName:"BBQ",
          }) {
            ok
            error
            restaurantId
          }
        }
      `,
        JSONWEBTOKEN_CLIENT,
      );
    });
  });

  describe('myRestaurants', () => {
    it('Success of the restaurant inquiry of the user who logged in', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_PATH)
        .set('x-jwt', JSONWEBTOKEN_OWNER)
        .send({
          query: `
          {
            myRestaurants {
              ok
              error
              restaurants {
                name
                category {
                  name
                }
              }
            }
          }        
        `,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { myRestaurants },
            },
          } = res;
          expect(myRestaurants.ok).toBe(true);
          expect(myRestaurants).toHaveProperty('restaurants[0].name');
          expect(myRestaurants).toHaveProperty('restaurants[0].category.name');
        });
    });
    it('권한없는 사용자가 레스토랑 조회', () => {
      return roleCheck(
        `
        {
          myRestaurants {
            ok
            error
            restaurants {
              name
              coverImg
              address
              category {
                name
              }
            }
          }
        }        
        `,
        JSONWEBTOKEN_CLIENT,
      );
    });
  });
  it('editRestaurant', () => {
    'editRestaurant';
  });
  it('deleteRestaurant', () => {
    'deleteRestaurant';
  });
  it('updateRestaurant', () => {
    'updateRestaurant';
  });
  it('SearchRestaurant', () => {
    'SearchRestaurant';
  });
});
