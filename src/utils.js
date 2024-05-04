const isEmpty = (value) => {
  switch (typeof value) {
    case 'string':
      return value.length === 0;
    case 'number':
      return value === 0;
    case 'object':
      return Array.isArray(value)
        ? value.length === 0
        : Object.keys(value).length === 0;
    default:
      return true; // Treat undefined, null, and other types as empty
  }
};

const isFilter = (filters) =>
  Object.values(filters).some((filter) => !isEmpty(filter));

const SingleFilter = (datas, compareValue, property) =>
  datas.filter((data) => data[property] === compareValue);

const minFilter = (datas, compareValue, property) =>
  datas.filter((data) => data[property] >= compareValue);

const multiFilter = (datas, compareValue, property) =>
  datas.filter((data) => compareValue.includes(data[property]));

export { isFilter, SingleFilter, minFilter, multiFilter, isEmpty };
