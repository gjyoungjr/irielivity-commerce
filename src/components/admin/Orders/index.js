import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";

// utils
import {
  updateOrderStatus,
  getAllOrders,
  deleteOrder,
} from "../../../redux/reducers/orders/ordersActions";

// component
import AppToolBar from "./AppToolBar";
import ViewOrderedProducts from "./ViewOrderedProducts";
import {
  ProcessingChip,
  InTransitChip,
  CompletedChip,
  CancelledChip,
} from "../../chips";

// format fxn for date
const formatDate = (value) => {
  const timeStampDate = value;
  const dateInMillis = timeStampDate.seconds * 1000;
  value = new Date(dateInMillis).toDateString();

  return value;
};

// config objects
const columns = [
  {
    name: "documentID",
    label: "Order Ref",
    options: {
      filter: false,
      sort: false,
      display: "excluded",
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
    name: "user.fullName",
    label: "Customer",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        const initials = value.charAt(0);
        const avatarUrl = tableMeta.rowData[1];
        return (
          <div className="d-flex justify-content-start">
            {avatarUrl ? (
              <Avatar src={avatarUrl} />
            ) : (
              <Avatar>{initials}</Avatar>
            )}
            <span style={{ marginTop: "10px", marginLeft: "10px" }}>
              {value}
            </span>
          </div>
        );
      },
    },
  },
  {
    name: "email",
    label: "Email",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "address",
    label: "Address",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: "country",
    label: "Country",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "town_city",
    label: "City/Town",
    options: {
      filter: true,
      sort: false,
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
    name: "deliveryMethod",
    label: "Delivery",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "paymentMethod",
    label: "Payment",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "orderItems",
    label: "orderItems",
    options: {
      filter: true,
      sort: false,
      display: "excluded",
    },
  },
];

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: "10px",
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

export default function OrdersList({ orders }) {
  const dispatch = useDispatch();
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [displayOrderedProducts, setDisplayOrderedProducts] = useState(false);
  const [user, setUser] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [statusValue, setStatusValue] = useState("");

  // display view of order pop up dialog
  const handleDisplayOrderedProducts = () => {
    setDisplayOrderedProducts(true);
  };

  // handles update of order status
  const handleStatusChange = (e, orderRef) => {
    setStatusValue(e.target.value);
    // call redux action to post data to db
    // & refresh after its been posted so ui can be shown with updated data
    dispatch(updateOrderStatus({ orderID: orderRef, status: e.target.value }));
    setDisplayOrderedProducts(false);
    dispatch(getAllOrders());
  };
  const options = {
    filterType: "dropdown",
    responsive: "standard",
    elevation: 7,
    enableNestedDataAccess: ".",
    selectableRows: "none",
    onRowClick: (rowData, dataIndex) => {
      // gets products && user from row data
      // assign to state
      // so admin can know who ordered what product
      const products = rowData[11];
      const _user = rowData[3];
      const _orderRef = rowData[0];
      setOrderRef(_orderRef);
      setStatusValue(rowData[8]);
      setUser(_user);
      setOrderedProducts(products);
      handleDisplayOrderedProducts();
    },
  };

  return (
    <div style={{ marginTop: "15px", padding: "20px" }}>
      <AppToolBar />
      {/* Pop Up Dialog with Products Orders  */}
      <ViewOrderedProducts
        open={displayOrderedProducts}
        handleClose={() => setDisplayOrderedProducts(false)}
        products={orderedProducts}
        user={user}
        orderRef={orderRef}
        statusValue={statusValue}
        handleStatusChange={handleStatusChange}
        deleteOrder={deleteOrder}
      />
      {/* Data Table */}
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          style={{ borderRadius: "20px" }}
          title="Order List"
          data={orders}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
}
