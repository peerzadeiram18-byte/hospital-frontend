// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AddReferralPartner = () => {
//   const [form, setForm] = useState({ name: '', contactNumber: '' });
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState('');
//   const [showReferralForm, setShowReferralForm] = useState(true);

//   // 🔥 NEW STATES FOR BULK UPLOAD
//   const [bulkFile, setBulkFile] = useState(null);
//   const [bulkMessage, setBulkMessage] = useState('');

//   const BASE_URL = process.env.REACT_APP_BASE_URL;

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: '' });
//   };

//   // ================== SINGLE ADD ==================
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setMessage('');

//     const newErrors = {};
//     if (!form.contactNumber.match(/^\d{10}$/)) {
//       newErrors.contactNumber = 'Contact number must be exactly 10 digits.';
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       toast.error('Please correct the errors before submitting.');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('jwt');

//       const res = await axios.post(
//         `${BASE_URL}/api/admin/referral-partners`,
//         form,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       setMessage(res.data.message);
//       setForm({ name: '', contactNumber: '' });
//       setShowReferralForm(false);

//     } catch (err) {
//       const backendErrors = err.response?.data?.errors || {};
//       const fallback = err.response?.data?.message || 'Something went wrong';
//       setErrors(backendErrors);
//       if (!Object.keys(backendErrors).length) setMessage(fallback);
//     }
//   };

//   // ================== BULK FILE SELECT ==================
//   const handleFileChange = (e) => {
//     setBulkFile(e.target.files[0]);
//     setBulkMessage('');
//   };

//   // ================== BULK UPLOAD ==================
//   const handleBulkUpload = async () => {
//     if (!bulkFile) {
//       toast.error("Please select a file");
//       return;
//     }

//     try {
//       const token = localStorage.getItem('jwt');
//       const formData = new FormData();
//       formData.append('file', bulkFile);

//       const res = await axios.post(
//         `${BASE_URL}/api/admin/referral/bulk`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'multipart/form-data'
//           }
//         }
//       );

//       setBulkMessage(res.data.message);
//       setBulkFile(null);
//       toast.success("Bulk upload successful");

//     } catch (err) {
//       console.error(err);
//       setBulkMessage(err.response?.data?.message || "Upload failed");
//       toast.error("Bulk upload failed");
//     }
//   };

//   const toggleReferralForm = () => {
//     setShowReferralForm(prev => !prev);
//     setMessage('');
//     setErrors({});
//   };

//   return (
//     <div style={{
//       maxWidth: '600px',
//       margin: '40px auto',
//       padding: '20px',
//       background: '#fff',
//       borderRadius: '8px',
//       boxShadow: '0 0 10px rgba(0,0,0,0.1)'
//     }}>

//       <h2 style={{ textAlign: 'center' }}>Add Referral Partner</h2>

//       {/* ================= BULK UPLOAD SECTION ================= */}
//       <div style={{
//         marginBottom: '30px',
//         padding: '15px',
//         border: '1px dashed #ccc',
//         borderRadius: '8px'
//       }}>
//         <h4>Bulk Upload (Excel)</h4>

//         <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileChange} />

//         <button
//           onClick={handleBulkUpload}
//           style={{
//             marginTop: '10px',
//             padding: '8px 15px',
//             backgroundColor: '#28a745',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer'
//           }}
//         >
//           Upload File
//         </button>

//         {bulkMessage && (
//           <p style={{
//             marginTop: '10px',
//             color: bulkMessage.toLowerCase().includes('success') ? 'green' : 'red'
//           }}>
//             {bulkMessage}
//           </p>
//         )}

//         <p style={{ fontSize: '12px', marginTop: '10px' }}>
//           Excel format: <br />
//           <b>name | contactNumber</b>
//         </p>
//       </div>

//       {/* ================= MANUAL FORM ================= */}
//       {!showReferralForm ? (
//         <>
//           {message && (
//             <p style={{
//               textAlign: 'center',
//               color: message.toLowerCase().includes('success') ? 'green' : 'red',
//               fontWeight: 'bold'
//             }}>
//               {message}
//             </p>
//           )}

//           <div style={{ textAlign: 'center', marginTop: '15px' }}>
//             <button onClick={toggleReferralForm} style={{
//               padding: '10px 20px',
//               backgroundColor: '#3498db',
//               color: '#fff',
//               border: 'none',
//               borderRadius: '6px',
//               cursor: 'pointer'
//             }}>
//               + Add Another
//             </button>
//           </div>
//         </>
//       ) : (
//         <form onSubmit={handleSubmit}>

//           <div style={{ marginBottom: '15px' }}>
//             <label>Name</label><br />
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               style={{ width: '100%', padding: '10px' }}
//             />
//             {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
//           </div>

//           <div style={{ marginBottom: '15px' }}>
//             <label>Contact Number</label><br />
//             <input
//               type="text"
//               name="contactNumber"
//               value={form.contactNumber}
//               onChange={handleChange}
//               style={{ width: '100%', padding: '10px' }}
//             />
//             {errors.contactNumber && <div style={{ color: 'red' }}>{errors.contactNumber}</div>}
//           </div>

//           <button type="submit" style={{
//             width: '100%',
//             padding: '12px',
//             backgroundColor: '#007bff',
//             color: '#fff',
//             border: 'none',
//             borderRadius: '5px'
//           }}>
//             Submit
//           </button>

//         </form>
//       )}

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default AddReferralPartner;

import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddReferralPartner.css';

const AddReferralPartner = () => {
  const [form, setForm] = useState({ name: '', contactNumber: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('single');

  const [bulkFile, setBulkFile] = useState(null);
  const [bulkMessage, setBulkMessage] = useState('');

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // ============ SINGLE SUBMIT ============
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage('');

    const newErrors = {};
    if (!form.contactNumber.match(/^\d{10}$/)) {
      newErrors.contactNumber = 'Contact number must be 10 digits';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error('Fix errors first');
      return;
    }

    try {
      const token = localStorage.getItem('jwt');

      const res = await axios.post(
        `${BASE_URL}/api/admin/referral-partners`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setMessage(res.data.message);
      setForm({ name: '', contactNumber: '' });
      toast.success('Saved successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error occurred');
    }
  };

  // ============ BULK ============
  const handleBulkUpload = async () => {
    if (!bulkFile) return toast.error('Select file first');

    try {
      const token = localStorage.getItem('jwt');

      const formData = new FormData();
      formData.append('file', bulkFile);

      const res = await axios.post(
        `${BASE_URL}/api/admin/referral/bulk`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setBulkMessage(res.data.message);
      setBulkFile(null);
      toast.success('Bulk upload done');
    } catch (err) {
      toast.error('Bulk upload failed');
    }
  };

  return (
    <div className="ref-container">

      <div className="ref-card">

        <h2 className="ref-title">Referral Partner</h2>

        {/* Tabs */}
        <div className="ref-tabs">
          <button
            className={activeTab === 'single' ? 'active' : ''}
            onClick={() => setActiveTab('single')}
          >
            Single Add
          </button>

          <button
            className={activeTab === 'bulk' ? 'active' : ''}
            onClick={() => setActiveTab('bulk')}
          >
            Bulk Upload
          </button>
        </div>

        {/* ============ BULK ============ */}
        {activeTab === 'bulk' && (
          <div className="ref-section">
            <h4>Upload Excel File</h4>

            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => setBulkFile(e.target.files[0])}
            />

            <button className="btn success" onClick={handleBulkUpload}>
              Upload
            </button>

            {bulkMessage && <p className="msg">{bulkMessage}</p>}

            <p className="hint">Columns: name | contactNumber</p>
          </div>
        )}

        {/* ============ SINGLE ============ */}
        {activeTab === 'single' && (
          <form onSubmit={handleSubmit} className="ref-form">

            <div className="input-group">
              <label>Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </div>

            <div className="input-group">
              <label>Contact Number</label>
              <input
                name="contactNumber"
                value={form.contactNumber}
                onChange={handleChange}
                placeholder="10 digit number"
              />
              {errors.contactNumber && (
                <span className="error">{errors.contactNumber}</span>
              )}
            </div>

            <button type="submit" className="btn primary">
              Submit
            </button>

            {message && <p className="msg">{message}</p>}
          </form>
        )}

      </div>

      <ToastContainer />
    </div>
  );
};

export default AddReferralPartner;