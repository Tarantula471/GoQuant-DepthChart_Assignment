"use client";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import { useEffect, useRef, useState } from "react";
import {
  chartData,
  chartDataResponse,
  orderBook,
} from "./types/chartData.type";
import { Dropdown } from "react-bootstrap";
import {
  getDepthChartOptions,
  getOrderBookOptions,
  getSpreadIndicatorOptions,
} from "./chartOptions";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

const tradePairs = [
  "btc/usdt",
  "bnb/usdt",
  "eth/usdt",
  "sol/usdt",
  "ada/usdt",
  "doge/usdt",
];

export default function Home() {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const orderBookChartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const [chartData, setChartData] = useState<chartData>();
  const [orderbookData, setOrderBookData] = useState<orderBook>();
  const [spreadData, setSpreadData] = useState<number[]>([]);
  const [pair, setPair] = useState<string>("btcusdt");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4080/depth?pair=${pair.replace("/", "")}`
        );
        const data: chartDataResponse = await response.json();
        const processedData: chartData = {
          lastUpdateId: data.lastUpdateId,
          bids: data.bids.map(([price, quantity]) => [
            parseFloat(price),
            parseFloat(quantity),
          ]),
          asks: data.asks.map(([price, quantity]) => [
            parseFloat(price),
            parseFloat(quantity),
          ]),
        };
        setChartData(processedData);
        const orderBookData: orderBook = {
          bids: processedData.bids.map(([price, quantity], index) => ({
            x: index,
            y: quantity,
            price: price,
          })),
          asks: processedData.asks.map(([price, quantity], index) => ({
            x: index,
            y: quantity,
            price: price,
          })),
        };
        setOrderBookData(orderBookData);
        const spread = processedData.asks.map((ask, index) => {
          const bid = processedData.bids[index];
          return ask[0] - bid[0];
        });

        setSpreadData(spread);
      } catch (error) {
        console.error("Error fetching depth data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [pair]);

  const orderBookOptions = getOrderBookOptions(
    orderbookData || { bids: [], asks: [] }
  );
  const depthChartOptions = getDepthChartOptions(
    chartData || { lastUpdateId: 0, bids: [], asks: [] }
  );
  const spreadIndicatorOptions = getSpreadIndicatorOptions(spreadData);

  return (
    <>
      <Dropdown className={styles.dropdown}>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Trade Pairs
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {tradePairs.map((pair) => (
            <Dropdown.Item key={pair} onClick={() => setPair(pair)}>
              {pair}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <div className={styles.page}>
        <HighchartsReact
          highcharts={Highcharts}
          options={orderBookOptions}
          ref={orderBookChartComponentRef}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={spreadIndicatorOptions}
        />
        <HighchartsReact
          highcharts={Highcharts}
          options={depthChartOptions}
          ref={chartComponentRef}
        />
      </div>
    </>
  );
}
