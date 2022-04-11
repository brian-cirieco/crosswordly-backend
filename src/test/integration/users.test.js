process.env.NODE_ENV = "test";

const request = require("supertest");
const { sequelize, User } = require("../../models");
const app = require("../../app.js");
const { v4: uuid } = require("uuid");

describe("users routes", () => {
  let user1, user2, user3;

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    user1 = (await User.create({
      username: "newUser",
      displayName: "testDisplayName",
      password: "123"
    })).toJSON();
    user2 = (await User.create({
      username: "highScorer",
      displayName: "highScorer",
      password: "123",
      highScore: 10
    })).toJSON();
    user3 = (await User.create({
      username: "middleScorer",
      displayName: "middleScorer",
      password: "123",
      highScore: 5
    })).toJSON();
  });

  describe("GET /users", () => {
    test("fetches all users in db", async () => {
      const { body, statusCode } = await request(app)
        .get("/users")
      expect(statusCode).toBe(200);
      expect(body.length).toBe(3);
    });

    test("fetches top 2 users in db ordering them by high score", async () => {
      const { body, statusCode } = await request(app)
        .get("/users")
        .send({ highScores: true, limit: 2 });
      expect(statusCode).toBe(200);
      expect(body.length).toBe(2);
      expect(body).toEqual([ user2, user3 ]);
    });
  });

  describe("GET /users/:id", () => {
    test("gets user1 with their id", async () => {
      const { body, statusCode } = await request(app).get(`/users/${user1.id}`);
      expect(statusCode).toBe(200);
      expect(body).toEqual(user1);
    });

    test("throws error if user does not exist", async () => {
      const { body, statusCode } = await request(app).get(`/users/${uuid()}`);
      expect(statusCode).toBe(404);
      expect(body).toEqual({ msg: "user does not exist" });
    });
  });

  describe("POST /users", () => {

    test("creates new user with valid data", async () => {
      const userData = { username: "test", displayName: "test", password: "123" };
      const { body, statusCode } = await request(app)
        .post("/users")
        .send(userData);
      
      expect(statusCode).toBe(201);
      expect(body).toEqual(expect.objectContaining({ highScore: 0, ...userData }))
    });

    test("throws server error when username not specified", async () => {
      const userData = { displayName: "test", password: "123" };
      const { body, statusCode } = await request(app)
        .post("/users")
        .send(userData);

      expect(statusCode).toBe(500);
      expect(body).toEqual({});
    });

    test("throws server error when displayName not specified", async () => {
      const userData = { username: "test", password: "123" };
      const { body, statusCode } = await request(app)
        .post("/users")
        .send(userData);

      expect(statusCode).toBe(500);
      expect(body).toEqual({});
    });

    test("throws server error when password not specified", async () => {
      const userData = { username: "test", displayName: "test" };
      const { body, statusCode } = await request(app)
        .post("/users")
        .send(userData);

      expect(statusCode).toBe(500);
      expect(body).toEqual({});
    });
  });

  describe("PATCH /users/:id", () => {
    test("updates user1 high score", async () => {
      const { statusCode, body } = await request(app)
        .patch(`/users/${user1.id}`)
        .send({ highScore: 30 });

      expect(statusCode).toBe(200);
      expect(body).toEqual({ ...user1, highScore: 30 });
    });

    test("throws error when updating without high score", async () => {
      const { statusCode, body } = await request(app)
        .patch(`/users/${user1.id}`);
      expect(statusCode).toBe(500);
      expect(body).toEqual({});
    });

    test("throws status code 404 if provided id does not exist", async () => {
      const { statusCode, body } = await request(app)
        .patch(`/users/${uuid()}`);

      expect(statusCode).toBe(404);
      expect(body).toEqual({ msg: "User could not be found" });
    });

  });

  describe("DELETE /users/:id", () => {
    test("deletes user1", async () => {
      const { statusCode, body } = await request(app)
        .delete(`/users/${user1.id}`);

      expect(statusCode).toBe(200);
      expect(body).toEqual({ msg: "User has been deleted" });
      expect(await User.findOne({ where: { id: user1.id } })).toBe(null);
    });

    test("throws status code 404 if provided id does not exist", async () => {
      const { statusCode, body } = await request(app)
        .delete(`/users/${uuid()}`);

      expect(statusCode).toBe(404);
      expect(body).toEqual({ msg: "User could not be found" });
    });
  });

});