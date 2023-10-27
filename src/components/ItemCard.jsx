import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { Box, Button, Chip, Grid, Stack, Tooltip, Typography } from "@mui/material";
import parse from "html-react-parser";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../slices/userApiSlice";

const ItemCard = ({ item, type = "thread", onUpvote, onDownVote }) => {
  const [owner, setOwner] = useState(null);
  const { data, isFetching } = useGetAllUsersQuery();

  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const secondsAgo = Math.floor((now - date) / 1000);

    if (secondsAgo < 0) {
      return `Just Now`;
    } else if (secondsAgo < 60) {
      return `${secondsAgo} ${secondsAgo === 1 ? "second" : "seconds"} ago`;
    } else if (secondsAgo < 3600) {
      const minutesAgo = Math.floor(secondsAgo / 60);
      return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
    } else if (secondsAgo < 86400) {
      const hoursAgo = Math.floor(secondsAgo / 3600);
      return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
    } else {
      const daysAgo = Math.floor(secondsAgo / 86400);
      return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
    }
  }

  useEffect(() => {
    const getOwner = async () => {
      if (!isFetching) {
        if (type === "thread") {
          setOwner(data.data.users.find(({ id }) => id === item.ownerId));
        } else {
          setOwner(data.data.users.find(({ id }) => id === item.owner.id));
        }
      }
    };
    getOwner();
  }, [item, data, isFetching, type]);
  return (
    <Grid container sx={{ p: 2, borderRadius: 2, border: "1px solid lightblue" }}>
      <Grid item xs={1} mr={2}>
        <Stack>
          <Button
            sx={{ whiteSpace: "nowrap", fontSize: "12px", borderRadius: 4 }}
            variant="outlined"
            onClick={() => onUpvote(item.id)}
            startIcon={<ThumbUpAltIcon />}
          >
            {item.upVotesBy?.length || 0}
          </Button>
          <Button
            sx={{
              whiteSpace: "nowrap",
              fontSize: "12px",
              borderRadius: 4,
              my: 1,
            }}
            variant="outlined"
            onClick={() => onDownVote(item.id)}
            color="error"
            startIcon={<ThumbDownAltIcon />}
          >
            {item.downVotesBy?.length || 0}
          </Button>
        </Stack>
        {type === "thread" && (
          <Typography fontSize={"14px"} whiteSpace={"nowrap"}>
            {item.totalComments} Answer
          </Typography>
        )}
      </Grid>
      <Grid item xs={10}>
        {type === "thread" && (
          <Link to={`/thread/${item.id}`}>
            <Typography mb={1}>{item.title}</Typography>
          </Link>
        )}
        <Typography
          sx={
            type === "thread"
              ? {
                  textOverflow: "ellipsis",
                  height: "2rem",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }
              : { height: "auto" }
          }
          mb={1}
        >
          {parse(item?.body || item.content)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {type === "thread" && (
            <Box>
              <Chip label={item.category} sx={{ mr: 0.5 }} />
            </Box>
          )}
          <Typography variant="body2" color={"grey"}>
            {owner?.name} {type === "thread" ? "Asked " : "Answered "}
            <Tooltip title={`${moment(item.createdAt).format("DD/MM/YYYY HH:mm")}`}>
              {timeAgo(item.createdAt)}
            </Tooltip>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ItemCard;

ItemCard.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
  onUpvote: PropTypes.func,
  onDownVote: PropTypes.func,
};
