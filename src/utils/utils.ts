export namespace Utils {
  export const isNull = (variable: any): boolean => {
    if (typeof variable === 'number') return false;
    if (typeof variable === 'boolean') return false;
    return variable === undefined || variable === null;
  };

  export const isDefined = (variable: any): boolean => {
    return !isNull(variable);
  };

  export const isArrayFilled = (variable: any): boolean => {
    return isDefined(variable) && variable.length > 0;
  };

  export const isArrayEmpty = (variable: any): boolean => {
    return !isArrayFilled(variable);
  };

  export const isObjectEmpty = (object: any): boolean => {
    return Object.keys(object).length === 0;
  };

  export const isObjectFilled = (object: any): boolean => {
    return isDefined(object) && Object.keys(object).length > 0;
  };

  export const isStringDefined = (variable: string): boolean => {
    return isDefined(variable) && variable.length > 0;
  };

  export const stringToColour = (string: string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  };
}
