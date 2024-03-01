import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  CardContent,
  CardActions,
  Card,
  Button,
  FormGroup
} from '@material-ui/core';
import {
  Content
} from '@backstage/core-components';
import TextField from '@material-ui/core/TextField';
import { discoveryApiRef, useApi } from '@backstage/core-plugin-api';

export const MyComponent = () => {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState('');
  const [repositoryName, setRepositoryName] = useState('');
  const [gitFlowWorflow, setGitFlowWorflow] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setGitFlowWorflow('');
    setRepositoryName('');
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const discoveryApi = useApi(discoveryApiRef);
    const baseUrl = discoveryApi.getBaseUrl('devops-tools');
    console.log(await baseUrl);
    const response = await fetch(`${await baseUrl}/repository/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client,
        repositoryName,
        gitFlowWorflow,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // Haz algo con los datos...

    handleClose();
  }

  return (
    <Content>
      <Grid container direction='row'>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <h1>Create New Repository</h1>
            </CardContent>
            <CardActions>
              <Button type="button" onClick={handleOpen}>
                Create
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <h1>Rename Repository</h1>
            </CardContent>
            <CardActions>
              <Button type="button" onClick={handleOpen}>
                Rename
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <h1>Delete Branches</h1>
            </CardContent>
            <CardActions>
              <Button type="button" onClick={handleOpen}>
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
      >

        <DialogContent>
          <DialogTitle>Create New Repository</DialogTitle>
          <DialogContentText>
            Para crear un nuevo repositorio, por favor diligencie el siguiente formulario
          </DialogContentText>



          <FormGroup onSubmit={handleSubmit}>

          <TextField
              label="Client"
              value={client}
              required={true}
              onChange={(event) => setClient(event.target.value)}
            />
            <br />
            <TextField
              label="Repository Name"
              value={repositoryName}
              required={true}
              onChange={(event) => setRepositoryName(event.target.value)}
            />
            <br />
            <TextField
              label="Git Flow Workflow"
              required={true}
              value={gitFlowWorflow}
              onChange={(event) => setGitFlowWorflow(event.target.value)}
            />
          </FormGroup>

        </DialogContent>



        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>

    </Content>
  );
}
