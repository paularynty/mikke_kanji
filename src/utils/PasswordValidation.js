//Checking for the 25 most common passwords according to NordPass
const PasswordValidation = (password) => {
  const commonPassword = [
    "qwerty",
    "qwerty123",
    "qwertyuiop",
    "password",
    "password1",
    "password123",
    "1234",
    "123321",
    "12345678",
    "123456789",
    "1234567890",
    "111111",
    "123123",
    "1234567",
    "000000",
    "abcdef",
    "abc123",
    "aa12345678",
  ];

  const isCommonPassword = (password) =>
    commonPassword.includes(password.toLowerCase());

  if (isCommonPassword(password)) {
    return {
      isValid: false,
      error: "Password is too common. Please choose a different password.",
    };
  }

  const checkPasswordStrength = (password) => {
    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const numberCriteria = /[0-9]/.test(password);
    const specialCharCriteria = /[!@#$%^&*-_+=]/.test(password);
    const commonPasswordCriteria = !commonPassword(password);

    return (
      lengthCriteria &&
      uppercaseCriteria &&
      lowercaseCriteria &&
      numberCriteria &&
      specialCharCriteria &&
      commonPasswordCriteria
    );
  };

  if (!checkPasswordStrength(password)) {
    return {
      isValid: false,
      error:
        "Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character.",
    };
  }

  return { isValid: true };
};

export default PasswordValidation;
