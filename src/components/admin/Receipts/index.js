import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, Avatar } from "@material-ui/core";

// components
import AppToolBar from "./AppToolBar";
import ViewReceipt from "./ViewReceipt";

// format fxn for date
const formatDate = (value) => {
  const timeStampDate = value;
  const dateInMillis = timeStampDate.seconds * 1000;
  value = new Date(dateInMillis).toDateString();

  return value;
};

// currency format fxn
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

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
    label: "Avatar",
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
    name: "orderTotal",
    label: "Order Total",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value) => <p>{formatter.format(value)}</p>,
    },
  },
  {
    name: "paymentReceipt",
    label: "Receipt",
    options: {
      filter: false,
      sort: true,
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

export default function ReceiptList({ filteredOrders }) {
  const [open, setOpen] = React.useState(false);
  const [receiptUrl, setReceiptUrl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const options = {
    filterType: "dropdown",
    responsive: "standard",
    elevation: 7,
    enableNestedDataAccess: ".",
    filter: false,
    // handles receipt pop up
    onRowClick: (rowData) => {
      setReceiptUrl(rowData[5]);
      handleClickOpen();
    },
  };

  return (
    <div style={{ marginTop: "15px", padding: "20px" }}>
      <AppToolBar />
      {/* Pop Up Dialog With Reciept  */}
      <ViewReceipt
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        receipt={receiptUrl}
      />
      {/* Data Table */}
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          title="All Receipts"
          data={filteredOrders}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
}
