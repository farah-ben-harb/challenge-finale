import express from "express";

import { marketMessages } from "./data/messages.js";
import {
  parseMarketMessage,
  buildMarketView
} from "./services/quoteService.js";

import type { MarketQuote } from "./types.js";

export const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api/quotes", (req, res) => {
  const validQuotes = marketMessages
    .map(parseMarketMessage)
    .filter(
      (quote): quote is MarketQuote =>
        quote !== null
    );

  const symbolQuery = req.query.symbol;

  if (typeof symbolQuery !== "string") {
    res.json(validQuotes);
    return;
  }

  const normalizedSymbol =
    symbolQuery.trim().toUpperCase();

  const filteredQuotes = validQuotes.filter(
    quote =>
      quote.symbol === normalizedSymbol
  );

  res.json(filteredQuotes);
});

app.get("/api/market", (_req, res) => {
  const marketView =
    buildMarketView(marketMessages);

  res.json(marketView);
});