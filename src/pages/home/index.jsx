import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import DiscussionCard from "./components/DiscussionCard";

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">All Discussions</Typography>
        </Grid>
        {[1, 2, 3, 4].map(() => (
          <Grid item xs={12}>
            <DiscussionCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
