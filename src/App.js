import React from "react";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Employee from "./Pages/Employee";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LeaveSummery from "./Pages/LeaveSummery";

import SingleEmp from "./Pages/SingleEmp";
import LoginPage from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Calender from "./Pages/Calender";

function App() {
  return (
    <Div>
      <Router>
        <Switch>
        {/* <Sidebar /> */}
          <Route path="/" exact component={SignIn} />
          <Route path="/home" exact component={Dashboard} />
          <Route path="/employee" exact component={Employee} />
          <Route path="/leave" exact component={Calender} />
          <Route path="/employees/emp/:id"  component={SingleEmp} />
        </Switch>
      </Router>
    </Div>
  );
}

export default App;

const Div = styled.div`
  position: relative;
`;
