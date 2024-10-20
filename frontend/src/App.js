import React from 'react';
import { Container, Typography, Divider } from '@mui/material';
import CreateRuleForm from './components/CreateRuleForm';
import RuleList from './components/RuleList';
import EvaluateRuleForm from './components/EvaluateRuleForm';
import ModifyRuleForm from './components/ModifyRuleForm';
import CombineRulesForm from './components/CombineRulesForm';

function App() {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Rule Engine Application
      </Typography>

      <CreateRuleForm />
      <Divider sx={{ my: 4 }} />

      <RuleList />
      <Divider sx={{ my: 4 }} />

      <EvaluateRuleForm />
      <Divider sx={{ my: 4 }} />

      <ModifyRuleForm />
      <Divider sx={{ my: 4 }} />

      <CombineRulesForm />
    </Container>
  );
}

export default App;
