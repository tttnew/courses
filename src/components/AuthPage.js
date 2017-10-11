import React from "react";
import { Tab, Tabs } from "material-ui/Tabs";
import Login from "../forms/Login";
import Registration from "../forms/Registration";
import "../css/AuthPage.css";

const AuthPage = ({ tabValue }) => (
  <div className="AuthPage">
    <Tabs value={tabValue}>
      <Tab label="Login" value={0}>
        <Login />
      </Tab>
      <Tab label="Registration" value={1}>
        <Registration />
      </Tab>
    </Tabs>
  </div>
);

export default AuthPage;
