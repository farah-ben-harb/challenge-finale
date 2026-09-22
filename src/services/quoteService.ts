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

export function buildMarketView(
  messages: string[]
): MarketView[] {

  const market = new Map<string, MarketView>();

  for (const message of messages) {

    const quote = parseMarketMessage(message);

    if (!quote) {
      continue;
    }

    if (!market.has(quote.symbol)) {
      market.set(quote.symbol, {
        symbol: quote.symbol,
        bestBid: null,
        bestAsk: null,
        totalQuantity: 0,
        quoteCount: 0
      });
    }

    const view = market.get(quote.symbol)!;

    if (quote.side === "BUY") {
      view.bestBid =
        view.bestBid === null
          ? quote.price
          : Math.max(view.bestBid, quote.price);
    }

    if (quote.side === "SELL") {
      view.bestAsk =
        view.bestAsk === null
          ? quote.price
          : Math.min(view.bestAsk, quote.price);
    }

    view.totalQuantity += quote.quantity;
    view.quoteCount += 1;
  }

  return Array
    .from(market.values())
    .sort((a, b) =>
      a.symbol.localeCompare(b.symbol)
    );
}