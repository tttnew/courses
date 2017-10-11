import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import FontIcon from "material-ui/FontIcon";
import RaisedButton from "material-ui/RaisedButton";
import ProgressDialog from './ProgressDialog';
import ModeEdit from "material-ui/svg-icons/editor/mode-edit";
import Delete from "material-ui/svg-icons/action/delete";

const UserPage = ({
  isFetching,
  courses,
  handleEditData,
  handleDeleteData,
  handleAddData
}) => (
  <div style={{ margin: "5px" }}>
    <ProgressDialog isFetching={isFetching} />
    <RaisedButton label="Добавить" onClick={handleAddData} />
    <Table>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn>ID</TableHeaderColumn>
          <TableHeaderColumn>Title</TableHeaderColumn>
          <TableHeaderColumn>Description</TableHeaderColumn>
          <TableHeaderColumn>Time</TableHeaderColumn>
          <TableHeaderColumn>Cost</TableHeaderColumn>
          <TableHeaderColumn />
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {courses.map((course, index) => {
          return (
            <TableRow key={index}>
              <TableRowColumn>{course.id}</TableRowColumn>
              <TableRowColumn>{course.title}</TableRowColumn>
              <TableRowColumn>{course.description}</TableRowColumn>
              <TableRowColumn>{course.hour_qty}</TableRowColumn>
              <TableRowColumn>{course.cost}</TableRowColumn>
              <TableRowColumn>
                <ModeEdit
                  onClick={() => {
                    handleEditData(courses[index]);
                  }}
                />

                <FontIcon
                  className="material-icons"
                  onClick={() => {
                    handleDeleteData(courses[index].id);
                  }}
                >
                  <Delete />
                </FontIcon>
              </TableRowColumn>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </div>
);

export default UserPage;
