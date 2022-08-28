import React from "react";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Employee from "./components/Pages/Employee";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LeaveSummery from "./components/Pages/LeaveSummery";
import Example from "./components/Pages/example";
import SingleEmp from "./components/Pages/SingleEmp";

function App() {
  return (
    <Div>
      <Router>
      <Sidebar/>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/employee" component={Employee} />          
          <Route path="/emp/:id"  exact component={SingleEmp} />
          <Route path="/leave" component={LeaveSummery} />
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
