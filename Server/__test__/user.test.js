const app = require("../app");
const { test, expect } = require("@jest/globals");
const request = require("supertest");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

beforeAll(async () => {
  await User.create({
    username: "admin",
    email: "admin@admin.com",
    password: "admin123",
  });
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /login", () => {
  test("POST /login  Success should be return access token", async () => {
    let response = await request(app).post("/login").send({
      email: "admin@admin.com",
      password: "admin123",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  test("POST /login Failed should be return message error if email is null", async () => {
    let response = await request(app).post("/login").send({
      email: "",
      password: "admin123",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "email/password can not be empty"
    );
  });

  test("POST /login Failed should be return message error if password is null", async () => {
    let response = await request(app).post("/login").send({
      email: "johndoe@example.com",
      password: "",
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "email/password can not be empty"
    );
  });

  test("POST /login Failed should be return message error if email not register", async () => {
    let response = await request(app).post("/login").send({
      email: "alibi@example.com",
      password: "password123",
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid user/password");
  });

  test("POST /login Failed should be return message error if password not match", async () => {
    let response = await request(app).post("/login").send({
      email: "admin@admin.com",
      password: "passwordsalah",
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "invalid user/password");
  });
});
