/*eslint-disable */
import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles,
  TableContainer,
  Paper,
} from "@material-ui/core";

// icons
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

// components -> chips
import {
  ProcessingChip,
  InTransitChip,
  CompletedChip,
  CancelledChip,
} from "../../chips";

// utils fxn
// format fxn for date
const formatDate = (value) => {
  const timeStampDate = value;
  const dateInMillis = timeStampDate.seconds * 1000;
  value = new Date(dateInMillis).toDateString();

  return value;
};

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 750,
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const LatestOrders = ({ className, latestOrders, ...rest }) => {
  const classes = useStyles();
  const history = useHistory();

  const redirectToOrders = () => {
    history.push("/admin/orders");
  };

  return (
    <Card
      elevation={20}
      style={{ borderRadius: "15px" }}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Latest Orders" />
      <Divider />

      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className="font-weight-bold">Order Ref</TableCell>
              <TableCell className="font-weight-bold">Customer</TableCell>
              <TableCell className="font-weight-bold" sortDirection="desc">
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction="desc">
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell className="font-weight-bold">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latestOrders.length > 0 ? (
              latestOrders.map((order) => (
                <TableRow hover key={order.documentID}>
                  <TableCell>{order.documentID}</TableCell>
                  <TableCell>{order.user.fullName}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>
                    {order.status === "In-Transit" ? (
                      <InTransitChip label={order.status} />
                    ) : order.status === "Processing" ? (
                      <ProcessingChip label={order.status} />
                    ) : order.status === "Cancelled" ? (
                      <CancelledChip label={order.status} />
                    ) : (
                      <CompletedChip label={order.status} />
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <p className="text-center">No orders as yet.</p>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="contained"
          onClick={() => redirectToOrders()}
          style={{
            textTransform: "none",
            backgroundColor: "rgba(23.0, 82.0, 255.0, 0.3)",
            borderRadius: "20px",
          }}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string,
};

export default LatestOrders;
