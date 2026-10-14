const MAX_EXPRESSION_LENGTH = 256;
const MAX_TOKENS = 128;
const MAX_DEPTH = 32;

export class ArithmeticExpressionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ArithmeticExpressionError";
  }
}

/** Evaluate a small arithmetic language. No JavaScript syntax is accepted. */
export function evaluateArithmetic(expression: string): number {
  if (expression.length > MAX_EXPRESSION_LENGTH) {
    throw new ArithmeticExpressionError("Expression is too long (maximum 256 characters).");
  }

  const tokens = expression.match(/(?:\d+(?:\.\d*)?|\.\d+)|[()+\-*/]|\s+|./g) ?? [];
  const significantTokens = tokens.filter((token) => !/^\s+$/.test(token));
  if (significantTokens.length > MAX_TOKENS) {
    throw new ArithmeticExpressionError("Expression is too complex (maximum 128 tokens).");
  }
  if (significantTokens.some((token) => !/^(?:\d+(?:\.\d*)?|\.\d+|[()+\-*/])$/.test(token))) {
    throw new ArithmeticExpressionError("Unsupported syntax. Use numbers, +, -, *, /, and parentheses.");
  }

  let position = 0;
  let depth = 0;
  const peek = () => significantTokens[position];
  const take = () => significantTokens[position++];
  const ensureFinite = (value: number): number => {
    if (!Number.isFinite(value)) throw new ArithmeticExpressionError("Result is not a finite number.");
    return value;
  };

  const parseExpression = (): number => {
    let value = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const operator = take();
      const right = parseTerm();
      value = ensureFinite(operator === "+" ? value + right : value - right);
    }
    return value;
  };

  const parseTerm = (): number => {
    let value = parseUnary();
    while (peek() === "*" || peek() === "/") {
      const operator = take();
      const right = parseUnary();
      if (operator === "/" && right === 0) throw new ArithmeticExpressionError("Cannot divide by zero.");
      value = ensureFinite(operator === "*" ? value * right : value / right);
    }
    return value;
  };

  const parseUnary = (): number => {
    if (peek() === "+" || peek() === "-") {
      const operator = take();
      const value = parseUnary();
      return ensureFinite(operator === "-" ? -value : value);
    }
    return parsePrimary();
  };

  const parsePrimary = (): number => {
    if (peek() === "(") {
      take();
      depth += 1;
      if (depth > MAX_DEPTH) throw new ArithmeticExpressionError("Expression nesting is too deep (maximum 32 levels).");
      const value = parseExpression();
      if (take() !== ")") throw new ArithmeticExpressionError("Malformed expression: expected closing parenthesis.");
      depth -= 1;
      return value;
    }

    const token = take();
    if (token === undefined || !/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(token)) {
      throw new ArithmeticExpressionError("Malformed expression: expected a number.");
    }
    return ensureFinite(Number(token));
  };

  if (significantTokens.length === 0) throw new ArithmeticExpressionError("Enter an arithmetic expression.");
  const result = parseExpression();
  if (position !== significantTokens.length) throw new ArithmeticExpressionError("Malformed expression: unexpected token.");
  return ensureFinite(result);
}

export function formatArithmeticResult(expression: string): string {
  try {
    return `= ${evaluateArithmetic(expression)}`;
  } catch (error) {
    return error instanceof ArithmeticExpressionError ? `Error: ${error.message}` : "Error: Invalid expression.";
  }
}
