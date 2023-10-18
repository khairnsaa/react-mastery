import { Box, Chip, Grid, Typography } from "@mui/material";
import parse from "html-react-parser";
import PropTypes from "prop-types";

const DiscussionCard = ({ item }) => {
  return (
    <Grid container sx={{ p: 2, borderRadius: 2, border: "1px solid lightblue" }}>
      <Grid item xs={2}>
        <Typography mb={1}>{item.upVotesBy.length} Upvotes</Typography>
        <Typography mb={1}>{item.downVotesBy.length} Down Votes</Typography>
        <Typography>{item.totalComments} Answer</Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography mb={1}>{item.title}</Typography>
        <Typography mb={1}>{parse(item.body)}</Typography>
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

DiscussionCard.propTypes = {
  item: PropTypes.object,
};
