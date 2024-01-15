const objectWithoutKey = (object: object, key: string): ZoneProps => {
  const {[key]: deletedKey, ...otherKeys} = object;
  return otherKeys;
};

export {objectWithoutKey};
