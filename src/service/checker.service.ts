export function checkNumber(value: number, min: number, max: number) {
  throwErrorIfNaN(value);
  throwErrorIfOutbound(value, min, max);
}

export function checkRange(left: number, right: number) {
  if (left > right) {
    throw error;
  }
}

export function checkCommand(command?: string) {
  if (!command || command === "") {
    throw error;
  }
}

// private

const error = new Error("Invalid format");

function throwErrorIfNaN(value: number) {
  if (Number.isNaN(value)) {
    throw error;
  }
}

function throwErrorIfOutbound(value: number, min: number, max: number) {
  if (value < min || value > max) {
    throw error;
  }
}
