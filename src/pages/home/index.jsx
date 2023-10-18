import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useGetAllThreadsQuery } from "../../slices/threadsApiSlice";
import DiscussionCard from "./components/DiscussionCard";

const Home = () => {
  const { data, isFetching } = useGetAllThreadsQuery();
  console.log(data);
  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">All Discussions</Typography>
        </Grid>
        {isFetching ? (
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        ) : (
          data.data.threads.map((item) => (
            <Grid item xs={12} key={item.id}>
              <DiscussionCard item={item} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Home;
