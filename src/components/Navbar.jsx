import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { logout } from "../slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
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
        <Link to={"/leaderboard"} style={{ padding: "8px 16px" }}>
          LeaderBoard
        </Link>
        {userInfo ? (
          <>
            <Link to={"/new-thread"} style={{ padding: "8px 16px" }}>
              <Button variant="outlined">Ask Question</Button>
            </Link>
            <Button variant="contained" color="error" onClick={onLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to={"/login"} style={{ padding: "8px 16px" }}>
              <Button variant="outlined">Login</Button>
            </Link>
            <Link to={"/register"}>
              <Button variant="contained">Register</Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
