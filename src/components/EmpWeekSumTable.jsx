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

//const Admintoken = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjMsImFkbWluX25hbWUiOiJEaWxzaGFuIiwiZW1haWxfYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsIm1vYmlsZV9udW1iZXIiOiIwNzc4OTg5NTk4Iiwic3RhdHVzIjoiQURNSU4ifSwiaWF0IjoxNjU0OTI5NDc2NjY2LCJleHAiOjE2NTQ5MzA2ODYyNjZ9.BuXsouVvXMBhiy0paDBlrmxcnlwC3ypBJoOCQYH9UNc`;

const EmployeeWeekSum = (props) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // const config = {
    //   headers: { Authorization: Admintoken },
    // };
    axios
      .get(
        "http://localhost:8000/leave/getAllLeaveHrs",
        
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
            <TableHead style={{backgroundColor:'#b0cbea'}} >
              <TableRow>
                <TableCell className="tableCell">Emp Id</TableCell>
                <TableCell className="tableCell">Emp Name</TableCell>
                <TableCell className="tableCell">Role</TableCell>
                <TableCell className="tableCell">Current Week </TableCell>
                <TableCell className="tableCell">Worked Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.status === "" &&
                rows
                  .filter((q) => q.week.toLowerCase().includes(""))
                  .map((row) => (
                    <TableRow
                      hover
                      key={row.Id}
                      onClick={() => {
                        history.push(`/emp/` + row.Id);
                      }}
                    >
                      <TableCell className="tableCell" >
                        <span>{row.Id}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        <span>{row.firstName} {row.lastName}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                      <span className={`status ${row.user_type}`}>{row.user_type}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        <span>{row.week}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        <span>{row.totalhours.slice(0, -3)} / 56 Hrs</span>
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
                  .filter((q) => q.firstName.toLowerCase().includes(""))
                  .map((row) => (
                    <TableRow
                      hover
                      key={row.Id}
                      onClick={() => {
                        history.push(`/employee/` + row.Id);
                      }}
                    >
                      <TableCell className="tableCell">
                        <span>{row.Id}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        <span>{row.firstName} {row.lastName}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                      <span className={`status ${row.user_type}`}>{row.user_type}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        <span>{row.week}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        <span>{row.totalhours.slice(0, -3)} / 8 Hrs</span>
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
              {rows
                .filter(
                  (n) =>
                    n.user_type === props.status &&
                    n.firstName.toLowerCase().includes("")
                )
                .map((row) => (
                  <TableRow
                      hover
                      key={row.Id}
                      onClick={() => {
                        history.push(`/employee/` + row.Id);
                      }}
                    >
                      <TableCell className="tableCell" >
                        <span>{row.Id}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        <span>{row.firstName} {row.lastName}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                      <span className={`status ${row.user_type}`}>{row.user_type}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        <span>{row.week}</span>
                      </TableCell>
                      <TableCell className="tableCell">
                        <span>{row.totalhours.slice(0, -3)} / 8 Hrs</span>
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

export default EmployeeWeekSum;


