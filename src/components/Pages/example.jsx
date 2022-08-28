import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { green, lightBlue } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  ViewState, EditingState, GroupingState, IntegratedGrouping, IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
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
} from '@devexpress/dx-react-scheduler-material-ui';
import { data as appointments } from './data2';
import Navbar from '../Navbar';

const PREFIX = 'Demo';
// #FOLD_BLOCK
const classes = {
  formControlLabel: `${PREFIX}-formControlLabel`,
  text: `${PREFIX}-text`,
};
// #FOLD_BLOCK
const StyledFormControlLabel = styled(FormControlLabel)(({
  theme: { spacing, palette, typography },
}) => ({
  [`&.${classes.formControlLabel}`]: {
    padding: spacing(2),
    paddingLeft: spacing(10),
  },
  [`&.${classes.text}`]: {
    ...typography.caption,
    color: palette.text.secondary,
    fontWeight: 'bold',
    fontSize: '1rem',
  },
}));

const isWeekOrMonthView = viewName => viewName === 'Week' || viewName === 'Month';

const priorityData = [
  { text: 'Work', id: 1, color: lightBlue },
  { text: 'Leave', id: 2, color: green },
];
const priorityasd = [
  { text: 'Work', id: 1, color: lightBlue },
  { text: 'Leave', id: 2, color: green },
  { text: 'asdasd', id: 3, color: green },
];

const GroupOrderSwitcher = (({ isGroupByDate, onChange }) => (
  <StyledFormControlLabel
    control={
      <Checkbox checked={isGroupByDate} onChange={onChange} color="primary" />
    }
    label="Group by Date First"
    className={classes.formControlLabel}
    classes={{ label: classes.text }}
  />
));

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      resources: [{
        fieldName: 'priorityId',
        title: 'Priority',
        instances: priorityData,
      }],
      grouping: [{
        resourceName: 'priorityId',
      }],
      groupByDate: isWeekOrMonthView,
      isGroupByDate: true,
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.onGroupOrderChange = () => {
      const { isGroupByDate } = this.state;
      this.setState({
        isGroupByDate: !isGroupByDate,
        groupByDate: isGroupByDate ? undefined : isWeekOrMonthView,
      });
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
          // console.log(res.data);          
          let arr=res.data.data.filter(appointment => appointment.priorityId < 3)
          console.log(arr)
           this.setState({ data: arr });
        } else {
          console.log("bad request...");
        }
      })
      .catch((err) => console.log(err));
  }
  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        console.log(added)
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const {
      data, resources, grouping, groupByDate, isGroupByDate,
    } = this.state;

    return (
      (
        <div>
        
        {/* <Navbar text={"Calender"} /> */}
          <GroupOrderSwitcher isGroupByDate={isGroupByDate} onChange={this.onGroupOrderChange} />
          <Paper>
            <Scheduler
              data={data}
              height={660}
            >
              <ViewState
                defaultCurrentDate="2018-05-30"
              />
              <EditingState
                onCommitChanges={this.commitChanges}
              />
              <IntegratedEditing />
              <GroupingState
                grouping={grouping}
                groupByDate={groupByDate}
              />
              <WeekView
                startDayHour={8.5}
                endDayHour={17}
              />
              <MonthView />
              <Toolbar />
            <DateNavigator />
            <ViewSwitcher />
            <TodayButton />
            <ConfirmationDialog />
              <DayView startDayHour={9} endDayHour={19} />
              <Appointments />
              <Resources
                data={resources}
                mainResourceName="priorityId"
              />
              <IntegratedGrouping />
              <IntegratedEditing />

              <AppointmentTooltip />
              <AppointmentForm />
              
            
            
              <GroupingPanel />
              <DragDropProvider />
            </Scheduler>
          </Paper>
        </div>
      )
    );
  }
}
