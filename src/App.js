import React, { useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    projectName: "",
    client: "",
    state: "",
    office: "",
    tcc: "",
    projectType: "",
    projectOffice: "",
    pointOfContact: "",
  });

  const [file, setFile] = useState(null);

  const onDrop = (acceptedFiles) => {
    console.log("Accepted files:", acceptedFiles); // Debug: Check what files are being accepted
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
        resetForm();
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

  return (
    <div className="App">
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <label>
          Project Name/Address:
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            placeholder="Project Name/Address"
          />
        </label>
        <label>
          Client:
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            placeholder="Client Name"
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
          />
        </label>
        <label>
          Office:
          <input
            type="text"
            name="office"
            value={formData.office}
            onChange={handleChange}
            placeholder="Office"
          />
        </label>
        <label>
          TCC:
          <input
            type="text"
            name="tcc"
            value={formData.tcc}
            onChange={handleChange}
            placeholder="TCC"
          />
        </label>
        <label>
          Project Type:
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}>
            <option value="">Select Project Type</option>
            <option value="health">Health</option>
            <option value="residential">Residential</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Project Office:
          <input
            type="text"
            name="projectOffice"
            value={formData.projectOffice}
            onChange={handleChange}
            placeholder="Project Office"
          />
        </label>
        <label>
          Point of Contact:
          <select
            name="pointOfContact"
            value={formData.pointOfContact}
            onChange={handleChange}>
            <option value="">Select Point of Contact</option>
            <option value="elliot">Elliot</option>
            <option value="john">John</option>
            <option value="wahid">Wahid</option>
            <option value="hazem">Hazem</option>
            <option value="dan">Dan</option>
          </select>
        </label>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag 'n' drop a file here, or click to select a file</p>
          {file && <div>Selected file: {file.name}</div>}{" "}
          {/* Display selected file information */}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
