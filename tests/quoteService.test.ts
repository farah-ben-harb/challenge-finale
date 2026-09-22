import test from "node:test";
import assert from "node:assert/strict";

import { parseMarketMessage } from "../src/services/quoteService.js";

test("parses a valid market message", () => {
  const result = parseMarketMessage(
    "BUY EURUSD 1.0812 1000000 Alpha"
  );

  assert.deepEqual(result, {
    side: "BUY",
    symbol: "EURUSD",
    price: 1.0812,
    quantity: 1000000,
    broker: "Alpha"
  });
});

test("normalizes side and symbol case", () => {
  const result = parseMarketMessage(
    "buy eurusd 1.0815 500000 Gamma"
  );

  assert.deepEqual(result, {
    side: "BUY",
    symbol: "EURUSD",
    price: 1.0815,
    quantity: 500000,
    broker: "Gamma"
  });
});

test("handles extra whitespace", () => {
  const result = parseMarketMessage(
    "   SELL    GBPUSD   1.2695   750000   Alpha   "
  );

  assert.deepEqual(result, {
    side: "SELL",
    symbol: "GBPUSD",
    price: 1.2695,
    quantity: 750000,
    broker: "Alpha"
  });
});

test("rejects unsupported side", () => {
  const result = parseMarketMessage(
    "HOLD EURUSD 1.0812 500000 Beta"
  );

  assert.equal(result, null);
});

test("rejects zero price", () => {
  const result = parseMarketMessage(
    "BUY EURUSD 0 100000 Alpha"
  );

  assert.equal(result, null);
});

test("rejects negative price", () => {
  const result = parseMarketMessage(
    "BUY EURUSD -1 100000 Alpha"
  );

  assert.equal(result, null);
});

test("rejects invalid price", () => {
  const result = parseMarketMessage(
    "BUY EURUSD hello 100000 Alpha"
  );

  assert.equal(result, null);
});

test("rejects zero quantity", () => {
  const result = parseMarketMessage(
    "SELL GBPUSD 1.27 0 Alpha"
  );

  assert.equal(result, null);
});

test("rejects negative quantity", () => {
  const result = parseMarketMessage(
    "SELL GBPUSD 1.27 -10 Alpha"
  );

  assert.equal(result, null);
});

test("rejects invalid quantity", () => {
  const result = parseMarketMessage(
    "BUY EURUSD 1.0812 hello Alpha"
  );

  assert.equal(result, null);
});

test("rejects malformed message", () => {
  const result = parseMarketMessage(
    "INVALID MESSAGE"
  );

  assert.equal(result, null);
});

test("rejects message with missing broker", () => {
  const result = parseMarketMessage(
    "BUY EURUSD 1.0812 100000"
  );

  assert.equal(result, null);
});

test("rejects message with missing symbol", () => {
  const result = parseMarketMessage(
    "BUY  1.0812 100000 Alpha"
  );

  assert.equal(result, null);
});