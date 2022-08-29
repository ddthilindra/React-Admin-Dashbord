import React from "react";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Employee from "./components/Pages/Employee";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LeaveSummery from "./components/Pages/LeaveSummery";
import Example from "./components/Pages/example";
import SingleEmp from "./components/Pages/SingleEmp";
import LoginPage from "./components/Pages/SignIn";
import SignUp from "./components/Pages/SignUp";

function App() {
  return (
    <Div>
      <Router>
        <Sidebar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/login" exact component={SignUp} />
          <Route path="/leave" component={LeaveSummery} />
          <Route path="/employee" component={Employee} />
          <Route path="/emp/:id" exact component={SingleEmp} />
          <Route path="/ex" component={Example} />
          <Route path="/em" component={SingleEmp} />
        </Switch>
      </Router>
    </Div>
  );
}

export default App;

const Div = styled.div`
  position: relative;
`;
