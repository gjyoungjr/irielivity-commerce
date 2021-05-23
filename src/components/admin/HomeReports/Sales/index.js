/* eslint-disable */
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  // colors,
} from "@material-ui/core";

// utils
import { formatDate, filterArray } from "./utils";

const useStyles = makeStyles(() => ({
  root: {},
}));

const Sales = ({ className, weeklySales, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const _days = [],
    _dailySales = [];
  let salesCount = {};
  const [days, setDays] = useState([]);
  const [dailySales, setDailySales] = useState([]);

  useEffect(() => {
    // if no data exit
    if (!weeklySales.length) return;

    // map through data
    // extract date
    weeklySales.map((sale) => {
      _days.push(formatDate(sale.createdAt));
      // filter date to get only unique days
      const filteredDays = filterArray(_days);
      // set state with filtered days
      setDays(filteredDays);
    });

    // counts sales per day
    const countSalesPerDay = (days) => {
      // loop thru days
      // increment object with key value for every duplicated day found
      for (let i = 0; i < days.length; i++) {
        if (salesCount[days[i]]) {
          salesCount[days[i]] += 1;
        } else {
          salesCount[days[i]] = 1;
        }
      }
      // extract the day and the sale per day into array with key value pairs
      for (let prop in salesCount) {
        if (salesCount[prop]) {
          // console.log(prop + " counted: " + salesCount[prop] + " times.");
          _dailySales.push({
            x: prop,
            y: salesCount[prop],
          });
        }
      }
    };
    // set state with filtered data
    countSalesPerDay(_days);
    setDailySales(_dailySales);
  }, [weeklySales]);

  const data = {
    datasets: [
      {
        backgroundColor: "#46C5BC",
        data: dailySales,
        label: "This Week",
      },
    ],
    labels: days,
  };

  const options = {
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    cornerRadius: 4,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 62,
          maxBarThickness: 100,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            display: true,
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            stepSize: 1,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
        },
      ],
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card
      elevation={20}
      style={{ borderRadius: "15px" }}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Latest Sales" />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

Sales.propTypes = {
  className: PropTypes.string,
};

export default Sales;
