

const validAttributes = ['age', 'department', 'salary', 'experience'];

function validateAttributes(expr) {
  if (expr.type === 'Identifier') {
    if (!validAttributes.includes(expr.name)) {
      throw new Error(`Invalid attribute: ${expr.name}`);
    }
  } else if (expr.left) {
    validateAttributes(expr.left);
  } else if (expr.right) {
    validateAttributes(expr.right);
  }
}

module.exports = validateAttributes;
