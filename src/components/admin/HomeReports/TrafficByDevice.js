import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  colors,
  makeStyles,
  useTheme,
} from "@material-ui/core";
// import LaptopMacIcon from "@material-ui/icons/LaptopMac";
// import PhoneIcon from "@material-ui/icons/Phone";
// import TabletIcon from "@material-ui/icons/Tablet";

const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
}));

const TrafficByDevice = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: ["#46C5BC", "#FF374B", "#FFBF29"],
        borderWidth: 1,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white,
      },
    ],
    labels: ["Desktop", "Tablet", "Mobile"],
  };

  const options = {
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    cutoutPercentage: 60,
    layout: { padding: 0 },
    legend: {
      display: true,
      labels: {
        usePointStyle: true,
        boxWidth: 10,
        fontSize: 15,
        padding: 16,
      },
    },
    datalabels: {
      display: true,
    },
    maintainAspectRatio: false,
    responsive: true,
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

  // const devices = [
  //   {
  //     title: "Desktop",
  //     value: 63,
  //     icon: LaptopMacIcon,
  //     color: colors.indigo[500],
  //   },
  //   {
  //     title: "Tablet",
  //     value: 15,
  //     icon: TabletIcon,
  //     color: colors.red[600],
  //   },
  //   {
  //     title: "Mobile",
  //     value: 23,
  //     icon: PhoneIcon,
  //     color: colors.orange[600],
  //   },
  // ];

  return (
    <Card
      elevation={20}
      style={{ borderRadius: "15px" }}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Traffic by Device" />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        {/* <Box display="flex" justifyContent="center" mt={2}>
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h2">
                {value}%
              </Typography>
            </Box>
          ))}
        </Box> */}
      </CardContent>
    </Card>
  );
};

TrafficByDevice.propTypes = {
  className: PropTypes.string,
};

export default TrafficByDevice;
