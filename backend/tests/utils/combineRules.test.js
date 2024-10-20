const combineRules = require('../../utils/combineRules');
const Node = require('../../models/Node');

describe('combineRules function', () => {
  test('Should correctly combine more than two rules', () => {
    const rootNodes = [
      new Node('operator', { type: 'operand', value: 'age' }, { type: 'operand', value: 30 }, '>'),
      new Node('operator', { type: 'operand', value: 'salary' }, { type: 'operand', value: 60000 }, '>'),
      new Node('operator', { type: 'operand', value: 'experience' }, { type: 'operand', value: 5 }, '>')
    ];

    const ruleStrings = ['(age > 30)', '(salary > 60000)', '(experience > 5)'];

    const { root, ruleString } = combineRules(rootNodes, ruleStrings);


    expect(root).toBeDefined();
    expect(ruleString).toBe('((age > 30) && (salary > 60000) && (experience > 5))');
  });

  test('Should return single rule when only one rule is passed', () => {
    const rootNodes = [new Node('operator', { type: 'operand', value: 'age' }, { type: 'operand', value: 30 }, '>')];
    const ruleStrings = ['(age > 30)'];

    const { root, ruleString } = combineRules(rootNodes, ruleStrings);

    expect(root).toBeDefined();
    expect(ruleString).toBe('(age > 30)');
  });
});


