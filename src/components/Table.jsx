import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";

const Admintoken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjMsImFkbWluX25hbWUiOiJEaWxzaGFuIiwiZW1haWxfYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIwNzc4OTg5NTk4Iiwic3RhdHVzIjoiQURNSU4ifSwiaWF0IjoxNjU0OTI5NDc2NjY2LCJleHAiOjE2NTQ5MzA2ODYyNjZ9.BuXsouVvXMBhiy0paDBlrmxcnlwC3ypBJoOCQYH9UNc`;

const Employee = (props) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: Admintoken },
    };
    axios
      .get(
        "http://ec2-54-241-126-210.us-west-1.compute.amazonaws.com:8080/admin/getAllAdmin",
        config
      )
      .then((res) => {
        console.log("Getting from:", res.data.data);
        if (
          res.data.code === 200 &&
          res.data.success === true &&
          res.data.data.length > 0
        ) {
          setRows(JSON.parse(JSON.stringify(res.data.data)));
        } else {
          console.log("bad request...");
        }
        // setRows(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const history = useHistory();

  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Admin Id</TableCell>
                <TableCell className="tableCell">Admin name</TableCell>
                <TableCell className="tableCell">Email</TableCell>
                <TableCell className="tableCell">Contact No</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.status === "" &&
                rows
                  .filter((q) => q.admin_name.toLowerCase().includes(""))
                  .map((row) => (
                    <TableRow
                      hover
                      key={row.id}
                      onClick={() => {
                        history.push(`/admin/` + row.id);
                      }}
                    >
                      <TableCell className="tableCell">
                        <span>{row.id}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        <a className="table-profile-link">
                          <div className="cellWrapper">
                            {/* <img src={row.image} alt="" className="image" /> */}
                            <span>{row.admin_name}</span>
                          </div>
                        </a>
                      </TableCell>
                      <TableCell className="tableCell">
                        <span>{row.email_address}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        <span>{row.mobile_number}</span>
                      </TableCell>
                      {/* <TableCell className="tableCell">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => openInPopup(row)}
                    >
                      Delete
                    </Button>
                  </TableCell> */}
                    </TableRow>
                  ))}
              {props.status === "All" &&
                rows
                  .filter((q) => q.admin_name.toLowerCase().includes(""))
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="tableCell">
                        <span>{row.id}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        <a className="table-profile-link">
                          <div className="cellWrapper">
                            {/* <img src={row.image} alt="" className="image" /> */}
                            <span>{row.admin_name}</span>
                          </div>
                        </a>
                      </TableCell>
                      <TableCell className="tableCell">
                        <span>{row.email_address}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        <span>{row.mobile_number}</span>
                      </TableCell>

                      <TableCell className="tableCell"></TableCell>
                    </TableRow>
                  ))}
              {rows
                .filter(
                  (n) =>
                    n.status === props.status &&
                    n.admin_name.toLowerCase().includes("")
                )
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="tableCell">
                      <span>{row.id}</span>
                    </TableCell>
                    <TableCell className="tableCell">
                      <a className="table-profile-link">
                        <div className="cellWrapper">
                          {/* <img src={row.image} alt="" className="image" /> */}
                          <span>{row.admin_name}</span>
                        </div>
                      </a>
                    </TableCell>
                    <TableCell className="tableCell">
                      <span>{row.email_address}</span>
                    </TableCell>
                    <TableCell className="tableCell">
                      <span>{row.mobile_number}</span>
                    </TableCell>

                    <TableCell className="tableCell"></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
    </>
  );
};

export default Employee;


