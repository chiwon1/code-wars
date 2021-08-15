const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe("01. Basic render", () => {
  describe("01-1. GET `/login`", () => {
    it("should respond with template", (done) => {
      request(app)
        .get("/login")
        .expect("Content-Type", "text/html; charset=utf-8")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Sign up");
          done();
        });
    });
  });

  describe("01-2. GET static assets", () => {
    it("should be able to get static css file", (done) => {
      request(app)
        .get("/stylesheets/style.css")
        .expect("Content-Type", /css/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Lucida Grande");
          done();
        });
    });

    it("should be able to get static js file", (done) => {
      request(app)
        .get("/javascripts/index.js")
        .expect("Content-Type", /javascript/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("console.log(\"hello world!\");");
          done();
        });
    });
  });
});
