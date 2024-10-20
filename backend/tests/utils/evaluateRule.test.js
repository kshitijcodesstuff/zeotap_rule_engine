const evaluateRule = require('../../utils/evaluateRule');

describe('Rule Evaluation Logic', () => {
  const mockData = {
    salary: 70000,
    age: 35,
  };

  test('Should evaluate a simple rule correctly', () => {
    const ast = {
      type: 'operator',
      left: { type: 'operand', value: 'salary' },
      right: { type: 'operand', value: 60000 },
      value: '>',
    };

    const result = evaluateRule(ast, mockData);
    expect(result).toBe(true);
  });

  test('Should evaluate a complex rule correctly', () => {
    const ast = {
      type: 'operator',
      left: {
        type: 'operator',
        left: { type: 'operand', value: 'age' },
        right: { type: 'operand', value: 30 },
        value: '>',
      },
      right: {
        type: 'operator',
        left: { type: 'operand', value: 'salary' },
        right: { type: 'operand', value: 60000 },
        value: '>',
      },
      value: '&&',
    };

    const result = evaluateRule(ast, mockData);
    expect(result).toBe(true);
  });

  test('Should return false if rule conditions fail', () => {
    const ast = {
      type: 'operator',
      left: { type: 'operand', value: 'salary' },
      right: { type: 'operand', value: 100000 },
      value: '>',
    };

    const result = evaluateRule(ast, mockData);
    expect(result).toBe(false);
  });
});

