import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GlobalAlert from "../../components/GlobalAlert";
import { setAlert } from "../../slices/alertSlice";
import { useRegisterMutation } from "../../slices/userApiSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [register] = useRegisterMutation();

  const handleChangePayload = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const onRegister = async (e) => {
    e.preventDefault();
    if (payload.password.length < 6) {
      dispatch(setAlert({ type: "error", detail: "Panjang Password Minimal Enam Karakter" }));
    } else {
      dispatch(setAlert({ type: null, detail: "" }));
      try {
        const res = await register({
          name: payload.name,
          email: payload.email,
          password: payload.password,
        }).unwrap();

        if (res.status === "success") {
          navigate("/login");
        }
      } catch (error) {
        dispatch(setAlert({ type: "error", detail: error?.data?.message }));
      }
    }
  };
  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Register</Typography>
        </Grid>
        <Grid item xs={12}>
          <GlobalAlert />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="name"
            value={payload.name}
            onChange={handleChangePayload}
            label="name"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            value={payload.email}
            onChange={handleChangePayload}
            label="email"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="password"
            name="password"
            value={payload.password}
            onChange={handleChangePayload}
            label="password"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" sx={{ p: "8px 28px" }} type="submit" onClick={onRegister}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
