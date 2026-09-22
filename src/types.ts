export interface MarketQuote {
  side: "BUY" | "SELL";
  symbol: string;
  price: number;
  quantity: number;
  broker: string;
}