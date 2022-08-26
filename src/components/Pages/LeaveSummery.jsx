import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import date from "date-and-time";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  ViewSwitcher,
  MonthView,
  DayView,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";
import styled from "styled-components";
import Navbar from "../Navbar";
import { Button, makeStyles } from "@material-ui/core";
//import { appointments } from "./appointments";

const Layout = ({ appointmentMeta, visible, onHide, ...restProps }) => {
  return (
    <>
      <AppointmentForm.Label
        text="Precio Modulo"
        style={{ backgroundColor: "#b0cbea" }}
      />
      <AppointmentForm.TextEditor type="numberEditor" placeholder="Precio" />
      <AppointmentForm.TextEditor
        readOnly
        type="numberEditor"
        placeholder="Precio"
      />
      <AppointmentForm.Select />
      <AppointmentForm.DateEditor
        onValueChange={(e) => console.log(e.target.value)}
      />

      <h1>asdasd</h1>
      <Button>asdas</Button>
    </>
  );
};

export default class LeaveSummery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currentDate: new Date(),
      //"2018-06-27"
      check: 0,
    };

    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };

    this.commitChanges = this.commitChanges.bind(this);

    this.add = (data) => {
      if (this.state.check == 0) {
        this.state.check = 1;
        axios
          .post(`http://localhost:8000/leave/addLeave`, data)
          .then((response) => {
            if (response.status == 200) {
              console.log(`${response.status}`);
            } else {
              window.alert("Somthing went wrong");
              console.log(`${response.status}`);
              console.log(response.data.message);
            }
          })
          .catch((err) => {
            console.log("Sever error");
            console.log(err);
          });
      }
    };
    this.update = (data) => {
      if (this.state.check == 0) {
        this.state.check = 1;
        console.log(data);
        axios
          .put(`http://localhost:8000/leave/updateLeave`, data)
          .then((response) => {
            if (response.status == 200) {
              console.log(`${response.status}`);
            } else {
              window.alert("Somthing went wrong");
              console.log(`${response.status}`);
              console.log(response.data.message);
            }
          })
          .catch((err) => {
            console.log("Sever error");
            console.log(err);
          });
      }
    };
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:8000/leave/getAllLeaves/1")
      .then((res) => {
        if (
          res.data.code == 200 &&
          res.data.success == true &&
          res.data.data.length > 0
        ) {
          console.log(res.data);
          this.setState({ data: res.data.data });
        } else {
          console.log("bad request...");
        }
      })
      .catch((err) => console.log(err));
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      //const date = require("date-and-time");
      let { data } = state;

      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];

        const strTime = date.format(added.startDate, "YYYY-MM-DD HH-mm-ss");
        const endTime = date.format(added.endDate, "YYYY-MM-DD HH-mm-ss");

        if (added.title && added.startDate && added.endDate) {
          const data = {
            userId: "1",
            title: added.title,
            startTime: strTime,
            endTime: endTime,
          };
          this.add(data);
        } else {
          console.log("error");
        }
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
        var changeSize = Object.keys(changed[Object.keys(changed)]).length;

        if (changeSize == 3) {
          console.log("3");
          const strTime = date.format(
            changed[Object.keys(changed)].startDate,
            "YYYY-MM-DD hh-mm-ss"
          );
          const endTime = date.format(
            changed[Object.keys(changed)].endDate,
            "YYYY-MM-DD hh-mm-ss"
          );

          const data2 = {
            id: [Object.keys(changed)],
            title: changed[Object.keys(changed)].title,
            startTime: strTime,
            endTime: endTime,
          };
          this.update(data2);
        } else if (changeSize == 2) {
          console.log("2");
          if (
            changed[Object.keys(changed)].title &&
            changed[Object.keys(changed)].startDate
          ) {
            console.log("t s");
            const strTime = date.format(
              changed[Object.keys(changed)].startDate,
              "YYYY-MM-DD hh-mm-ss"
            );
            console.log("S " + strTime);
            const data2 = {
              id: [Object.keys(changed)],
              title: changed[Object.keys(changed)].title,
              startTime: strTime,
            };
            this.update(data2);
          }
          if (
            changed[Object.keys(changed)].title &&
            changed[Object.keys(changed)].endDate
          ) {
            console.log("t e");
            const endTime = date.format(
              changed[Object.keys(changed)].endDate,
              "YYYY-MM-DD hh-mm-ss"
            );
            const data2 = {
              id: [Object.keys(changed)],
              title: changed[Object.keys(changed)].title,
              endTime: endTime,
            };
            this.update(data2);
          }
          if (
            changed[Object.keys(changed)].startDate &&
            changed[Object.keys(changed)].endDate
          ) {
            console.log("s e");
            const strTime = date.format(
              changed[Object.keys(changed)].startDate,
              "YYYY-MM-DD hh-mm-ss"
            );
            const endTime = date.format(
              changed[Object.keys(changed)].endDate,
              "YYYY-MM-DD hh-mm-ss"
            );
            const data2 = {
              id: [Object.keys(changed)],
              startTime: strTime,
              endTime: endTime,
            };
            this.update(data2);
          }
        } else {
          console.log("1");
          if (changed[Object.keys(changed)].title) {
            console.log("t");

            const data2 = {
              id: [Object.keys(changed)],
              title: changed[Object.keys(changed)].title,
            };
            this.update(data2);
          }
          if (changed[Object.keys(changed)].startDate) {
            console.log("s");
            const strTime = date.format(
              changed[Object.keys(changed)].startDate,
              "YYYY-MM-DD hh-mm-ss"
            );
            const data2 = {
              id: [Object.keys(changed)],
              startTime: strTime,
            };
            this.update(data2);
          }
          if (changed[Object.keys(changed)].endDate) {
            console.log("e");
            const endTime = date.format(
              changed[Object.keys(changed)].endDate,
              "YYYY-MM-DD hh-mm-ss"
            );
            const data2 = {
              id: [Object.keys(changed)],
              endTime: endTime,
            };
            this.update(data2);
          }
        }
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
        //console.log(deleted);

        axios
          .delete(`http://localhost:8000/leave/deleteLeave/${deleted}`)
          .then((response) => {
            if (response.status == 200) {
              console.log(response.data.message);
            } else {
              window.alert("Somthing went wrong");
              console.log(response.data.message);
            }
          })
          .catch((err) => console.log(err));
      }
      return { data };
    });
  }

  render() {
    const { data, currentDate } = this.state;

    return (
      <Section>
        <Navbar text={"Calender"}/>
        <Paper>
          <Scheduler data={data} height={930}>
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
            />
            <EditingState onCommitChanges={this.commitChanges} />
            <IntegratedEditing />

            <WeekView startDayHour={0} endDayHour={24} />
            <WeekView
              name="work-week"
              displayName="Work Week"
              excludedDays={[0, 6]}
              startDayHour={9}
              endDayHour={19}
            />
            <MonthView />
            <DayView startDayHour={9} endDayHour={19} />
            <Toolbar />
            <DateNavigator />
            <ViewSwitcher />
            <TodayButton />
            <ConfirmationDialog />
            <Appointments />
            <AppointmentTooltip showOpenButton showDeleteButton />
            
            {/* <AppointmentForm layoutComponent={Layout} /> */}

            <AppointmentForm  />
          </Scheduler>
        </Paper>
      </Section>
    );
  }
}

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
