import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSpeciality = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // ✅ Fetch specialties
  const fetchSpecialties = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const res = await axios.get(`${BASE_URL}/api/admin/specialties`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSpecialties(res.data.specialties);
    } catch (err) {
      toast.error("Failed to load specialties ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  // ✅ Add single specialty
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!description.trim()) newErrors.description = "Description is required.";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
       const token = localStorage.getItem("jwt");
      const res = await axios.post(
        `${BASE_URL}/api/admin/specialties`,
        { name, description },
        {
  headers: { Authorization: `Bearer ${token}` },
  }
      );
      toast.success(res.data.message || "Specialty created ✅");
      setName("");
      setDescription("");
      setErrors({});
      fetchSpecialties(); // refresh list
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      toast.error(msg);
      if (msg.includes("exists")) setErrors({ name: msg });
    }
  };

  // ✅ Bulk upload
 const handleUpload = async () => {
  if (!file) {
    alert("Please select a file first!");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    setUploading(true);
    const token = localStorage.getItem("jwt"); // get token

    const res = await axios.post(
      `${BASE_URL}/api/admin/speciality`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // 🔑 attach token
        },
      }
    );

    toast.success(res.data.message || "Bulk upload successful ✅");
    setFile(null);
    fetchSpecialties();
  }catch (error) {
    const errData = error.response?.data;
    if (errData?.errorRows) {
      toast.error(`Validation failed at rows: ${errData.errorRows.join(", ")}`);
    } else if (errData?.duplicateRows) {
      toast.error(`Already exists at rows: ${errData.duplicateRows.join(", ")}`);
    } else {
      toast.error(errData?.message || "Upload failed ❌");
    }
  }finally {
    setUploading(false);
  }
};


  return (
    // <div
    //   style={{
    //     maxWidth: "900px",
    //     margin: "0 auto",
    //     padding: "20px",
    //     fontFamily: "Arial, sans-serif",
    //   }}
    // >


    <div
  style={{
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "#F7F3EE",
    minHeight: "100vh",
  }}
>
      {/* <h2 style={{ textAlign: "center", marginBottom: "20px" }}> */}

      <h2
  style={{
    textAlign: "center",
    marginBottom: "20px",
    color: "#8B5E3C",
    fontWeight: "700",
  }}
>
        Manage Specialties
      </h2>

      {/* Add Specialty Form */}
      <div
        // style={{
        //   padding: "15px",
        //   border: "1px solid #ddd",
        //   borderRadius: "8px",
        //   marginBottom: "20px",
        // }}

        style={{
  padding: "20px",
  background: "#FFFDF9",
  border: "1px solid #E8DCCB",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0 4px 12px rgba(139,94,60,0.08)",
}}
      >
        <h3>Add Specialty</h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            // style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}

            style={{
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #D8C3A5",
  background: "#FFFDF9",
  color: "#4A3426",
}}

            placeholder="Specialty Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
          />
          {errors.name && <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.name}</span>}

          <textarea
            // style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}

            style={{
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #D8C3A5",
  background: "#FFFDF9",
  color: "#4A3426",
}}
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: undefined }));
            }}
          />
          {errors.description && <span style={{ color: "red", fontSize: "0.9rem" }}>{errors.description}</span>}

          <button
            type="submit"
            style={{
              padding: "10px",
              // background: "#007bff",

              background: "#8B5E3C",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Create
          </button>
        </form>
      </div>

      {/* Bulk Upload */}
      <div
        // style={{
        //   padding: "15px",
        //   border: "1px solid #ddd",
        //   borderRadius: "8px",
        //   marginBottom: "20px",
        // }}

        style={{
  padding: "20px",
  background: "#FFFDF9",
  border: "1px solid #E8DCCB",
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0 4px 12px rgba(139,94,60,0.08)",
}}
      >
        <h3>Bulk Upload Specialties</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="file"
            accept=".csv,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            onClick={handleUpload}
            disabled={uploading}
            style={{
              padding: "10px",
              // background: uploading ? "#aaa" : "#28a745",
              background: uploading ? "#B7A18B" : "#C89B3C",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>

 
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AddSpeciality;
