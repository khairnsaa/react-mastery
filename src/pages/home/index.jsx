import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import ItemCard from "../../components/ItemCard";
import {
  useDownVoteThreadMutation,
  useGetAllThreadsQuery,
  useUpVoteThreadMutation,
} from "../../slices/threadsApiSlice";
import { setAlert } from "../../slices/alertSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const { data, isFetching, refetch } = useGetAllThreadsQuery();
  const [upVoteThread] = useUpVoteThreadMutation();
  const [downVoteThread] = useDownVoteThreadMutation();

  const onUpVoteThread = async (id) => {
    try {
      const res = await upVoteThread(id).unwrap();

      if (res.status === "success") {
        refetch();
        dispatch(setAlert({ type: null, detail: "" }));
      }
    } catch (error) {
      dispatch(setAlert({ type: "error", detail: error?.data?.message }));
    }
  };

  const onDownVoteThread = async (id) => {
    try {
      const res = await downVoteThread(id).unwrap();

      if (res.status === "success") {
        refetch();
        dispatch(setAlert({ type: null, detail: "" }));
      }
    } catch (error) {
      dispatch(setAlert({ type: "error", detail: error?.data?.message }));
    }
  };
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
              <ItemCard
                item={item}
                onUpvote={onUpVoteThread}
                onDownVote={onDownVoteThread}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Home;
