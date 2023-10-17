import { Box, Chip, Grid, Typography } from "@mui/material";
import React from "react";

const DiscussionCard = () => {
  return (
    <Grid
      container
      sx={{ p: 2, borderRadius: 2, border: "1px solid lightblue" }}
    >
      <Grid item xs={2}>
        <Typography mb={1}>0 Votes</Typography>
        <Typography>0 Answer</Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography mb={1}>
          A Very Long Title Discussions Name GOes Here
        </Typography>
        <Typography mb={1}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis
          tempore ex asperiores ipsam consequuntur expedita ipsum doloribus
          deleniti, excepturi nobis?
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Chip label="Tag 1" sx={{ mr: 0.5 }} />
            <Chip label="Tag 2" sx={{ mx: 0.5 }} />
          </Box>
          <Typography>username asked 1 mins ago</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DiscussionCard;
