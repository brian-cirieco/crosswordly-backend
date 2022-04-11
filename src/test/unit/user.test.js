process.env.NODE_ENV = "test";

const { sequelize, User } = require("../../models");

describe("User model unit tests", () => {
  const userData = {
    username: "test",
    displayName: "testDisplayName",
    password: "123"
  }
  let user;

  beforeEach(async () => {
    await sequelize.sync({ force: true });
    user = await User.create(userData);
  });

  test("instantiates properly, alongside a default uuid", () => {
    expect(user).toBeTruthy();
    expect(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
      .test(user.toJSON().id)).toBeTruthy();
    expect(user.toJSON()).toEqual({
      id: user.id,
      highScore: 0,
      ...userData
    });
  });
});