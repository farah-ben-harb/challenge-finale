export interface MarketQuote {
  side: "BUY" | "SELL";
  symbol: string | null;
  price: number;
  quantity: number;
  broker: string;
}