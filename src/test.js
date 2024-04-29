const handleSubmit = (e) => {
  e.preventDefault(); // Stop the form from submitting normally

  const data = new FormData();
  Object.keys(formData).forEach((key) => {
    data.append(key, formData[key]);
  });

  if (file) {
    data.append("file", file); // Appends the file
  }

  axios
    .post("http://localhost:5000/submit-form", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Form and file submitted successfully", response);
      alert("Form and file submitted successfully");
      // Optionally reset the form here if needed
      // resetForm();
    })
    .catch((error) => {
      console.error("Error submitting form and file", error);
      alert("Error submitting form and file");
    });
};

// Function to reset form if needed after successful submit
const resetForm = () => {
  setFormData({
    projectName: "",
    client: "",
    state: "",
    office: "",
    tcc: "",
    projectType: "",
    projectOffice: "",
    pointOfContact: "",
  });
  setFile(null);
};
