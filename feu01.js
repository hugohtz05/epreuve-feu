function lexer(input) {
  const tokens = [];
  let buffer = '';

  function flushBuffer() {
    if (buffer.length > 0) {
      const token = !isNaN(Number(buffer)) ? Number(buffer) : buffer;
      tokens.push(token);
      buffer = '';
    }
  }

  for (let i = 0; i < input.length; i++) {
    const character = input[i];

    if (character === ' ') {
      flushBuffer();
      continue;
    }

    if (!isNaN(Number(character)) || character === '.') {
      buffer += character;

      if (i === input.length - 1) {
        flushBuffer();
      }
    } else if (['+', '-', '*', '/', '%', '(', ')'].includes(character)) {
      flushBuffer();
      tokens.push(character);
    }

    if (i === input.length - 1) {
      flushBuffer();
    }
  }

  return tokens;
}

function hasHigherPrecedence(op1, op2) {
  const precedence = {'(': 0, '+': 1, '-': 1, '*': 2, '/': 2};
  return precedence[op1] <= precedence[op2];
}

function shuntingYard(infixExpression) {
  let finalResult = [];
  let operatorStack = [];

  for (let i = 0; i < infixExpression.length; i++) {
    let token = infixExpression[i];

    if (!isNaN(token)) {
      finalResult.push(parseFloat(token));
    } else if (token === '(') {
      operatorStack.push(token);
    } else if (token === ')') {
      while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
        finalResult.push(operatorStack.pop());
      }
      operatorStack.pop(); 
    } else if (['+', '-', '*', '/'].includes(token)) {
      while (operatorStack.length > 0 && hasHigherPrecedence(token, operatorStack[operatorStack.length - 1])) {
        finalResult.push(operatorStack.pop());
      }
      operatorStack.push(token);
    }
  }

  while (operatorStack.length > 0) {
    finalResult.push(operatorStack.pop());
  }

  return finalResult;
}

function evaluatePostfixExpression(postfixExpression) {
  const operandStack = [];

  for (let i = 0; i < postfixExpression.length; i++) {
    const token = postfixExpression[i];

    if (!isNaN(token)) {
      operandStack.push(parseFloat(token));
    } else {
      const operand2 = operandStack.pop();
      const operand1 = operandStack.pop();
      const result = performOperation(operand1, operand2, token);
      operandStack.push(result);
    }
  }

  return operandStack[0];
}

function performOperation(operand1, operand2, operator) {
  if (operator === '+') {
    return operand1 + operand2;
  } else if (operator === '-') {
    return operand1 - operand2;
  } else if (operator === '*') {
    return operand1 * operand2;
  } else if (operator === '/') {
    if (operand2 === 0) {
      throw new Error('Division by zero');
    }
    return operand1 / operand2;
  } else {
    throw new Error('Invalid operator');
  }
}

function getArguments() {
  let firstArgument = process.argv[2];
  return firstArgument;
}

function resolution() {
  let myArgument = getArguments();
  let tokens = lexer(myArgument);
  let sortedToken = shuntingYard(tokens);
  let result = evaluatePostfixExpression(sortedToken)
  console.log(`resultat : ${result}`)
}

resolution();
