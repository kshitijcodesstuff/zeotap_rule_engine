import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import axios from 'axios';

const RuleList = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/rules')
      .then((response) => setRules(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Existing Rules
      </Typography>
      <List>
        {rules.map((rule) => (
          <ListItem key={rule._id} divider>
            {/* Check if root and root.value exist before rendering */}
            <ListItemText 
              primary={rule.name} 
              secondary={rule.root?.value ? rule.root.value : 'No value defined'} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RuleList;
