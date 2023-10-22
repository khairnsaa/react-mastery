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
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ItemCard from "../../components/ItemCard";
import { setAlert } from "../../slices/alertSlice";
import {
  useCreateCommentMutation,
  useDownVoteCommentMutation,
  useUpVoteCommentMutation,
} from "../../slices/commentsApiSlice";
import { useGetDetailThreadQuery } from "../../slices/threadsApiSlice";
import { useGetAllUsersQuery } from "../../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import GlobalAlert from "../../components/GlobalAlert";
const Thread = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [owner, setOwner] = useState(null);
  const [commentPayload, setCommentPayload] = useState(null);

  const [createComment] = useCreateCommentMutation();
  const [upVoteComment] = useUpVoteCommentMutation();
  const [downVoteComment] = useDownVoteCommentMutation();
  const { data, isFetching, refetch } = useGetDetailThreadQuery(id);
  const { data: user, isFetching: isFetchingUser } = useGetAllUsersQuery();
  console.log(data);
  const onCreateComment = async (e) => {
    e.preventDefault();
    try {
      const res = await createComment({
        threadId: id,
        body: { content: commentPayload },
      }).unwrap();

      if (res.status === "success") {
        refetch();
        setCommentPayload("");
        dispatch(
          setAlert({ type: "success", detail: "Success Create Comment" })
        );
      }
    } catch (error) {
      dispatch(setAlert({ type: "error", detail: error?.data?.message }));
    }
  };

  const onUpVoteComment = async (commentId) => {
    try {
      const res = await upVoteComment({ id, commentId }).unwrap();

      if (res.status === "success") {
        refetch();
        dispatch(setAlert({ type: null, detail: "" }));
      }
    } catch (error) {
      dispatch(setAlert({ type: "error", detail: error?.data?.message }));
    }
  };

  const onDownVoteComment = async (commentId) => {
    try {
      const res = await downVoteComment({ id, commentId }).unwrap();

      if (res.status === "success") {
        refetch();
        dispatch(setAlert({ type: null, detail: "" }));
      }
    } catch (error) {
      dispatch(setAlert({ type: "error", detail: error?.data?.message }));
    }
  };

  useEffect(() => {
    const getOwner = async () => {
      if (!isFetchingUser) {
        setOwner(
          user.data.users.find(
            ({ id }) => id === data.data.detailThread.owner.id
          )
        );
      }
    };
    getOwner();
  }, [user, isFetchingUser, data]);
  useEffect(() => {
    if (!isFetching && data === undefined) navigate("/404");
  }, [data, isFetching, navigate]);
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
              value={commentPayload}
              onChange={(e) => setCommentPayload(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{ my: 1 }}
              onClick={onCreateComment}
            >
              Post
            </Button>
            <GlobalAlert />
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
                    Created at{" "}
                    {moment(data.data.detailThread.createdAt).format(
                      "DD/MM/YYYY HH:mm"
                    )}
                  </Typography>
                </Stack>
              </Box>
            )}
          </Grid>
          {data.data.detailThread.comments.length > 0 &&
            data.data.detailThread.comments.map((comment) => (
              <Grid item xs={12} key={comment.id}>
                <ItemCard
                  item={comment}
                  type="comment"
                  onUpvote={onUpVoteComment}
                  onDownVote={onDownVoteComment}
                />
              </Grid>
            ))}
        </Grid>
      )}
    </Container>
  );
};

export default Thread;
