
// export default IPDAdmissionForm;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAdmissionAdvice } from "../../context/AdmissionAdviceContext";
import socket from "../../context/socket";

const IPDAdmissionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("jwt");
  const { adviceData } = useAdmissionAdvice();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const patient = location.state?.patient || null;
  const visit = location.state?.visit || null;

  const [patientId, setPatientId] = useState(
    adviceData?.patientDbId || patient?._id || ""
  );
  const [visitId, setVisitId] = useState(
    adviceData?.visitId || visit?._id || ""
  );
  const [admittingDoctorId, setAdmittingDoctorId] = useState(
    adviceData?.admittingDoctorId || visit?.assignedDoctorId || ""
  );

  const [patientName, setPatientName] = useState(
    adviceData?.patientName || patient?.name || visit?.patientName || ""
  );
  const [doctorName, setDoctorName] = useState(
    adviceData?.doctorName || visit?.doctorName || ""
  );

  const [wards, setWards] = useState([]);
  const [roomCategories, setRoomCategories] = useState([]);

  const [wardId, setWardId] = useState("");
  const [bedNumber, setBedNumber] = useState("");
  const [roomCategoryId, setRoomCategoryId] = useState("");
  const [expectedDischargeDate, setExpectedDischargeDate] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const printRef = useRef();

  // 🔄 FETCH DATA + SOCKET (KEEPING YOUR SOCKET)
  useEffect(() => {
    fetchWards();
    fetchRoomCategories();

    // socket.on("newIPDAdmissionAdvice", (data) => {
    //   console.log("🔥 FORM SOCKET RECEIVED:", data);

    //   toast.info(`Doctor advised admission for Patient`);

    //   setPatientId(data.patientDbId || "");
    //   setVisitId(data.visitId || "");
    //   setAdmittingDoctorId(data.admittingDoctorId || "");
    //   setPatientName(data.patientName || "");
    //   setDoctorName(data.doctorName || "");
    // });

    // return () => socket.off("newIPDAdmissionAdvice");
  }, []);

  // ✅ CONTEXT SYNC (MOST IMPORTANT)
  useEffect(() => {
    if (adviceData) {
      console.log("✅ Context data applied:", adviceData);

      setPatientId(adviceData.patientDbId || "");
      setVisitId(adviceData.visitId || "");
      setAdmittingDoctorId(adviceData.admittingDoctorId || "");
      setPatientName(adviceData.patientName || "");
      setDoctorName(adviceData.doctorName || "");
    }
  }, [adviceData]);

  const fetchWards = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/receptionist/wards`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWards(res.data.wards || []);
    } catch {
      toast.error("Failed to load wards");
    }
  };

  const fetchRoomCategories = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/receptionist/room-categories`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRoomCategories(res.data.roomCategories || []);
    } catch {
      toast.error("Failed to load room categories");
    }
  };

  // ✔ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !patientId ||
      !visitId ||
      !wardId ||
      !bedNumber ||
      !roomCategoryId ||
      !admittingDoctorId
    ) {
      return toast.error("All required fields must be filled.");
    }

    const payload = {
      patientId,
      visitId,
      wardId,
      bedNumber,
      roomCategoryId,
      admittingDoctorId,
      expectedDischargeDate,
    };

    try {
      await axios.post(`${BASE_URL}/api/ipd/admissions`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("IPD Admission successful!");
      setSubmitted(true);
      fetchWards();

      navigate(`/receptionist-dashboard/IPDAdmissionList/${patientId}`, {
        state: { patientName },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Admission failed");
    }
  };

  const selectedWard = wards.find((w) => w._id === wardId);

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <ToastContainer />

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          style={{ padding: "2rem", border: "1px solid #ccc", borderRadius: 8 }}
        >
          <h2>IPD Admission</h2>

          <label>Patient</label>
          <input readOnly value={patientName} />

          <label>Doctor</label>
          <input readOnly value={doctorName} />

          <label>Ward</label>
          <select
            value={wardId}
            onChange={(e) => {
              setWardId(e.target.value);
              setBedNumber("");
            }}
          >
            <option value="">Select Ward</option>
            {wards.map((w) => (
              <option key={w._id} value={w._id}>
                {w.name}
              </option>
            ))}
          </select>

          <label>Bed Number</label>
          <select
            value={bedNumber}
            onChange={(e) => setBedNumber(e.target.value)}
            disabled={!wardId}
          >
            <option value="">Select a bed</option>

            {selectedWard?.beds?.map((b) => (
              <option
                key={b.bedNumber}
                value={b.bedNumber}
                disabled={b.status !== "available"}
              >
                Bed {b.bedNumber} — {b.status}
              </option>
            ))}

            {!selectedWard?.beds?.length && (
              <option disabled>No beds found</option>
            )}
          </select>

          <label>Room Category</label>
          <select
            value={roomCategoryId}
            onChange={(e) => setRoomCategoryId(e.target.value)}
          >
            <option value="">Select category</option>
            {roomCategories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <label>Expected Discharge Date</label>
          <input
            type="date"
            value={expectedDischargeDate}
            onChange={(e) => setExpectedDischargeDate(e.target.value)}
          />

          <button type="submit" style={{ marginTop: "1rem" }}>
            Admit
          </button>
        </form>
      ) : (
        <h3>Admission Completed Successfully 🎉</h3>
      )}
    </div>
  );
};

export default IPDAdmissionForm;