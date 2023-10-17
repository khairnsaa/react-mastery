import { Box, Button } from "@mui/material";
import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: "8px 16px",
      }}
    >
      <img src={logo} width={"200px"} alt="logo heap overflow" />
      <Box>
        <Link to={"/"} style={{ padding: "8px 16px" }}>
          Threads
        </Link>
        <Link to={"/"} style={{ padding: "8px 16px" }}>
          LeaderBoard
        </Link>
        <Link to={"/login"} style={{ padding: "8px 16px" }}>
          <Button variant="outlined">Login</Button>
        </Link>
        <Link to={"/register"}>
          <Button variant="contained">Register</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Navbar;
