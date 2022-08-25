import styled from "styled-components";
// import "../components/styles/single.scss";
import Navbar from "../Navbar";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import Carousel from "react-bootstrap/Carousel";
import SEmpTable from "./SingleEmpTable";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";

const SingleEmp = () => {
  const { id } = useParams();
  console.log("id is:", id);
  const [rows, setRows] = useState([]);
  const [userData, setuserData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/user/getUserById/${id}`)

      .then((res) => {
        //console.log("Getting from:", res.data.data[0]);
        setuserData(res.data.data[0]);
        // setuserData(JSON.parse(JSON.stringify(res.data.data)));
      })
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:8000/leave/getAllHrsById/${id}`)

      .then((res) => {
        console.log("Getting from:", res.data.data[0]);
        //setRows(res.data.data[0]);
        setRows(JSON.parse(JSON.stringify(res.data.data)));
      })
      .catch((err) => console.log(err));
  }, []);

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
      <Section>
        <div class="container">
          <div class="svg-background"></div>
          <div class="svg-background2"></div>
          <div class="circle"></div>

          <img
            class="profile-img"
            src="data:image/png;base64,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"
          />
          <div class="text-container">
            <h2>Name</h2>
            {/* <p class="title-text">Austin May</p> */}
            <p class="info-text">
              {userData.firstName} {userData.lastName}
            </p>
            <p class="info-text">{userData.user_type}</p>
            <p class="email-text">{userData.email}</p>
            <p class="info-text">{userData.contactNo}</p>
            <p class="info-text">{userData.city}</p>
          </div>
        </div>

        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{backgroundColor:'#b0cbea'}}>
              <TableRow>
                <TableCell className="tableCell">Record Id</TableCell>
                <TableCell className="tableCell">Emp Name</TableCell>
                <TableCell className="tableCell">Role</TableCell>
                <TableCell className="tableCell">This Week of Month</TableCell>
                <TableCell className="tableCell">Worked Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .filter((q) => q.firstName.toLowerCase().includes(""))
                .map((row) => (
                  <TableRow hover key={row.Id}>
                    <TableCell className="tableCell">
                      <span>{row.Id}</span>
                    </TableCell>
                    <TableCell className="tableCell">
                      <span>
                        {row.firstName} {row.lastName}
                      </span>
                    </TableCell>
                    <TableCell className="tableCell">
                      <span className={`status ${row.user_type}`}>
                        {row.user_type}
                      </span>
                    </TableCell>
                    <TableCell className="tableCell">
                      <span>{row.week}</span>
                    </TableCell>
                    <TableCell className="tableCell">
                      <span>{row.totalhours.slice(0, -3)} / 8 Hrs</span>
                    </TableCell>
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
      </Section>
    </>
  );
};

export default SingleEmp;

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  * {
    font-family: sans-serif;
    padding: 0px;
    margin: 0px;
  }

.tblHead{
   
            backgroundColor: "blue";
}
  body {
    background-color: #212121;
  }

  .container {
    position: absolute;
    top: 100%;
    background-color: #eceff1;
    width: 78vw;
    height: 250px;
    border-radius: 10px;
    overflow: hidden;
  }

  .svg-background {
    width: 70%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #1e88e5;
    -webkit-clip-path: polygon(0 0, 14% 0, 48% 100%, 0% 100%);
    clip-path: polygon(0 0, 35% 0, 30% 100%, 0% 100%);
  }

  .svg-background2 {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 20px;
    background-color: rgba(0, 0, 0, 0.12);
    clip-path: polygon(0 0, 21% 0, 17% 100%, 0% 100%);
  }

  .profile-img {
    position: absolute;
    width: 150px;
    height: 150px;
    margin-top: 55px;
    margin-left: 40px;
    border-radius: 50%;
  }

  .circle {
    position: absolute;
    width: 162px;
    height: 161px;
    left: 0;
    top: 0;
    background-color: #eceff1;
    border-radius: 50%;
    margin-top: 50.5px;
    margin-left: 35px;
  }

  .text-container {
    position: absolute;
    right: 0;
    margin-right: 55%;
    margin-top: 45px;
    max-width: 230px;
    text-align: left;
  }

  .title-text {
    color: #263238;
    font-size: 28px;
    font-weight: 600;
    margin-top: 5px;
  }

  .info-text {
    text-transform: capitalize;
    margin-top: 10px;
    font-siize: 18px;
  }

  .email-text {
    font-size: 18px;
    margin-top: 10px;
  }

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .container {
      width: 94%;
    }
  }
`;
