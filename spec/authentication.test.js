const request = require("supertest");
const { expect } = require("chai");
const app = require("../app");

describe("02. GET `/ without login", () => {
  it("should redirect to /login", (done) => {
    request(app)
      .get(`/`)
      .expect("Content-Type", "text/plain; charset=utf-8")
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).to.include("Redirecting to /login");
        done();
      });
  });
});
