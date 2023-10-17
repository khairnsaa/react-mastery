import React from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";

const Register = () => {
  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Register</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField label="name" sx={{ width: "100%" }} />
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

export default Register;
