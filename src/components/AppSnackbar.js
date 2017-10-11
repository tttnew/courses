import React from "react";
import Snackbar from "material-ui/Snackbar";

class AppSnackbar extends React.Component {
  render() {
    let { message, open, handleRequestClose } = this.props;
    return (
      <div>
        <Snackbar
          open={open}
          message={message}
          autoHideDuration={4000}
          onRequestClose={handleRequestClose}
        />
      </div>
    );
  }
}

export default AppSnackbar;
