import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../slices/alertSlice";

const GlobalAlert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  if (alert?.value?.type) {
    return (
      <Alert
        severity={alert?.value?.type}
        onClose={() => dispatch(setAlert({ type: null, detail: "" }))}
      >
        {alert?.value?.detail}
      </Alert>
    );
  }
};

export default GlobalAlert;
