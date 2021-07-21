import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

// components
import {
  ProcessingChip,
  InTransitChip,
  CompletedChip,
  CancelledChip,
} from "../chips";
import ViewOrderedProducts from "../admin/Orders/ViewOrderedProducts";

// utils
import {
  getUserOrderHistory,
  updateOrderStatus,
} from "../../redux/reducers/orders/ordersActions";

// grabs state from redux
const mapState = ({ user, ordersData }) => ({
  _currentUser: user.currentUser.userAuth,
  orderHistory: ordersData.orderHistory.data,
});

export default function UserOrderHistory({ usersOrders }) {
  const dispatch = useDispatch();
  // destructure state
  const { _currentUser } = useSelector(mapState);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [displayOrderedProducts, setDisplayOrderedProducts] = useState(false);
  const [refundDeadline, setRefundDeadline] = useState(null);
  const [orderRef, setOrderRef] = useState("");

  // display view of order pop up dialog
  const handleDisplayOrderedProducts = () => {
    setDisplayOrderedProducts(true);
  };

  // handles cancelling of an order
  const handleCancelOrder = (e, orderRef) => {
    // setStatusValue(e.target.value);
    // call redux action to post data to db
    // & refresh after its been posted so ui can be shown with updated data
    dispatch(updateOrderStatus({ orderID: orderRef, status: "Cancelled" }));
    setDisplayOrderedProducts(false);
    dispatch(getUserOrderHistory(_currentUser.uid));
  };
  const options = {
    filterType: "dropdown",
    responsive: "standard",
    elevation: 7,
    enableNestedDataAccess: ".",
    selectableRows: "none",
    onRowClick: (rowData) => {
      // gets products & order ref # from row data
      // assign to state
      // user can view what products were ordered
      const products = rowData[5];
      const _orderRef = rowData[0];
      setOrderRef(_orderRef);
      const deadLine = moment(rowData[2].props.children).add(2, "h").toDate();
      setRefundDeadline(deadLine);
      setOrderedProducts(products);
      handleDisplayOrderedProducts();
    },
  };

  return (
    <div className="orders-wrapper">
      {/* Pop Up Dialog with Products Orders  */}
      <ViewOrderedProducts
        open={displayOrderedProducts}
        handleClose={() => setDisplayOrderedProducts(false)}
        products={orderedProducts}
        orderRef={orderRef}
        refundDeadline={refundDeadline}
        handleCancelOrder={handleCancelOrder}
      />
      {/* Data Table */}
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          style={{ boxShadow: "none" }}
          title="Order History"
          data={usersOrders}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

// format fxn for date
const formatDate = (value) => {
  const timeStampDate = value;
  const dateInMillis = timeStampDate.seconds * 1000;
  value =
    new Date(dateInMillis).toDateString() +
    " " +
    new Date(dateInMillis).toLocaleTimeString();

  return value;
};

// currency format fxn
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});
// config objects
const columns = [
  {
    name: "documentID",
    label: "Order Ref",
    options: {
      filter: false,
      sort: false,
      //   display: "excluded",
    },
  },
  {
    name: "user.avatarUrl",
    label: "Avatar img",
    options: {
      filter: false,
      sort: false,
      display: "excluded",
    },
  },
  {
    name: "createdAt",
    label: "Date",
    options: {
      sort: true,
      filter: false,
      customBodyRender: (value) => <p>{formatDate(value)}</p>,
    },
  },
  {
    name: "orderTotal",
    label: "Order Total",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => <p>{formatter.format(value)}</p>,
    },
  },

  {
    name: "status",
    label: "Status",
    options: {
      filter: true,
      sort: false,
      customBodyRender: (value) => {
        return value === "Processing" ? (
          <ProcessingChip label={value} />
        ) : value === "In-Transit" ? (
          <InTransitChip label={value} />
        ) : value === "Cancelled" ? (
          <CancelledChip label={value} />
        ) : (
          <CompletedChip label={value} />
        );
      },
    },
  },

  {
    name: "orderItems",
    label: "orderItems",
    options: {
      filter: false,
      sort: false,
      display: "excluded",
    },
  },
];
// style object for data table
const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      rounded: {
        boxShadow: "none",
        backgroundColor: "#fdfbf4",
      },
    },
    MUIDataTableBodyCell: {
      root: {
        backgroundColor: "#fdfbf4",
        zIndex: 1,
      },
    },
    MUIDataTableHeadCell: {
      root: {
        backgroundColor: "#fdfbf4",
        position: 'relative'
      },
    },
  },
  palette: {
    primary: {
      main: "#1752FF",
    },
    secondary: {
      main: "#1752FF",
    },
  },
});
