import { TextareaAutosize } from "@mui/base";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import parse from "html-react-parser";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "../../components/ItemCard";
import { useGetDetailThreadQuery } from "../../slices/threadsApiSlice";
import { useGetAllUsersQuery } from "../../slices/userApiSlice";
const Thread = () => {
  const { id } = useParams();
  const [owner, setOwner] = useState(null);

  const { data, isFetching } = useGetDetailThreadQuery(id);
  const { data: user, isFetching: isFetchingUser } = useGetAllUsersQuery();

  useEffect(() => {
    const getOwner = async () => {
      if (!isFetchingUser) {
        setOwner(user.data.users.find(({ id }) => id === data.data.detailThread.owner.id));
      }
    };
    getOwner();
  }, [user, isFetchingUser, data]);
  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      {isFetching ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
              {data.data.detailThread.title}
            </Typography>
            <Typography variant="body2" color={"grey"}></Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>{parse(data.data.detailThread.body)}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Chip label={data.data.detailThread.category} sx={{ mr: 0.5 }} />
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6">Komentar</Typography>
            <TextareaAutosize
              style={{
                border: "1px solid grey",
                width: "90%",
                padding: "16px",
                borderRadius: "8px",
              }}
            />
            <Button variant="contained">Post</Button>
          </Grid>
          <Grid item xs={4} px={3}>
            {isFetchingUser ? (
              <CircularProgress />
            ) : (
              <Box
                display={"flex"}
                alignItems={"center"}
                border={"2px solid lightgrey"}
                p={"0.5rem 0.75rem"}
                borderRadius={"1rem"}
              >
                <Stack width={"3rem"} mr={1}>
                  <img
                    style={{ width: "100%", borderRadius: "50%" }}
                    src={owner?.avatar}
                    alt={owner?.name}
                  />
                </Stack>
                <Stack>
                  <Typography>{owner?.name}</Typography>
                  <Typography variant="body2" color={"grey"}>
                    Created at {moment(data.data.detailThread.createdAt).format("DD/MM/YYYY HH:mm")}
                  </Typography>
                </Stack>
              </Box>
            )}
          </Grid>
          {console.log(data.data.detailThread.comments)}
          {data.data.detailThread.comments.length > 0 &&
            data.data.detailThread.comments.map((comment) => (
              <Grid item xs={12} key={comment.id}>
                <ItemCard item={comment} type="comment" />
              </Grid>
            ))}
        </Grid>
      )}
    </Container>
  );
};

export default Thread;
