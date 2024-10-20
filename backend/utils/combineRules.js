
const Node = require('../models/Node');

const combineRules = (rootNodes, ruleStrings) => {
  if (rootNodes.length === 0) return null;
  if (rootNodes.length === 1) return { root: rootNodes[0], ruleString: ruleStrings[0] };


  let combinedNode = new Node('operator', rootNodes[0], rootNodes[1], 'AND');
  let combinedRuleString = `(${ruleStrings[0]} && ${ruleStrings[1]})`;


  for (let i = 2; i < rootNodes.length; i++) {
    combinedNode = new Node('operator', combinedNode, rootNodes[i], 'AND');
    combinedRuleString = `(${combinedRuleString} && ${ruleStrings[i]})`;
  }


  combinedRuleString = combinedRuleString.replace(/\(\((.*?)\)\)/g, '($1)');

  return { root: combinedNode, ruleString: combinedRuleString };
};

module.exports = combineRules;

