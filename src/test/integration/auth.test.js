process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");
const { sequelize, User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

describe("POST /auth/token endpoint", () => {
  const userData = {
    username: "test",
    displayName: "testDisplay",
    password: "123",
  };

  beforeAll(async () => {
    const password = await bcrypt.hash(userData.password, 12);
    await sequelize.sync({ force: true });
    await User.create({ ...userData, password });
  });

  afterAll(async () => {
    await sequelize.sync({ force: true });
  });

  test("returns jwt", async () => {
    const { body, statusCode } = await request(app)
      .post("/auth/token")
      .send({ username: userData.username, password: userData.password });
    expect(statusCode).toBe(200);
    expect(body).toEqual({ token: expect.any(String) });
  });

  test("unauthorized with invalid password", async () => {
    const { body, statusCode } = await request(app)
      .post("/auth/token")
      .send({ username: userData.username, password: "invalid" });
    expect(statusCode).toBe(401);
    expect(body).toEqual({ msg: "Invalid login credentials" });
  });

  test("unauthorized with invalid username", async () => {
    const { body, statusCode } = await request(app)
      .post("/auth/token")
      .send({ username: "invalid", password: "invalid" });
    expect(statusCode).toBe(401);
    expect(body).toEqual({ msg: "Invalid login credentials" });
  });
});