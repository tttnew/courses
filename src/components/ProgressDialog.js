import React from "react";
import CircularProgress from "material-ui/CircularProgress";
import Dialog from "material-ui/Dialog";

const ProgressDialog = ({ isFetching }) => {
  if (!isFetching) return (null);
  return (
    <div>
      <Dialog open={true}>
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={80} thickness={5} />
        </div>
      </Dialog>
    </div>
  );
};

export default ProgressDialog;
