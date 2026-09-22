export interface MarketQuote {
  side: "BUY" | "SELL";
  symbol: string;
  price: number;
  quantity: number;
  broker: string;
}

export interface MarketView {
  symbol: string;
  bestBid: number | null;
  bestAsk: number | null;
  totalQuantity: number;
  quoteCount: number;
}