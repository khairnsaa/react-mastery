import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Login</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField label="email" sx={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12}>
          <TextField type="password" label="password" sx={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" sx={{ p: "8px 28px" }}>
            Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
