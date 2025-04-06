export const validate = (formData) => {
  const newErrors = {};
  if (!formData.firstName) newErrors.firstName = "First name is required";
  if (!formData.lastName) newErrors.lastName = "Last name is required";
  if (!formData.email.match(/^\S+@\S+\.\S+$/))
    newErrors.email = "Invalid email";
  if (!formData.currentPassword)
    newErrors.currentPassword = "Current Password is needed";
  if (formData.newPassword && formData.newPassword.length < 6)
    newErrors.newPassword = "Password must be at least 6 characters";

  return newErrors;
};
