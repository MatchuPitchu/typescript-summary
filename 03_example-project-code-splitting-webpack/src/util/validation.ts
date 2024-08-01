// Validation Form Input
export interface Validatable {
  value: string | number;
  // these values are optional when using the inferface
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export const validate = (validatableInput: Validatable) => {
  // if return true, then validation ok, otherwise if at least one validation is invalid, then return false
  let isValid = true;
  if(validatableInput.required) {
    // if thing after && is false, then new value of isValid would be false
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  // check minLength only for input length NOT null and undefined + for type string
  if(validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  // check minLength only for input length NOT null and undefined + for type string
  if(validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  // check min limit
  if(validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  // check max limit
  if(validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}