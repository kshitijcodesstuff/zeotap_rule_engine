import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControlLabel, Typography, Box, TextField } from '@mui/material';
import axios from 'axios';

const CombineRulesForm = () => {
  const [rules, setRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [name, setName] = useState('');
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchRules = async () => {
      const data = await axios.get('http://localhost:5001/api/rules');
      setRules(data.data);
    };
    fetchRules();
  }, []);

  const handleCombine = async (e) => {
    e.preventDefault();
  

    console.log('Combining rules:', selectedRules, 'with name:', name);
  
    if (!selectedRules.length || !name) {
      setResponse({ error: 'Please select rules and provide a name.' });
      return;
    }
  
    try {

      const response = await axios.post('http://localhost:5001/api/rules/combine', {
        ruleIds: selectedRules,
        name,  
      });
  

      setResponse(response.data);  
      setSelectedRules([]);  
      setName(''); 
    } catch (error) {
      console.error('Error combining rules:', error); 
      setResponse({ error: error.response?.data?.error || 'Failed to combine rules' });
    }
  };

  const handleRuleSelection = (ruleId) => {
    setSelectedRules((prevSelectedRules) =>
      prevSelectedRules.includes(ruleId)
        ? prevSelectedRules.filter((id) => id !== ruleId)
        : [...prevSelectedRules, ruleId]
    );
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Combine Rules
      </Typography>
      <TextField
        fullWidth
        label="Combined Rule Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <Typography variant="subtitle1" gutterBottom>
        Select Rules to Combine:
      </Typography>
      {rules.map((rule) => (
        <FormControlLabel
          key={rule._id}
          control={
            <Checkbox
              checked={selectedRules.includes(rule._id)}
              onChange={() => handleRuleSelection(rule._id)}
            />
          }
          label={rule.name}
        />
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleCombine}
        sx={{ mt: 2 }}
      >
        Combine Rules
      </Button>
      {response && (
        <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
          {response.data ? 'Rules combined successfully!' : response.error}
        </Typography>
      )}
    </Box>
  );
};

export default CombineRulesForm;
