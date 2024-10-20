const express = require('express');
const router = express.Router();
const parseRule = require('../utils/parseRule');
const combineRules = require('../utils/combineRules');
const evaluateRule = require('../utils/evaluateRule');
const Rule = require('../models/Rule');

// Preprocessing function to convert custom syntax to jsep-compatible format
function preprocessRuleString(ruleString) {
  // Replace 'AND' with '&&' and 'OR' with '||'
  ruleString = ruleString.replace(/\bAND\b/g, '&&').replace(/\bOR\b/g, '||');

  // Replace single '=' with '==' for equality checks
  ruleString = ruleString.replace(/(\w+)\s*=\s*('[^']*'|\d+)/g, '$1 == $2');
  
  // Ensure each condition is properly separated by logical operators
  ruleString = ruleString.replace(/(\))\s*(\()/g, '$1 && $2');

  return ruleString;
}



// Create rule endpoint
router.post('/create', async (req, res) => {
  try {
    let { ruleString, name } = req.body;

    // Preprocess the rule string to convert custom syntax
    ruleString = preprocessRuleString(ruleString);

    // Log the preprocessed rule string
    console.log('Preprocessed rule string:', ruleString);

    // Parse the rule string into an AST
    const rootNode = parseRule(ruleString);

    // Check if parsing was successful
    if (!rootNode) {
      return res.status(400).json({ error: 'Failed to parse rule string' });
    }

    // Create a new Rule instance with the name, ruleString, and root (AST)
    const newRule = new Rule({ name, ruleString, root: rootNode });

    // Save the new rule to the database
    await newRule.save();

    // Respond with the created rule
    res.status(201).json(newRule);
  } catch (error) {
    console.error('Error in create_rule endpoint:', error);
    res.status(500).json({ error: error.message });
  }
});


// Combine rules endpoint
router.post('/combine', async (req, res) => {
  try {
    const { ruleIds, name } = req.body;

    // Fetch the rules based on the IDs
    const rules = await Rule.find({ _id: { $in: ruleIds } });

    // Get the AST and ruleString for each rule
    const rootNodes = rules.map(rule => rule.root);
    const ruleStrings = rules.map(rule => rule.ruleString);

    // Combine the rules
    const { root: combinedRoot, ruleString: combinedRuleString } = combineRules(rootNodes, ruleStrings);

    // Create a new Rule with the combined AST and ruleString
    const combinedRule = new Rule({
      name,
      root: combinedRoot,
      ruleString: combinedRuleString,
    });

    // Save the combined rule to the database
    await combinedRule.save();

    // Respond with the created combined rule
    res.status(201).json(combinedRule);
  } catch (error) {
    console.error('Error combining rules:', error);
    res.status(400).json({ error: error.message });
  }
});

// Evaluate rule endpoint
router.post('/evaluate', async (req, res) => {
  try {
    const { ruleId, data } = req.body;
    const rule = await Rule.findById(ruleId);

    if (!rule) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    const result = evaluateRule(rule.root, data);
    res.status(200).json({ result });
  } catch (error) {
    console.error('Error evaluating rule:', error);
    res.status(400).json({ error: error.message });
  }
});

// Update rule endpoint
router.put('/update/:id', async (req, res) => {
  try {
    let { ruleString } = req.body;

    // Preprocess the rule string to convert custom syntax
    ruleString = preprocessRuleString(ruleString);

    // Parse the new rule string into an AST
    const rootNode = parseRule(ruleString);

    if (!rootNode) {
      return res.status(400).json({ error: 'Failed to parse rule string' });
    }

    const updatedRule = await Rule.findByIdAndUpdate(
      req.params.id,
      { ruleString, root: rootNode },
      { new: true }
    );

    if (!updatedRule) {
      return res.status(404).json({ error: 'Rule not found' });
    }

    res.status(200).json(updatedRule);
  } catch (error) {
    console.error('Error updating rule:', error);
    res.status(400).json({ error: error.message });
  }
});

// Get all rules endpoint
router.get('/', async (req, res) => {
  try {
    const rules = await Rule.find();
    res.status(200).json(rules);
  } catch (error) {
    console.error('Error fetching rules:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
