export const nonEmpty = (value) => !value;

export const isUnique = (value, arr) => !arr.includes(value.toLowerCase());

export const isAlphaNumeric = (value) => !value.match(/^[a-zA-Z0-9_]*$/);
