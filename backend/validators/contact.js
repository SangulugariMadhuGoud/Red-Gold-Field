// Contact form validation
const validateContact = (data) => {
  const errors = [];

  if (
    !data.name ||
    typeof data.name !== "string" ||
    data.name.trim().length === 0
  ) {
    errors.push("Name is required");
  }

  if (
    !data.email ||
    typeof data.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
  ) {
    errors.push("Valid email is required");
  }

  if (
    !data.phone ||
    typeof data.phone !== "string" ||
    data.phone.trim().length === 0
  ) {
    errors.push("Phone number is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default validateContact;
