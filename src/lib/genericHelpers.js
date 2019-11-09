export function titleCase(str) {
  if (typeof str !== "string") {
    throw new Error(`How would you titleCase a ${typeof str}`);
  }

  return str[0].toUpperCase() + str.substr(1).toLowerCase();
}
