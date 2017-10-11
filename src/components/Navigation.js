import React from "react";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import IconMenu from "material-ui/IconMenu";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { withRouter } from "react-router";
import { white } from "material-ui/styles/colors";
import * as sortTypes from "../api/sortTypes";
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';

const Login = props => (
  <FlatButton
    style={{ color: "white" }}
    label="Login"
    containerElement={<Link to="/login" />}
  />
);
const Logout = props => (
  <FlatButton
    style={{ color: "white" }}
    onClick={() => props.handlerLogOut()}
    label="Logout"
  />
);

const styles = {
  title: {
    cursor: "pointer"
  }
};

const Navigation = withRouter(({ session, handlerLogOut, history }) => {
  return (
    <div>
      <AppBar
        title={<span style={styles.title}>Курсы</span>}
        onTitleTouchTap={() => {
          history.push("/");
        }}
        iconElementLeft={
          <IconMenu
            iconButtonElement={
              <IconButton>
                <MoreVertIcon color={white} />
              </IconButton>
            }
          >
            <MenuItem
              primaryText="Сортировать"
              rightIcon={<ArrowDropRight />}
              menuItems={[
                <MenuItem
                  primaryText="по цене"
                  onClick={() => {
                    history.push(`/sort/${sortTypes.COST}`);
                  }}
                />,
                <MenuItem
                  primaryText="по времени"
                  onClick={() => {
                    history.push(`/sort/${sortTypes.TIME}`);
                  }}
                />
              ]}
            />

            <MenuItem
              primaryText="Добавить курсы"
              onClick={() => {
                history.push("/add");
              }}
            />
            <MenuItem
              primaryText="Избранное"
              onClick={() => {
                history.push("/favorites");
              }}
            />
          </IconMenu>
        }
        iconElementRight={
          <FlatButton
            label="Login"
            containerElement={
              session ? <Logout handlerLogOut={handlerLogOut} /> : <Login />
            }
          />
        }
      />
    </div>
  );
});

export default Navigation;
