import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Navbar";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import scrollreveal from "scrollreveal";
import Table from "../EmpTable";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
  return (
    <>
      <Section>
        <Navbar text={"Employee"}/>
        {/* <section className="k-my-8">
          <form className="k-form k-mb-4">
            <label className="k-label k-mb-3">Filter By Status:</label>
            <DropDownList 
              data={categories}
              onChange={(e) => setCategory(e.value)}
              defaultItem="All"
              style={{ backgroundColor: "#ffc107", scrollbarColor: "black" }}
            />
          </form>
        </section> */}
        <div
          style={{
            
          }}
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
      </Section>
    </>
  );
};

export default Employee;

const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
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
