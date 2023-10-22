import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/");
  };
  return (
    <Container
      maxWidth="md"
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3">404 Page Not Found</Typography>
      <Typography my={1}>
        Oops, Sepertinya halaman yang kamu tuju tidak ada
      </Typography>
      <Button onClick={goBack} variant="contained">
        Balik Lagi Yuk
      </Button>
    </Container>
  );
};

export default NotFound;
