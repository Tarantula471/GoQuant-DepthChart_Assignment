export type chartDataResponse = {
  lastUpdateId: number;
  bids: [string, string][];
  asks: [string, string][];
};

export type chartData = {
  lastUpdateId: number;
  bids: [number, number][];
  asks: [number, number][];
};

export type orderBookData = {
  x: number;
  y: number;
  price: number;
};

export type orderBook = {
  bids: orderBookData[];
  asks: orderBookData[];
};
