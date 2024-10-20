// utils/evaluateRule.js

function evaluateRule(node, data) {
  if (!node) {
    console.error('Undefined node encountered during evaluation.');
    return false;
  }

  console.log('Evaluating node:', JSON.stringify(node, null, 2));

  if (node.type === 'operand') {
    if (typeof node.value === 'string') {
      if (data.hasOwnProperty(node.value)) {

        const val = data[node.value];
        console.log(`Operand '${node.value}' fetched from data: ${val}`);
        return val;
      } else {
 
        console.log(`Operand literal value: '${node.value}'`);
        return node.value;
      }
    } else {

      console.log(`Operand literal value: ${node.value}`);
      return node.value;
    }
  } else if (node.type === 'operator') {
    const left = evaluateRule(node.left, data);
    const right = evaluateRule(node.right, data);

    console.log(`Operator '${node.value}' with operands: left=${left}, right=${right}`);

    switch (node.value) {
      case '&&':
      case 'AND':
        return Boolean(left) && Boolean(right);
      case '||':
      case 'OR':
        return Boolean(left) || Boolean(right);
      case '>=':
        return left >= right;
      case '<=':
        return left <= right;
      case '>':
        return left > right;
      case '<':
        return left < right;
      case '===':
      case '==':
        return left === right;
      case '!==':
        return left !== right;
      default:
        console.error(`Unknown operator: ${node.value}`);
        return false;
    }
  } else {
    console.error(`Unknown node type: ${node.type}`);
    return false;
  }
}

module.exports = evaluateRule;
