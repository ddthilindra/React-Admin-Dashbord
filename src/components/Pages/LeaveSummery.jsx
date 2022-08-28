import React, { Component } from "react";
import Paper from "@mui/material/Paper";
import axios from "axios";
import date from "date-and-time";
import Checkbox from '@mui/material/Checkbox';
import {
  ViewState,
  EditingState,
  IntegratedEditing,GroupingState,IntegratedGrouping
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Resources,
  Toolbar,
  DateNavigator,
  Appointments,
  DragDropProvider,
  GroupingPanel,
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
import { green, lightBlue } from "@material-ui/core/colors";
import FormControlLabel from '@mui/material/FormControlLabel';
//import { appointments } from "./appointments";
// ##################################################################

const messages = {
  moreInformationLabel: "",
};

// const Select = (props) => {
//   const availableOptions = (nextValue) => {
//     availableOptions({ pData });
//   };
// };

const Label = (props) => {
  // if (props.text === "Details") {
  //   return null;
  // }
  return <AppointmentForm.Label {...props} />;
};

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === "multilineTextEditor") {
    return null;
  }
  // if (props.placeholder === "Title") {
  //   return null;
  // }
  return <AppointmentForm.TextEditor {...props} />;
};

const BooleanEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  // if (props.label === "All Day" || props.label === "Repeat") {
  //   return null;
  // }
  // if (props.label === "All Day") {
  //   // allDay.label="LEave"
  // }
  if (props.label === "Repeat") {
    return null;
  }

  return <AppointmentForm.BooleanEditor {...props} />;
};

const Appointment = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,

      backgroundColor: "#056DFF",
      borderRadius: "8px",
    }}
  >
    {children}
  </Appointments.Appointment>
);

let newTitle = "";
const pData = [
  { value: 'Start',text: 'Start'},
  { value: 'Leave',text: 'Leave'},
  { value: 'Stop',text: 'Stop'},
];
const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  // const onNameFieldChange = (nextValue) => {
  //   newTitle = nextValue;
  //   onFieldChange({ customField: nextValue });
  // };
  // const onPhoneFieldChange = (nextValue) => {
  //   onFieldChange({ phoneField: nextValue });
  // };
  // const onCutChange = (nextValue) => {
  //   onFieldChange({ hairCut: nextValue });
  // };

  // const onDyeChange = (nextValue) => {
  //   onFieldChange({ hairDye: nextValue });
  // };

  // const onEpilationChange = (nextValue) => {
  //   onFieldChange({ epilation: nextValue });
  // };

  // const onWaxChange = (nextValue) => {
  //   onFieldChange({ wax: nextValue });
  // };

  // const onManiPediChange = (nextValue) => {
  //   onFieldChange({ maniPedi: nextValue });
  // };

  // const onBeautyChange = (nextValue) => {
  //   onFieldChange({ beauty: nextValue });
  // };

  // const setGender = (event) => {
  //   console.log(event.target.value);
  // };
  const onValueChange = (nextValue) => {
    onFieldChange({ work: nextValue });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >

      <AppointmentForm.Label text="Dropdown" type="title" />
      <AppointmentForm.Select
        value={appointmentData.work}
         availableOptions={pData}
        type="filledSelect"
        onValueChange={onValueChange}
        // placeholder="Customer Phone" type: 'outlinedSelect' | 'filledSelect';
      />

      {/* <AppointmentForm.Label text="Gender" type="title" /> */}

      {/* <div onChange={setGender.bind(this)} style={{ fontSize: "17" }}>
        <input
          type="radio"
          className="circle1"
          value="MALE"
          name="gender"
          id="blue"
        />
        Male
        <input
          type="radio"
          className="circle2"
          value="FEMALE"
          name="gender"
          id="pink"
        />
        Female
      </div>
      <AppointmentForm.Label text="Operations" type="title" />
      <AppointmentForm.BooleanEditor
        label="Hair Cut"
        value={appointmentData.hairCut}
        onValueChange={onCutChange}
      />
      <AppointmentForm.BooleanEditor
        label="Hair Dye"
        value={appointmentData.hairDye}
        onValueChange={onDyeChange}
      />
      <AppointmentForm.BooleanEditor
        label="Epilation"
        value={appointmentData.epilation}
        onValueChange={onEpilationChange}
      />
      <AppointmentForm.BooleanEditor
        label="Wax"
        value={appointmentData.wax}
        onValueChange={onWaxChange}
      />
      <AppointmentForm.BooleanEditor
        label="Mani/Pedi"
        value={appointmentData.maniPedi}
        onValueChange={onManiPediChange}
      />
      <AppointmentForm.BooleanEditor
        label="Beauty"
        value={appointmentData.beauty}
        onValueChange={onBeautyChange}
      /> */}

      {/* <AppointmentForm.Label text="Customer Name" type="title" />
      <AppointmentForm.TextEditor
        value={appointmentData.customField}
        onValueChange={onNameFieldChange}
        placeholder="Customer name"
      /> */}
      {/* <AppointmentForm.Label text="Customer Phone" type="title" />
      <AppointmentForm.TextEditor
        value={appointmentData.phoneField}
        onValueChange={onPhoneFieldChange}
        type="numberEditor"
        placeholder="Customer Phone"
      /> */}
      
    </AppointmentForm.BasicLayout>
  );
};

// ###################################################################

// ############################ GROUPING ##########################

export default class LeaveSummery extends Component {
  Layout = ({ appointmentMeta, visible, onHide, ...restProps }) => {
    return (
      <>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>

        {/* <select>
          <option>asdasd</option>
          <option>asdasd</option>
          <option>asdasd</option>
        </select>
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
        <Button onClick={this.commitChanges}>asdas</Button>
        
        <AppointmentForm.commandButtonComponent></AppointmentForm.commandButtonComponent> */}
      </>
    );
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currentDate: new Date(),
      //"2018-06-27"
      check: 0,
    }
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
      // window.alert("Asdasd"+state[0])
      if (added) {
        console.log(added);
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
        console.log(changed);
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
        console.log(deleted);
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
    const { data, currentDate, resources, grouping, groupByDate, isGroupByDate, } = this.state;
    
    return (
      <Section>
        <Navbar text={"Calender"} />
        {/* <GroupOrderSwitcher isGroupByDate={isGroupByDate} onChange={this.onGroupOrderChange} /> */}
        <Paper>
          <Scheduler
            data={data}
            height={930}
            onAppointmentFormOpening={this.onAppointmentFormOpening}
          >
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
            <AppointmentForm
              basicLayoutComponent={BasicLayout}
              textEditorComponent={TextEditor}
              booleanEditorComponent={BooleanEditor}
              labelComponent={Label}
              messages={messages}
            />
            {/* <AppointmentForm /> */}
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
