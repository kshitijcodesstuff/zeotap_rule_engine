import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import axios from 'axios';

const ModifyRuleForm = () => {
  const [rules, setRules] = useState([]);
  const [selectedRuleId, setSelectedRuleId] = useState('');
  const [ruleString, setRuleString] = useState('');
  const [response, setResponse] = useState(null);

  // Fetch all rules on component mount
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const { data } = await axios.get('http://localhost:5001/api/rules');
        setRules(data);
      } catch (error) {
        console.error('Error fetching rules:', error);
      }
    };
    fetchRules();
  }, []);

  // Load the selected rule
  const handleRuleSelection = (ruleId) => {
    setSelectedRuleId(ruleId);
    const selectedRule = rules.find((rule) => rule._id === ruleId);
    if (selectedRule) {
      setRuleString(selectedRule.root?.value || '');
    }
  };

  // Update the rule in the database
  const modifyRule = async () => {
    try {
      const { data } = await axios.put(`http://localhost:5001/api/rules/update/${selectedRuleId}`, {
        ruleString
      });
      setResponse({ success: 'Rule updated successfully!' });
      setRuleString('');
      setSelectedRuleId('');
    } catch (error) {
      setResponse({ error: 'Failed to update rule' });
      console.error('Error updating rule:', error.response?.data || error.message);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Modify Rule
      </Typography>

      {/* Rule Selection Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Select a Rule to Modify</InputLabel>
        <Select
          value={selectedRuleId}
          onChange={(e) => handleRuleSelection(e.target.value)}
          label="Select a Rule to Modify"
        >
          {rules.map((rule) => (
            <MenuItem key={rule._id} value={rule._id}>
              {rule.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Text Area to Modify Rule */}
      <TextField
        fullWidth
        label="Modify Rule String"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        placeholder="Enter the updated rule"
        margin="normal"
        multiline
        minRows={3}
      />

      {/* Modify Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={modifyRule}
        sx={{ mt: 2 }}
        disabled={!selectedRuleId || !ruleString}
      >
        Update Rule
      </Button>

      {/* Success/Error Message */}
      {response && (
        <Typography
          variant="body2"
          color={response.error ? 'error.main' : 'success.main'}
          sx={{ mt: 2 }}
        >
          {response.error || response.success}
        </Typography>
      )}
    </Box>
  );
};

export default ModifyRuleForm;
