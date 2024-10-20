

const jsep = require('jsep');
const Node = require('../models/Node');

function parseExpression(expr) {
  if (!expr) {
    console.error('parseExpression called with undefined expr');
    return null;
  }

  console.log('Parsing expression:', JSON.stringify(expr, null, 2));

  if (expr.type === 'Compound') {
    return expr.body.map(parseExpression);
  } else if (expr.type === 'BinaryExpression' || expr.type === 'LogicalExpression') {
    const operatorNode = new Node('operator', null, null, expr.operator);
    operatorNode.left = parseExpression(expr.left);
    operatorNode.right = parseExpression(expr.right);
    return operatorNode;
  } else if (expr.type === 'Identifier') {
    return new Node('operand', null, null, expr.name);
  } else if (expr.type === 'Literal') {
    return new Node('operand', null, null, expr.value);
  } else if (expr.type === 'SequenceExpression') {
    console.error('SequenceExpression encountered, possible missing logical operator');
    throw new Error('Invalid rule string: Check logical operators between conditions');
  } else {
    console.error(`Unknown expression type: ${expr.type}`);
    throw new Error('Invalid rule string');
  }
}

function parseRule(ruleString) {
  try {
    const expr = jsep(ruleString);
    if (expr.type === 'Compound' || !expr) {

      throw new Error('Invalid rule string');
    }

    const rootNode = parseExpression(expr);


    if (Array.isArray(rootNode)) {
      throw new Error('Invalid rule string');
    }


    console.log('Parsed AST:', JSON.stringify(rootNode, null, 2));

    return rootNode;
  } catch (error) {
    console.error('Error parsing rule string:', error);
    throw new Error('Invalid rule string');
  }
}

module.exports = parseRule;
