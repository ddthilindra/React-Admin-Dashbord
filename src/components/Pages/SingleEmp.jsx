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
import image from "../../assets/empProfile.png";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
        <Navbar text={"Emp"} />

        <Card
          sx={{
            display: "flex",
            maxWidth: 10000,
            padding: "14px",
            marginBottom: "24px",
            marginTop: "24px",
          }}
        >
          <CardMedia
            sx={{
              height: 160,
              width: 160,
              borderRadius: "16px",
              padding: "1%",
              marginRight:"5%"
            }}
            component="img"
            image={image}
            alt="green iguana"
          />

          <CardContent >
            <Typography gutterBottom variant="h5" component="div">
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              Role : {userData.user_type}
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              Email : {userData.email}
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              Phone Number : {userData.contactNo}
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              City : {userData.city}
            </Typography>
            {/* <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography> */}
          </CardContent>
          <CardActions>
            {/* <Button size="small">Share</Button> */}
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>

        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead style={{ backgroundColor: "#b0cbea" }}>
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
                      <span>{row.totalhours.slice(0, -3)} / 56 Hrs</span>
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

  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .container {
      width: 94%;
    }
  }
`;
