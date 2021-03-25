import React from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

// components
import { CompletedChip, InTransitChip, ProcessingChip } from "../chips";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

// data for table columns
const columns = [
  {
    id: "createdAt",
    label: "Order Date",
  },
  {
    id: "documentID",
    label: "Order ID",
  },
  {
    id: "orderTotal",
    label: "Order Total",
  },
  {
    id: "status",
    label: "Order Status",
  },
];

const orders = [
  {
    id: "12/12/12",
    documentID: 999023,
    status: "Processing",
    orderTotal: 8000,
  },
];

// currency format fxn
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

// // format fxn for date
// const formatDate = (value) => {
//   const timeStampDate = value;
//   const dateInMillis = timeStampDate.seconds * 1000;
//   value = new Date(dateInMillis).toDateString();

//   return value;
// };

const formatText = (columnName, columnValue) => {
  switch (columnName) {
    case "orderTotal":
      return formatter.format(columnValue);
    case "createdAt":
      return columnValue;
    //   return formatDate(columnValue);
    case "status":
      return columnValue === "Processing" ? (
        <ProcessingChip label={columnValue} />
      ) : columnValue === "In-Transit" ? (
        <InTransitChip label={columnValue} />
      ) : (
        <CompletedChip label={columnValue} />
      );
    default:
      return columnValue;
  }
};

export default function OrderHistory({ tabValue }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className="orders-wrapper">
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {columns.map((col, key) => {
                return (
                  <TableCell className="font-weight-bold" key={key}>
                    {col.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(orders) &&
              orders.length > 0 &&
              orders.map((row, pos) => {
                const { documentID } = row;

                return (
                  <TableRow
                    key={pos}
                    onClick={() => history.push(`/order/${documentID}`)}
                  >
                    {columns.map((col, key) => {
                      const columnName = col.id;
                      const columnValue = row[columnName];
                      const formattedText = formatText(columnName, columnValue);
                      return (
                        <TableCell key={key} style={{ cursor: "pointer" }}>
                          {formattedText}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
