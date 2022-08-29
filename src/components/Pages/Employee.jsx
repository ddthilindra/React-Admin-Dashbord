import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import scrollreveal from "scrollreveal";
import Table from "../EmpWeekSumTable";
import EmpTable from "../EmpTable";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";

import AddEmpPopup from "../Popups/EmpApp";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

// #####################################
const Employee = () => {
  const categories = ["approved", "pending"];
  const [category, setCategory] = useState("");

  useEffect(() => {
    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        .row__one,
        .row__two
    `,
      {
        opacity: 0,
        interval: 100,
      }
    );
  }, []);


  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  return (
    <>
      <Section>
        <Navbar text={"Employee"} />
        <div className="empContainer">
          <Box sx={{ bgcolor: "background.paper" }}>
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Week summery" {...a11yProps(0)} />
                <Tab label="All Employees" {...a11yProps(1)} />
                {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            >
              <TabPanel value={value} index={0} dir={theme.direction}>
              <div
                  style={{ display: "flex", justifyContent: "flex-end", }}
                >
                
                  <FormControl style={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Role"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <MenuItem value={"All"}>All</MenuItem>
                      <MenuItem value={"developer"}>Developer</MenuItem>
                      <MenuItem value={"QA"}>QA</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* <p>{category}</p> */}

                <div className="grid">
                  <div className="listContainer">
                    {/* <div className="listTitle">Latest Transactions</div> */}

                    <Table status={category} />
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <div
                  style={{ display: "flex", justifyContent: "space-between", }}
                >
                  <Button variant="contained" style={{ backgroundColor: "#b0cbea",padding: "0 36px 0 36px",height:"40px"}} onClick={openInPopup}>
                    Add
                  </Button>
                  <AddEmpPopup
                openUpdatePopup={openPopup}
                setUpdateOpenPopup={setOpenPopup}
                adminrecordForEdit={recordForEdit}
              ></AddEmpPopup>
                  <FormControl style={{ minWidth: 120, }}>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Role"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <MenuItem value={"All"}>All</MenuItem>
                      <MenuItem value={"developer"}>Developer</MenuItem>
                      <MenuItem value={"QA"}>QA</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                {/* <p>{category}</p> */}

                <div className="grid">
                  <div className="listContainer">
                    {/* <div className="listTitle">Latest Transactions</div> */}

                    <EmpTable status={category} />
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                Item Three
              </TabPanel>
            </SwipeableViews>
          </Box>
        </div>
      </Section>
    </>
  );
};

export default Employee;

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .MuiTab-fullWidth {
    flex-grow: 0;
  }
  .empContainer {
    border-radius: 5px;
    border: 2px solid #d1e9fc;
    padding: 5px;
    width: 100%;
    height: 550px;
  }
  .MuiTab-wrapper {
    text-transform: capitalize;
  }
  .PrivateTabIndicator-colorSecondary-5 {
    background-color: #d1e9fc;
  }
  .MuiAppBar-colorPrimary {
    background-color: #2065d1;
  }
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`;
