import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../../slices/alertSlice";
import { setCredentials } from "../../slices/authSlice";
import { useLoginMutation } from "../../slices/userApiSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });
  const [login] = useLoginMutation();

  const handleChangePayload = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        email: payload.email,
        password: payload.password,
      }).unwrap();

      if (res.status === "success") {
        console.log(res.data.token);
        dispatch(setCredentials(res.data.token));
        navigate("/");
      }
    } catch (error) {
      dispatch(setAlert({ type: "error", detail: error?.data?.message }));
    }
  };
  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Login</Typography>
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
          <Button variant="contained" sx={{ p: "8px 28px" }} type="submit" onClick={onLogin}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
