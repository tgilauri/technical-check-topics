const plus = (a, b) => a + b;
const minus = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const PLUS = '+';
const MINUS = '-';
const MULTIPLY = '*';
const DIVIDE = '/';

const weights = {
  [PLUS]: 0,
  [MINUS]: 0,
  [MULTIPLY]: 1,
  [DIVIDE]: 1,
};

const mapping = {
  [PLUS]: plus,
  [MINUS]: minus,
  [MULTIPLY]: multiply,
  [DIVIDE]: divide,
};

const operatorsReg = `[+/*-]`;
const numbersReg = `\\s?\\d+(?:\.\\d+)?\\s?`;
const operatorsRegEx = new RegExp(`${operatorsReg}`, 'g');
const parenthesesRegEx = new RegExp(`(\\(([^()]+)\\))`);
const getOperationRegEx = (operator) => new RegExp(`(${numbersReg}[${operator}]${numbersReg})`);

const prepareNumber = (number) => {
  if (`${number}`.includes('.')) {
    const [int, dec] = `${number}`.split('.');
    return parseFloat(`${int}.${dec.substr(0, 6)}`);
  }
  return number;
};

const parseString = (str) => {
  const operatorStr = str.match(operatorsRegEx).shift();
  if (!operatorStr) {
    return str;
  }
  const fn = mapping[operatorStr];
  const args = str.split(operatorStr).map(Number);
  return fn.bind(null, ...args);
};

const parseCalcString = (str) => {
  let result = str;
  const match = str.match(operatorsRegEx);
  if (!match) {
    return result;
  }
  const operators = match.sort((a, b) => weights[b] - weights[a]);

  while (operators.length > 0) {
    const operator = operators.shift();
    const operationMatch = result.match(getOperationRegEx(operator));
    if (!operationMatch) {
      return result;
    }
    const operation = operationMatch.shift();
    const fn = parseString(operation);
    const operationResult = prepareNumber(fn());
    result = result.replace(getOperationRegEx(operator), operationResult);
  }
  return result;
};

const parseParentheses = (str) => {
  let result = str;
  const parentheses = str.match(parenthesesRegEx);
  if (!parentheses?.length) {
    return result;
  }
  let operations;
  while ((operations = result.match(parenthesesRegEx))) {
    const operation = operations.shift();
    const preparedOperation = operation.substring(1, operation.length - 1);
    const parenthesesResult = parseCalcString(preparedOperation);
    result = result.replace(operation, parenthesesResult);
  }
  return result;
};

const calculate = (str) => {
  if (!str) {
    throw 'You must provide string for calculation';
  }
  if (typeof str !== 'string') {
    throw 'Provided value not a string';
  }
  if (!str.length) {
    throw 'You must provide non-empty string';
  }

  return parseCalcString(parseParentheses(str));
};

calculate('');

console.log(calculate('(1 + (2 + 1)) + (13 / 4) / 2 / 8 * 5 / 4 + 1 * 9'));
