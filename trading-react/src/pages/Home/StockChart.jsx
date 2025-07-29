import ApexCharts from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DotIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import store from "../State/Store";
import { getMarketChart } from "../State/CoinList/CoinAction";

const timeseries = [
  {
    keyword: "Digital Currently Daily",
    key: "digital-currently-daily",
    label: "1 Day",
    value: 1,
  },
  {
    keyword: "Digital Currently Weekly",
    key: "digital-currently-weekly",
    label: "1 Week",
    value: 7,
  },
  {
    keyword: "Digital Currently Monthly",
    key: "digital-currently-monthly",
    label: "1 Month",
    value: 30,
  },
  {
    keyword: "Digital Currently Yearly",
    key: "digital-currently-yearly",
    label: "1 Year",
    value: 365,
  },
];

const StockChart = ({coinId}) => {
  const dispatch=useDispatch()
  const {coin}=useSelector(store=>store);

  const [activeLabel, setActiveLabel] = useState(timeseries[0].value);

  const handleLabelClick = (item) => {
    setActiveLabel(item.value);
    console.log(item.value)
  };

  useEffect(()=>{
      console.log("useEffect days(activelabel)--"+activeLabel)
      dispatch(getMarketChart({coinId, days: activeLabel, jwt: localStorage.getItem("jwt") }));
  },[coinId, dispatch, activeLabel])


  const series = [
    {
      name: "Price",
      data: coin.marketChart.data,
    },
  ];

  const options = {
    chart: {
      id: "area-datetime",
      type: "area",
      height: 450,
      toolbar: {
        show: false,
      },
      zoom: {
        autoScaleYaxis: true,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
      background: "transparent",
      foreColor: "#373d3f",
      fontFamily: "inherit",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
      colors: ["#00E396"],
    },
    xaxis: {
      type: "datetime",
      tickAmount: 6,
      labels: {
        style: {
          colors: "#6b7280",
          fontSize: "12px",
          fontWeight: 400,
        },
        datetimeUTC: false,
        format: "dd MMM",
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: true,
        stroke: {
          color: "#6b7280",
          width: 1,
          dashArray: 4,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6b7280",
          fontSize: "12px",
          fontWeight: 400,
        },
        formatter: function (value) {
          return "$" + value.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#00E396",
      strokeWidth: 2,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      hover: {
        size: 6,
        sizeOffset: 3,
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd MMM yyyy HH:mm",
      },
      y: {
        formatter: function (value) {
          return "$" + value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
      },
      style: {
        fontSize: "12px",
        fontFamily: "inherit",
      },
      marker: {
        show: true,
      },
      fixed: {
        enabled: false,
        position: "topRight",
        offsetY: 30,
        offsetX: 60,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#00E396"],
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: "#e5e7eb",
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.1,
      },
      column: {
        colors: ["transparent", "transparent"],
        opacity: 0.1,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 15,
        right: 15,
        bottom: 15,
        left: 15,
      },
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 300,
          },
          xaxis: {
            tickAmount: 4,
          },
        },
      },
    ],
  };

  return (
    <>
      <div className="w-full h-[520px]" id="chaert-timeline">
        <div className="flex gap-2 mb-4">
          {timeseries.map((item, index) => (
            <Button
              key={item.key}
              variant={activeLabel === item.value ? "default" : "outline"}
              size="sm"
              className="text-xs"
              onClick={() => handleLabelClick(item)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={450}
        ></ReactApexChart>
       
      </div>
    </>
  );
};

export default StockChart;
