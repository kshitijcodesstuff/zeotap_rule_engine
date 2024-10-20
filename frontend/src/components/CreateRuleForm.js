import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

const CreateRuleForm = () => {
  const [ruleString, setRuleString] = useState('');
  const [name, setName] = useState('');

  const createRule = async () => {
    try {
      await axios.post('http://localhost:5001/api/rules/create', { ruleString, name });
      alert('Rule created successfully!');
      setRuleString('');
      setName('');
    } catch (error) {
      alert(`Error creating rule: ${error.response?.data?.error}`);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create a New Rule
      </Typography>
      <TextField
        fullWidth
        label="Rule Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Rule String"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        margin="normal"
        multiline
        rows={4}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={createRule}
        sx={{ mt: 2 }}
      >
        Create Rule
      </Button>
    </Box>
  );
};

export default CreateRuleForm;
