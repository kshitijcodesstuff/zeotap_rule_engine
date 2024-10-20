import React, { useState, useEffect } from 'react';
import { Button, Select, MenuItem, TextField, Typography, Box } from '@mui/material';
import axios from 'axios';

const EvaluateRuleForm = () => {
  const [rules, setRules] = useState([]);
  const [selectedRuleId, setSelectedRuleId] = useState('');
  const [data, setData] = useState('{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}');
  const [evaluationResult, setEvaluationResult] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/rules')
      .then((response) => setRules(response.data))
      .catch((error) => console.error(error));
  }, []);

  const evaluateRule = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/rules/evaluate', {
        ruleId: selectedRuleId,
        data: JSON.parse(data),
      });
      setEvaluationResult(response.data.result);
    } catch (error) {
      alert(`Error evaluating rule: ${error.response?.data?.error}`);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Evaluate a Rule
      </Typography>
      <Select
        fullWidth
        value={selectedRuleId}
        onChange={(e) => setSelectedRuleId(e.target.value)}
        displayEmpty
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>
          Select a Rule
        </MenuItem>
        {rules.map((rule) => (
          <MenuItem key={rule._id} value={rule._id}>
            {rule.name}
          </MenuItem>
        ))}
      </Select>
      <TextField
        fullWidth
        label="Data (JSON Format)"
        value={data}
        onChange={(e) => setData(e.target.value)}
        multiline
        rows={4}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={evaluateRule}
        sx={{ mt: 2 }}
      >
        Evaluate Rule
      </Button>
      {evaluationResult !== null && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Result: {evaluationResult.toString()}
        </Typography>
      )}
    </Box>
  );
};

export default EvaluateRuleForm;
