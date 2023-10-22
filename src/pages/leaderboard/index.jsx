import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetLeaderboardQuery } from "../../slices/leaderboardApiSlice";

const Leaderboard = () => {
  const { data, isFetching } = useGetLeaderboardQuery();
  console.log(data);
  return (
    <Container maxWidth="md">
      <Typography textAlign={"center"} variant="h4">
        Leaderboard
      </Typography>
      {isFetching ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer sx={{ mt: 2 }} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>User</TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="right">
                  Score
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.leaderboards.map((row) => (
                <TableRow
                  key={row.user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.user.name}
                  </TableCell>
                  <TableCell align="right">{row.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Leaderboard;
