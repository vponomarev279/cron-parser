import { convertStringToNumber, unique } from "./utils.service";
import { error, checkNumber } from "./checker.service";

type Type = "minutes" | "hours" | "days" | "months" | "daysOfWeek";

const config: {
  [key in Type]: {
    min: number;
    max: number;
  };
} = {
  minutes: {
    min: 0,
    max: 59,
  },
  hours: {
    min: 0,
    max: 23,
  },
  days: {
    min: 1,
    max: 31,
  },
  months: {
    min: 1,
    max: 12,
  },
  daysOfWeek: {
    min: 0,
    max: 6,
  },
};

export function parse(input: string, type: Type): string {
  const { min, max } = config[type];
  const result: number[] = [];

  for (const val of input.split(",")) {
    if (val.indexOf("/") !== -1) {
      result.push(...parseStepValue(val, min, max));
    } else if (val.indexOf("-") !== -1) {
      result.push(...parseRange(val, min, max));
    } else if (val === "*") {
      result.push(...parseAnyValue(min, max));
    } else {
      const number = convertStringToNumber(val);
      checkNumber(number, min, max);

      result.push(number);
    }
  }

  result.sort((a, b) => a - b);

  return unique(result).join(" ");
}

// private

function parseStepValue(stepValue: string, min: number, max: number): number[] {
  const [left, right] = stepValue.split("/");

  const leftNumber = convertStringToNumber(left);
  const rightNumber = convertStringToNumber(right);

  checkNumber(rightNumber, min, max);

  const result: number[] = [];

  if (left === "*") {
    for (let i = min; i <= max; i += rightNumber) {
      result.push(i);
    }

    return result;
  }

  if (left.indexOf("-") !== -1) {
    const [rangeLeft, rangeRight] = left.split("-");

    const rangeLeftNumber = convertStringToNumber(rangeLeft);
    const rangeRightNumber = convertStringToNumber(rangeRight);

    checkNumber(rangeLeftNumber, min, max);
    checkNumber(rangeRightNumber, min, max);

    if (rangeLeftNumber > rangeRightNumber) {
      throw error;
    }

    for (let i = rangeLeftNumber; i <= rangeRightNumber; i += rightNumber) {
      result.push(i);
    }

    return result;
  }

  checkNumber(leftNumber, min, max);

  for (let i = leftNumber; i <= max; i += rightNumber) {
    result.push(i);
  }

  return result;
}

function parseRange(range: string, min: number, max: number): number[] {
  const result: number[] = [];
  const [rangeLeft, rangeRight] = range.split("-");

  const rangeLeftNumber = convertStringToNumber(rangeLeft);
  const rangeRightNumber = convertStringToNumber(rangeRight);

  checkNumber(rangeLeftNumber, min, max);
  checkNumber(rangeRightNumber, min, max);

  if (rangeLeftNumber > rangeRightNumber) {
    throw error;
  }

  for (let i = rangeLeftNumber; i <= rangeRightNumber; i++) {
    result.push(i);
  }

  return result;
}

function parseAnyValue(min: number, max: number): number[] {
  const result: number[] = [];

  for (let i = min; i <= max; i++) {
    result.push(i);
  }

  return result;
}
