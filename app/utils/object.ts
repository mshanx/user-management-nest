export const predicates = {
  isUndefined: value => value === undefined,

  //Checks if `value` is `null` or `undefined`.
  isNil: value => value == null,
};

/**
 * This method creates an object composed properties of object that predicate doesn't return truthy for.
 */
export const omitBy = (
  object: object,
  predicate: (value: any, key: string) => boolean = predicates.isNil,
): object => {
  const result = {};

  for (const prop in object) {
    if (!predicate(object[prop], prop)) {
      result[prop] = object[prop];
    }
  }

  return result;
};

/**
 * This method creates an object composed of properties of `object` that are not omitted
 */
export const omit = (object: object, props: string[]): object => {
  return omitBy(object, (value, prop) => props.includes(prop));
};