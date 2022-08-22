import React from "react";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Employee from "./components/Pages/Employee";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import LeaveSummery from "./components/Pages/LeaveSummery";
import Example from "./components/Pages/example";

function App() {
  return (
    <Div>
      <Router>
      <Sidebar/>
        <Switch>
          <Route path="/asd" exact component={Dashboard} />
          <Route path="/employe" component={Employee} />
          <Route path="/" component={LeaveSummery} />
        </Switch>
      </Router>
    </Div>
  );
}

export default App;

const Div = styled.div`
  position: relative;
`;
