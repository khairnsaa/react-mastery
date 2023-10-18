import { TextareaAutosize } from "@mui/base";
import { Button, Chip, Container, Grid, Typography } from "@mui/material";
const Thread = () => {
  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">A Very Long Title Discussions Name GOes Here</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quia aperiam
            corporis, consequuntur neque amet harum unde repellendus consectetur saepe.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Chip label="Tag 1" sx={{ mr: 0.5 }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Komentar</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            style={{
              border: "1px solid grey",
              width: "100%",
              padding: "16px",
              borderRadius: "8px",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained">Post</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Thread;
