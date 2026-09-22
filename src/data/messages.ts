export const marketMessages: string[] = [
  // Valid EURUSD quotes
  "BUY EURUSD 1.0812 1000000 Alpha",
  "SELL EURUSD 1.0818 2000000 Beta",
  "buy eurusd 1.0815 500000 Gamma",

  // Valid GBPUSD quotes
  "SELL GBPUSD 1.2695 750000 Alpha",
  "BUY GBPUSD 1.2687 1000000 Beta",

  // Valid USDJPY quote
  "SELL USDJPY 148.42 500000 Gamma",

  // Invalid messages
  "BUY EURUSD -1 100000 Alpha",
  "HOLD EURUSD 1.0812 500000 Beta",
  "BUY  1.20 100000 Gamma",
  "SELL GBPUSD 1.27 0 Alpha",
  "INVALID MESSAGE"
];