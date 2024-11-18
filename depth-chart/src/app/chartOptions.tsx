import Highcharts from "highcharts";
import { chartData, orderBook } from "./types/chartData.type";

export const getOrderBookOptions = (
  orderbookData: orderBook
): Highcharts.Options => ({
  chart: {
    animation: {
      duration: 200,
    },
    type: "bar",
    backgroundColor: "#23232f",
    marginTop: 70,
  },

  accessibility: {
    point: {
      descriptionFormat: "Price: {price:.1f}USD, " + "{series.name}: {y}",
    },
  },

  title: {
    text: "Order book live chart",
    style: {
      color: "#ffffff",
    },
  },

  tooltip: {
    headerFormat: "Price: <b>${point.point.price:,.1f}</b></br>",
    pointFormat: "{series.name}: <b>{point.y:,.0f}</b>",
    shape: "rect",
  },

  xAxis: [
    {
      reversed: true,
      visible: false,
      title: {
        text: "Market depth / price",
      },
      accessibility: {
        description: "Bid orders",
      },
    },
    {
      opposite: true,
      visible: false,
      title: {
        text: "Market depth / price",
      },
      accessibility: {
        description: "Ask orders",
      },
    },
  ],

  yAxis: [
    {
      id: "first-y-axis",
      offset: 0,
      visible: true,
      opposite: true,

      gridLineWidth: 0,
      tickAmount: 1,
      left: "50%",
      width: "50%",
      title: {
        text: "Amount of ask orders",
        style: {
          visibility: "hidden",
        },
      },
      min: 0,
      labels: {
        enabled: true,
        format: "{#if isLast}Asks{/if}",
        style: {
          color: "#ffffff",
          fontSize: "16",
          fontWeight: "700",
        },
        y: 10,
      },
    },
    {
      id: "second-y-axis",
      offset: 0,
      visible: true,
      opposite: true,
      gridLineWidth: 0,
      tickAmount: 2,
      left: "0%",
      width: "50%",
      reversed: true,
      title: {
        text: "Amount of bid orders",
        style: {
          visibility: "hidden",
        },
      },
      min: 0,
      labels: {
        enabled: true,
        format: `
                {#if (eq pos 0)}Price ($){/if}
                {#if isLast}Bids{/if}
            `,
        style: {
          color: "#ffffff",
          fontSize: "16",
          fontWeight: "700",
        },
        y: 10,
      },
    },
  ],

  legend: {
    enabled: false,
  },

  navigation: {
    buttonOptions: {
      theme: {
        fill: "none",
      },
    },
  },

  plotOptions: {
    bar: {
      borderWidth: 0,
    },
    series: {
      animation: false,
      dataLabels: {
        enabled: true,
        color: "#ffffff",
      },
      borderWidth: 0,
      crisp: false,
    },
  },

  series: [
    {
      dataLabels: [
        {
          align: "right",
          alignTo: "plotEdges",
          style: {
            fontSize: "14",
            textOutline: "0",
          },
          format: "{point.y:,.0f}",
        },
        {
          align: "left",
          inside: true,
          style: {
            fontSize: "13",
            textOutline: "0",
          },
          format: "{point.price:,.1f}",
        },
      ],
      name: "Asks",
      color: "#ce4548",
      data: orderbookData?.asks,
      type: "bar",
      yAxis: "first-y-axis",
    },
    {
      dataLabels: [
        {
          align: "left",
          alignTo: "plotEdges",
          style: {
            fontSize: "14",
            textOutline: "0",
          },
          format: "{point.y:,.0f}",
        },
        {
          align: "right",
          inside: true,
          style: {
            fontSize: "13",
            textOutline: "0",
          },
          format: "{point.price:,.1f}",
        },
      ],
      name: "Bids",
      color: "#107db7",
      data: orderbookData?.bids,
      yAxis: "second-y-axis",
      type: "bar",
    },
  ],
  credits: {
    enabled: false,
  },
});

export const getDepthChartOptions = (
  chartData: chartData
): Highcharts.Options => ({
  chart: {
    type: "area",
    zooming: {
      type: "xy",
      mouseWheel: true,
      singleTouch: true,
    },
    backgroundColor: "#1c1b2b",
    height: 500,
    //   width: 500,
    //   className: `${styles.depthChart}`,
  },
  title: {
    text: "Market Depth",
    style: {
      color: "#fff",
    },
  },
  xAxis: {
    minPadding: 0,
    maxPadding: 0,
    plotLines: [
      {
        color: "#2f2952",
        value: 5.5,
        width: 2,
        label: {
          text: "Actual price",
          rotation: 90,
          style: {
            color: "#4F6C89",
          },
        },
      },
    ],
    lineWidth: 0.1,
    tickColor: "#1c1b2b",
    crosshair: {
      color: "#696777",
      dashStyle: "Dash",
    },
    title: {
      text: "Price",
      style: {
        color: "#4F6C89",
      },
    },
  },
  yAxis: [
    {
      gridLineWidth: 1,
      title: { text: "Bids" },
      tickWidth: 1,
      tickLength: 5,
      tickPosition: "inside",
      labels: {
        align: "left",
        x: 8,
      },
      crosshair: {
        dashStyle: "Dash",
        color: "#696777",
      },
      gridLineColor: "#201d3a",
      lineWidth: 0,
      tickColor: "#2f2952",
    },
    {
      opposite: true,
      linkedTo: 0,
      gridLineWidth: 0,
      title: {
        text: "Asks",
      },
      tickWidth: 1,
      tickLength: 5,
      tickPosition: "inside",
      labels: {
        align: "right",
        x: -8,
      },
      crosshair: {
        dashStyle: "Dash",
        color: "#696777",
      },
      gridLineColor: "#201d3a",
      lineWidth: 0,
      tickColor: "#2f2952",
    },
  ],
  legend: {
    enabled: false,
  },
  plotOptions: {
    area: {
      fillOpacity: 0.2,
      lineWidth: 1,
      step: "center",
    },
    series: {
      marker: {
        enabled: false,
      },
    },
  },
  tooltip: {
    headerFormat:
      '<span style="font-size=10px;">Price: {point.key}</span><br/>',
    valueDecimals: 2,
  },
  series: [
    {
      name: "Bids",
      data: chartData?.bids,
      color: "#4EA64A",
      type: "area",
    },
    {
      name: "Asks",
      data: chartData?.asks,
      color: "#FB1809",
      type: "area",
    },
  ],
  credits: {
    enabled: false,
  },
});

export const getSpreadIndicatorOptions = (
  spreadData: number[]
): Highcharts.Options => ({
  chart: {
    animation: {
      duration: 500,
    },
    type: "line",
    height: 500,
    zooming: {
      type: "xy",
      mouseWheel: true,
      singleTouch: true,
    },
    backgroundColor: "#1c1b2b",
  },
  title: {
    text: "Spread Data",
    style: {
      color: "#fff",
    },
  },
  xAxis: {
    minPadding: 0,
    maxPadding: 0,
    lineWidth: 0.1,
    tickColor: "#1c1b2b",
    title: {
      text: "Spread",
      style: {
        color: "#4F6C89",
      },
    },
  },
  yAxis: {
    gridLineWidth: 1,
    title: { text: "Spread" },
    tickWidth: 1,
    tickLength: 5,
    crosshair: {
      dashStyle: "Dash",
      color: "#696777",
    },
    gridLineColor: "#201d3a",
    lineWidth: 0,
    tickColor: "#2f2952",
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      name: "Spread",
      data: spreadData,
      color: "#4EA64A",
      type: "line",
    },
  ],
  credits: {
    enabled: false,
  },
});
