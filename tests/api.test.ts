import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import { app } from "../src/app.js";

test("GET /api/quotes returns valid quotes", async () => {
  const response =
    await request(app)
      .get("/api/quotes");

  assert.equal(response.status, 200);

  assert.ok(
    Array.isArray(response.body)
  );

  assert.ok(
    response.body.length > 0
  );

  assert.ok(
    response.body.every(
      (quote: { price: number; quantity: number }) =>
        quote.price > 0 &&
        quote.quantity > 0
    )
  );
});
import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";

import { app } from "../src/app.js";

test("GET /api/quotes returns valid quotes", async () => {
  const response =
    await request(app)
      .get("/api/quotes");

  assert.equal(response.status, 200);

  assert.ok(
    Array.isArray(response.body)
  );

  assert.ok(
    response.body.length > 0
  );

  assert.ok(
    response.body.every(
      (quote: { price: number; quantity: number }) =>
        quote.price > 0 &&
        quote.quantity > 0
    )
  );
});
test(
  "GET /api/quotes filters symbols case-insensitively",
  async () => {

    const response =
      await request(app)
        .get("/api/quotes")
        .query({
          symbol: "eurusd"
        });

    assert.equal(response.status, 200);

    assert.ok(
      response.body.length > 0
    );

    assert.ok(
      response.body.every(
        (quote: { symbol: string }) =>
          quote.symbol === "EURUSD"
      )
    );
  }
);
test(
  "GET /api/quotes trims symbol filter",
  async () => {

    const response =
      await request(app)
        .get("/api/quotes")
        .query({
          symbol: "  eurusd  "
        });

    assert.equal(response.status, 200);

    assert.ok(
      response.body.length > 0
    );

    assert.ok(
      response.body.every(
        (quote: { symbol: string }) =>
          quote.symbol === "EURUSD"
      )
    );
  }
);