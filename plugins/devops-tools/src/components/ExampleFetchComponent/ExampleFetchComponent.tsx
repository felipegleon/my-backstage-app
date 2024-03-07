import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export const MyComponent = () => {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState('');
  const [repositoryName, setRepositoryName] = useState('');
  const [gitFlowWorkflow, setGitFlowWorkflow] = useState('');


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setClient('');
    setGitFlowWorkflow('');
    setRepositoryName('');
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      client: client,
      repositoryName: repositoryName,
      gitFlowWorkflow: gitFlowWorkflow,
    };

    try {
      const response = await fetch('http://localhost:7007/api/proxy/devops-tools/repository/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('An error occurred while making the API request:', error);
    }
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Open Form
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Repository</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Client"
              value={client}
              required
              onChange={(event) => setClient(event.target.value)}
            />
            <TextField
              label="Repository Name"
              value={repositoryName}
              required
              onChange={(event) => setRepositoryName(event.target.value)}
            />
            <TextField
              label="Git Flow Workflow"
              value={gitFlowWorkflow}
              required
              onChange={(event) => setGitFlowWorkflow(event.target.value)}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
