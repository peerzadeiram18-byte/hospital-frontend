import React, { useState } from 'react';
import axios from 'axios';

const AddLabour = () => {
  const [form, setForm] = useState({ name: '', description: '' });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [mode, setMode] = useState("single"); // 🔥 single | bulk

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ SINGLE CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("jwt");

      const res = await axios.post(
        `${BASE_URL}/api/admin/labour-rooms`,
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        }
      );

      setMessage(res.data.message);
      setForm({ name: '', description: '' });
      setShowForm(false);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    }
  };

  // ✅ BULK UPLOAD
  const handleBulkUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    try {
      const token = localStorage.getItem("jwt");

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(
        `${BASE_URL}/api/admin/labour-rooms/bulk`, // ⚠️ check route
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage(res.data.message);
      setShowForm(false);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "Bulk upload failed");
    }
  };

  const handleAddAnother = () => {
    setMessage('');
    setShowForm(true);
    setMode("single");
  };

  return (
    // <div style={{
    //   maxWidth: '500px',
    //   margin: '40px auto',
    //   padding: '30px',
    //   backgroundColor: '#f9f9f9',
    //   borderRadius: '10px'
    // }}>



    <div
  style={{
    maxWidth: "650px",
    margin: "40px auto",
    padding: "30px",
    background: "#FFFDF9",
    border: "1px solid #E8DCCB",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(139,94,60,0.08)",
    fontFamily: "Arial, sans-serif",
  }}
>

      {/* <h2 style={{ textAlign: 'center' }}> */}
        

<h2
  style={{
    textAlign: "center",
    color: "#8B5E3C",
    marginBottom: "25px",
    fontWeight: "700",
  }}
>
        
        

        Add Labour Room</h2>

      {/* 🔥 MODE SWITCH */}
      {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}> */}

<div
  style={{
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "25px",
  }}
>

        {/* <button onClick={() => setMode("single")}>Single</button> */}

          <button
    onClick={() => setMode("single")}
    style={{
      padding: "10px 20px",
      background: mode === "single" ? "#8B5E3C" : "#F7F3EE",
      color: mode === "single" ? "#fff" : "#4A3426",
      border: "1px solid #CDB79E",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    Single Entry
  </button>


  <button
    onClick={() => setMode("bulk")}
    style={{
      padding: "10px 20px",
      background: mode === "bulk" ? "#C89B3C" : "#F7F3EE",
      color: mode === "bulk" ? "#fff" : "#4A3426",
      border: "1px solid #CDB79E",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    Bulk Upload
  </button>

        {/* <button onClick={() => setMode("bulk")}>Bulk Upload</button> */}
      </div>

      {showForm ? (
        <>
          {/* ================= SINGLE FORM ================= */}
          {mode === "single" && (
            <form onSubmit={handleSubmit}>
              {/* <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter room name"
                required
                style={{ width: '100%', marginBottom: '10px' }}
              /> */}

              <input
  type="text"
  name="name"
  value={form.name}
  onChange={handleChange}
  placeholder="Enter room name"
  required
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #D8C3A5",
    borderRadius: "8px",
    background: "#FFFDF9",
    color: "#4A3426",
    fontSize: "14px",
  }}
/>

              {/* <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter description"
                required
                style={{ width: '100%', marginBottom: '10px' }}
              /> */}

<textarea
  name="description"
  value={form.description}
  onChange={handleChange}
  placeholder="Enter description"
  required
  style={{
    width: "100%",
    padding: "12px",
    minHeight: "120px",
    marginBottom: "15px",
    border: "1px solid #D8C3A5",
    borderRadius: "8px",
    background: "#FFFDF9",
    color: "#4A3426",
    fontSize: "14px",
  }}
/>

              {/* <button type="submit">Create Labour Room</button> */}


              <button
  type="submit"
  style={{
    width: "100%",
    padding: "12px",
    background: "#8B5E3C",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
  }}
>
  Create Labour Room
</button>



            </form>
          )}

          {/* ================= BULK UPLOAD ================= */}
          {mode === "bulk" && (
            // <div>

            <div
  style={{
    background: "#F7F3EE",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #E8DCCB",
  }}
>
              {/* <input
                type="file"
                accept=".xlsx, .xls"
                onChange={(e) => setFile(e.target.files[0])}
              /> */}


<input
  type="file"
  accept=".xlsx,.xls"
  onChange={(e) => setFile(e.target.files[0])}
  style={{
    width: "100%",
    padding: "10px",
    border: "1px solid #D8C3A5",
    borderRadius: "8px",
    background: "#FFFDF9",
  }}
/>


<button
  onClick={handleBulkUpload}
  style={{
    marginTop: "15px",
    width: "100%",
    padding: "12px",
    background: "#C89B3C",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  Upload Excel
</button>

              {/* <button onClick={handleBulkUpload} style={{ marginTop: '10px' }}>
                Upload Excel
              </button> */}

              {/* <p style={{ fontSize: '12px', marginTop: '10px' }}>
                ⚠️ Excel format:
                <br />
                <b>name | description</b>
              </p> */}


              <p
  style={{
    marginTop: "15px",
    color: "#6B4F3A",
    fontSize: "13px",
    textAlign: "center",
  }}
>
  Excel Format:
  <br />
  <strong>name | description</strong>
</p>
            </div>
          )}
        </>
      ) : (
        <>
          {/* <p style={{
            textAlign: 'center',
            color: message.toLowerCase().includes('success') ? 'green' : 'red'
          }}>
            {message}
          </p> */}


<p
  style={{
    textAlign: "center",
    fontWeight: "600",
    color: message.toLowerCase().includes("success")
      ? "#15803d"
      : "#dc2626",
    marginBottom: "20px",
  }}
>
  {message}
</p>

<button
  onClick={handleAddAnother}
  style={{
    width: "100%",
    padding: "12px",
    background: "#8B5E3C",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  }}
>
  + Add Another
</button>
          {/* <button onClick={handleAddAnother}>
            + Add Another
          </button> */}
        </>
      )}
    </div>
  );
};

export default AddLabour;