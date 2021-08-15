import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider, Avatar } from "@material-ui/core";

// components
import AppToolbar from "./AppToolBar";
// import AdminSwitch from "./AdminSwitch";

// utils
// import { checkIsUserAdmin } from "../../../firebase/utils";

// format fxn for date
const formatDate = (value) => {
  const timeStampDate = value;
  const dateInMillis = timeStampDate.seconds * 1000;
  value = new Date(dateInMillis).toDateString();

  return value;
};

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

const CustomerListView = ({ users }) => {
  // const [userId, setUserId] = React.useState(null);

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    elevation: 7,
    filter: false,
    selectableRows: "none",
    // onRowClick: (rowData) => {
    //   // console.log(rowData);
    //   // gets user id from row data
    //   // assign to state
    //   const _userId = rowData[0];
    //   setUserId(_userId);
    // },
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
      name: "avatarUrl",
      label: "Avatar",
      options: {
        filter: false,
        sort: false,
        display: "excluded",
      },
    },
    {
      name: "createdAt",
      label: "Registration Date",
      options: {
        sort: true,
        filter: false,
        customBodyRender: (value) => <p>{formatDate(value)}</p>,
      },
    },
    {
      name: "fullName",
      label: "Customer",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const initials = tableMeta.rowData[5].charAt(0);
          const fullName = tableMeta.rowData[5] + " " + tableMeta.rowData[6];
          const avatarUrl = tableMeta.rowData[1];
          return (
            <div className="d-flex justify-content-start">
              {avatarUrl ? (
                <Avatar src={avatarUrl} />
              ) : (
                <Avatar>{initials}</Avatar>
              )}
              <span style={{ marginTop: "10px", marginLeft: "10px" }}>
                {fullName}
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
      name: "firstName",
      label: "None",
      options: {
        filter: false,
        sort: false,
        display: "excluded",
      },
    },
    {
      name: "lastName",
      label: "None",
      options: {
        filter: false,
        sort: false,
        display: "excluded",
      },
    },
    // {
    //   name: "isAdmin",
    //   label: "Admin",

    //   options: {
    //     filter: true,
    //     customBodyRender: (value) => {
    //       return <AdminSwitch rowValue={value} userId={userId} />;
    //     },
    //   },
    // },
  ];

  return (
    <div style={{ marginTop: "15px", padding: "20px" }}>
      <AppToolbar />
      <MuiThemeProvider theme={theme}>
        <MUIDataTable
          style={{ borderRadius: "20px" }}
          title="Customers List"
          data={users}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
    </div>
  );
};

export default CustomerListView;
