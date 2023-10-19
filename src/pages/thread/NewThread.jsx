import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GlobalAlert from "../../components/GlobalAlert";
import { setAlert } from "../../slices/alertSlice";
import { useCreateThreadMutation } from "../../slices/threadsApiSlice";

const NewThread = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    title: "",
    body: "",
    category: "",
  });

  const [createThread] = useCreateThreadMutation();

  const handleChangePayload = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const onCreateThread = async (e) => {
    e.preventDefault();
    console.log(payload);
    try {
      const res = await createThread(payload).unwrap();

      if (res.status === "success") {
        navigate(`/thread/${res.data.thread.id}`);
      }
    } catch (error) {
      dispatch(setAlert({ type: "error", detail: error?.data?.message }));
    }
  };
  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Create New Discussion</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={payload.title}
            onChange={handleChangePayload}
            name="title"
            style={{ width: "100%" }}
            label="title"
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            style={{ width: "100%", padding: "16px" }}
            placeholder="Give more detail"
            value={payload.body}
            onChange={handleChangePayload}
            name="body"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={payload.category}
            onChange={handleChangePayload}
            name="category"
            style={{ width: "100%" }}
            label="category"
          />
        </Grid>
        <Grid item xs={12}>
          <GlobalAlert />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" onClick={onCreateThread}>
            Post
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewThread;
