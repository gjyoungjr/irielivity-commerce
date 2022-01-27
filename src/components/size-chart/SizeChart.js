import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 550,
  },
});

const rowData = [
  {
    value: 1,
    label: "Chest(inches)",
    s_size: "34-36",
    m_size: "38-40",
    l_size: "42-44",
    xl_size: "46-48",
    xxl_size: "50-52",
    xxxl_size: "54-56",
    xxxxl_size: "58-60",
  },
  {
    value: 2,
    label: "Waist(inches)",
    s_size: "28-30",
    m_size: "32-34",
    l_size: "36-38",
    xl_size: "40-42",
    xxl_size: "44-46",
    xxxl_size: "48-50",
    xxxxl_size: "52-54",
  },
  {
    value: 3,
    label: "Neck(inches)",
    s_size: "14-14.5",
    m_size: "15-15.5",
    l_size: "16-16.5",
    xl_size: "17-17.5",
    xxl_size: "18-18.5",
    xxxl_size: "19-19.5",
    xxxxl_size: "20-20.5",
  },
  {
    value: 4,
    label: "Sleeve(inches)",
    s_size: "32.5-33",
    m_size: "33.5-34",
    l_size: "34.5-35",
    xl_size: "35.5-36",
    xxl_size: "36.5-37",
    xxxl_size: "37.5-38",
    xxxxl_size: "38.5-39",
  },
];
export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="font-weight-bold">Size</TableCell>
            <TableCell align="center">S</TableCell>
            <TableCell align="center" style={styles.tableBgColor}>
              M
            </TableCell>
            <TableCell align="center">L</TableCell>
            <TableCell align="center" style={styles.tableBgColor}>
              XL
            </TableCell>

            <TableCell align="center">2XL</TableCell>
            <TableCell align="center" style={styles.tableBgColor}>
              3XL
            </TableCell>
            <TableCell align="center">4XL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <TableRow key={row.value}>
              <TableCell
                component="th"
                scope="row"
                className="font-weight-bold"
              >
                {row.label}
              </TableCell>

              <TableCell align="center">{row.s_size}</TableCell>
              <TableCell align="center" style={styles.tableBgColor}>
                {row.m_size}
              </TableCell>
              <TableCell align="center">{row.l_size}</TableCell>
              <TableCell align="center" style={styles.tableBgColor}>
                {row.xl_size}
              </TableCell>
              <TableCell align="center">{row.xxl_size}</TableCell>
              <TableCell align="center" style={styles.tableBgColor}>
                {row.xxxl_size}
              </TableCell>
              <TableCell align="center">{row.xxxxl_size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const styles = {
  tableBgColor: {
    backgroundColor: "#f5f5f5",
  },
};
