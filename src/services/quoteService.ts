import type { MarketQuote } from "../types.js";

export function parseMarketMessage(
  rawMessage: string
): MarketQuote | null {

  const parts = rawMessage.trim().split(/\s+/);

  if (parts.length !== 5) {
    return null;
  }

  const [rawSide, rawSymbol, rawPrice, rawQuantity, rawBroker] = parts;

  const side = rawSide.toUpperCase();
  const symbol = rawSymbol.trim().toUpperCase();
  const price = Number(rawPrice);
  const quantity = Number(rawQuantity);
  const broker = rawBroker.trim();

  if (side !== "BUY" && side !== "SELL") {
    return null;
  }

  if (!symbol) {
    return null;
  }

  if (!Number.isFinite(price) || price <= 0) {
    return null;
  }

  if (!Number.isFinite(quantity) || quantity <= 0) {
    return null;
  }

  if (!broker) {
    return null;
  }

  return {
    side,
    symbol,
    price,
    quantity,
    broker
  };
}