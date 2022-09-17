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

function App() {
  return (
    <Div>
      <Router>
        <Switch>
        {/* <Sidebar /> */}
          <Route path="/" exact component={SignIn} />
          <Route path="/home" exact component={Dashboard} />
          {/* <Route path="/login" exact component={SignUp} /> */}
          <Route path="/leave" component={LeaveSummery} />
          <Route path="/employee" component={Employee} />
          <Route path="/employees/emp/:id" exact component={SingleEmp} />
          {/* <Route path="/em" component={SingleEmp} /> */}
        </Switch>
      </Router>
    </Div>
  );
}

export default App;

const Div = styled.div`
  position: relative;
`;
