export const nameValidator = (name: string): true | string => {
  if (!name) {
    return 'Please enter something';
  }
  return true;
};

export const emailValidator = (email: string): true | string => {
  const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  if (!email) {
    return 'Please enter an email';
  } else if (!emailRegex.exec(email)) {
    return 'Please enter a valid email';
  } else {
    return true;
  }
};

export const passwordValidator = (password: string): true | string => {
  if (!password) {
    return 'Please enter a password';
  } else if (password.length < 8) {
    return 'Password must be at least 8 characters';
  } else {
    return true;
  }
};
