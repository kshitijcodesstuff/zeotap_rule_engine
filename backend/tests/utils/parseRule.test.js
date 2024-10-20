const parseRule = require('../../utils/parseRule');

describe('Parse Rule Logic', () => {
  test('Should parse a simple rule correctly', () => {
    const ruleString = '(salary > 60000)';
    const ast = parseRule(ruleString);

    expect(ast).toBeDefined();
    expect(ast.type).toBe('operator');
    expect(ast.value).toBe('>');
    expect(ast.left.value).toBe('salary');
    expect(ast.right.value).toBe(60000);
  });

  test('Should parse a complex rule correctly', () => {
    const ruleString = '(age > 30 && salary > 60000)';
    const ast = parseRule(ruleString);

    expect(ast).toBeDefined();
    expect(ast.type).toBe('operator');
    expect(ast.value).toBe('&&');
    expect(ast.left.type).toBe('operator');
    expect(ast.left.value).toBe('>');
    expect(ast.left.left.value).toBe('age');
    expect(ast.left.right.value).toBe(30);
    expect(ast.right.type).toBe('operator');
    expect(ast.right.value).toBe('>');
    expect(ast.right.left.value).toBe('salary');
    expect(ast.right.right.value).toBe(60000);
  });

  test('Should throw an error for invalid rule strings', () => {
    const ruleString = 'invalid rule';
    expect(() => parseRule(ruleString)).toThrow('Invalid rule string');
  });
});


