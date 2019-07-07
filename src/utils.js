export const titleCase = stringArray => stringArray.map(string => (
  string[0].toUpperCase() + string.slice(1, string.length).toLowerCase()
));
