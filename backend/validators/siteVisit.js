// Site visit form validation
const validateSiteVisit = (data) => {
  const errors = [];
  const validProjects = [
    "Srikakulam Greens",
    "Vizag Valley Estate",
    "Kadapa Farmlands",
    "Not sure yet",
  ];

  if (
    !data.name ||
    typeof data.name !== "string" ||
    data.name.trim().length === 0
  ) {
    errors.push("Name is required");
  }

  if (
    !data.phone ||
    typeof data.phone !== "string" ||
    data.phone.trim().length === 0
  ) {
    errors.push("Phone number is required");
  }

  if (!data.project || !validProjects.includes(data.project)) {
    errors.push("Valid project selection is required");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default validateSiteVisit;
