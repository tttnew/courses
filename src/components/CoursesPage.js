import React, { Component } from "react";
import { GridList, GridTile } from "material-ui/GridList";
import Favorite from "material-ui/svg-icons/action/favorite";
import {
  BottomNavigation,
  BottomNavigationItem
} from "material-ui/BottomNavigation";
import ProgressDialog from "./ProgressDialog";
import "../css/CoursesPage.css";

class CoursesPage extends Component {
  render() {
    let { courses, favorites, handleFavoriteClick, isFetching } = this.props;
    return (
      <div>
        <ProgressDialog isFetching={isFetching} />
        <GridList cols={4} padding={10} cellHeight="auto">
          {courses.map((value, index) => {
            let { title, description, hour_qty, cost } = value;
            return (
              <GridTile key={index}>
                <div className="courseBlock">
                  <div className="title">
                    {title}
                    <div>
                      <i>
                        {cost}
                        <span role="img" aria-label="Rubles">
                          &#8381;
                        </span>
                      </i>
                    </div>
                  </div>
                  <div className="description">{description}</div>
                  <div className="time">
                    <span role="img" aria-label="Clock">
                      &#128336;
                    </span>{" "}
                    {hour_qty} часов
                  </div>
                  <div className="favorites">
                    <div
                      className="favoritesButton"
                      onClick={() => {
                        handleFavoriteClick(value.id);
                      }}
                    >
                      <BottomNavigation
                        selectedIndex={
                          favorites.indexOf(value.id) > -1 ? 0 : undefined
                        }
                      >
                        <BottomNavigationItem
                          label="В избранное"
                          icon={<Favorite />}
                        />
                      </BottomNavigation>
                    </div>
                  </div>
                </div>
              </GridTile>
            );
          })}
        </GridList>
      </div>
    );
  }
}

// CoursesPage.defaultProps = {
//   courses:[]
// };
export default CoursesPage;
