// import React, {
// useState,
// useEffect
// } from "react";

// import axios from "axios";

// import {
// toast,
// ToastContainer
// } from "react-toastify";

// const AppointmentForm = () => {

// const BASE_URL =
// process.env.REACT_APP_BASE_URL;

// const [form, setForm] =
// useState({

//   fullName: "",
//   age: "",
//   gender: "",
//   contactNumber: "",
//   address: "",

//   specialtyId: "",
//   doctorId: "",

//   appointmentDate: "",
//   slotTime: ""

// });


// const [specialties, setSpecialties] =
// useState([]);

// const [doctors, setDoctors] =
// useState([]);

// const [existingPatients,
// setExistingPatients] =
// useState([]);

// const [selectedPatient,
// setSelectedPatient] =
// useState(null);

// const [searchTerm,
// setSearchTerm] =
// useState("");

// // FETCH SPECIALTIES
// useEffect(() => {


// fetchSpecialties();

// }, []);

// const fetchSpecialties =
// async () => {


// try {

//   const token =
//     localStorage.getItem("jwt");

//   const res =
//     await axios.get(

//       `${BASE_URL}/api/receptionist/specialties`,

//       {
//         headers: {
//           Authorization:
//             `Bearer ${token}`
//         }
//       }
//     );

//   setSpecialties(
//     res.data.specialties || []
//   );

// } catch (err) {

//   console.log(err);
// }


// };

// // SEARCH PATIENT
// const searchPatients =
// async (value) => {


// setSearchTerm(value);

// if (!value) {
//   setExistingPatients([]);
//   return;
// }

// try {

//   const token =
//     localStorage.getItem("jwt");

//   const res =
//     await axios.get(

//       `${BASE_URL}/api/receptionist/patients/search?query=${value}`,

//       {
//         headers: {
//           Authorization:
//             `Bearer ${token}`
//         }
//       }
//     );

//   setExistingPatients(
//     res.data.patients || []
//   );

// } catch (err) {

//   console.log(err);
// }


// };

// // FETCH DOCTORS
// const fetchDoctors =
// async (specialtyId) => {


// setForm((p) => ({
//   ...p,
//   specialtyId,
//   doctorId: ""
// }));

// try {

//   const token =
//     localStorage.getItem("jwt");

//   const res =
//     await axios.post(

//       `${BASE_URL}/api/receptionist/doctors`,

//       {
//         specialtyId
//       },

//       {
//         headers: {
//           Authorization:
//             `Bearer ${token}`
//         }
//       }
//     );

//   setDoctors(
//     res.data.doctors || []
//   );

// } catch (err) {

//   console.log(err);
// }

// };

// // CHANGE
// const handleChange =
// (e) => {

// const {
//   name,
//   value
// } = e.target;

// setForm((p) => ({
//   ...p,
//   [name]: value
// }));

// };

// // SUBMIT
// const handleSubmit =
// async (e) => {

// e.preventDefault();

// try {

//   const token =
//     localStorage.getItem("jwt");

//   const payload = {

//     existingPatientId:
//       selectedPatient?._id,

//     ...form
//   };

//   await axios.post(

//     `${BASE_URL}/api/appointments/create`,

//     payload,

//     {
//       headers: {
//         Authorization:
//           `Bearer ${token}`
//       }
//     }
//   );

//   toast.success(
//     "Appointment booked"
//   );

//   setForm({

//     fullName: "",
//     age: "",
//     gender: "",
//     contactNumber: "",
//     address: "",

//     specialtyId: "",
//     doctorId: "",

//     appointmentDate: "",
//     slotTime: ""

//   });

// } catch (err) {

//   toast.error(
//     err.response?.data?.message
//   );
// }

// };

// return (

// <div className="container">

//   <h2>
//     Appointment Booking
//   </h2>

//   <form onSubmit={handleSubmit}>

//     <input
//       type="text"
//       placeholder="Search Patient"
//       value={searchTerm}
//       onChange={(e) =>
//         searchPatients(e.target.value)
//       }
//     />

//     {
//       existingPatients.map((p) => (

//         <div
//           key={p._id}

//           onClick={() => {

//             setSelectedPatient(p);

//             setForm((prev) => ({
//               ...prev,

//               fullName:
//                 p.fullName,

//               age:
//                 p.age,

//               gender:
//                 p.gender,

//               contactNumber:
//                 p.contactNumber,

//               address:
//                 p.address
//             }));

//             setExistingPatients([]);
//           }}
//         >

//           {p.fullName}
//           ({p.patientId})

//         </div>
//       ))
//     }

//     <input
//       name="fullName"
//       placeholder="Full Name"
//       value={form.fullName}
//       onChange={handleChange}
//     />

//     <input
//       name="age"
//       placeholder="Age"
//       value={form.age}
//       onChange={handleChange}
//     />

//     <select
//       name="gender"
//       value={form.gender}
//       onChange={handleChange}
//     >

//       <option value="">
//         Gender
//       </option>

//       <option>
//         Male
//       </option>

//       <option>
//         Female
//       </option>

//     </select>

//     <input
//       name="contactNumber"
//       placeholder="Contact"
//       value={form.contactNumber}
//       onChange={handleChange}
//     />

//     <input
//       name="address"
//       placeholder="Address"
//       value={form.address}
//       onChange={handleChange}
//     />

//     <select
//       value={form.specialtyId}
//       onChange={(e) =>
//         fetchDoctors(
//           e.target.value
//         )
//       }
//     >

//       <option value="">
//         Select Specialty
//       </option>

//       {
//         specialties.map((sp) => (

//           <option
//             key={sp._id}
//             value={sp._id}
//           >
//             {sp.name}
//           </option>
//         ))
//       }

//     </select>

//     <select
//       name="doctorId"
//       value={form.doctorId}
//       onChange={handleChange}
//     >

//       <option value="">
//         Select Doctor
//       </option>

//       {
//         doctors.map((doc) => (

//           <option
//             key={doc._id}
//             value={doc._id}
//           >
//             {doc.userId?.name}
//           </option>
//         ))
//       }

//     </select>

//     <input
//       type="date"
//       name="appointmentDate"
//       value={form.appointmentDate}
//       onChange={handleChange}
//     />

//     <input
//       type="time"
//       name="slotTime"
//       value={form.slotTime}
//       onChange={handleChange}
//     />

//     <button type="submit">
//       Book Appointment
//     </button>

//   </form>

//   <ToastContainer />

// </div>

// );
// };

// export default AppointmentForm;


import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  toast,
  ToastContainer
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AppointmentForm.css";

const AppointmentForm = () => {

  const BASE_URL =
    process.env.REACT_APP_BASE_URL;

  const [form, setForm] =
    useState({
      fullName: "",
      age: "",
      gender: "",
      contactNumber: "",
      address: "",
      specialtyId: "",
      doctorId: "",
      appointmentDate: "",
      slotTime: ""
    });

  const [specialties,
    setSpecialties] = useState([]);

  const [doctors,
    setDoctors] = useState([]);

  const [existingPatients,
    setExistingPatients] =
    useState([]);

  const [selectedPatient,
    setSelectedPatient] =
    useState(null);

  const [searchTerm,
    setSearchTerm] =
    useState("");

  useEffect(() => {
    fetchSpecialties();
  }, []);

  // FETCH SPECIALTY
  const fetchSpecialties =
    async () => {
      try {

        const token =
          localStorage.getItem("jwt");

        const res =
          await axios.get(
            `${BASE_URL}/api/receptionist/specialties`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setSpecialties(
          res.data.specialties || []
        );

      } catch (err) {
        console.log(err);
      }
    };

  // SEARCH PATIENT
  const searchPatients =
    async (value) => {

      setSearchTerm(value);

      if (!value) {
        setExistingPatients([]);
        return;
      }

      try {

        const token =
          localStorage.getItem("jwt");

        const res =
          await axios.get(
            `${BASE_URL}/api/receptionist/patients/search?query=${value}`,
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setExistingPatients(
          res.data.patients || []
        );

      } catch (err) {
        console.log(err);
      }
    };

  // FETCH DOCTORS
  const fetchDoctors =
    async (specialtyId) => {

      setForm((p) => ({
        ...p,
        specialtyId,
        doctorId: ""
      }));

      try {

        const token =
          localStorage.getItem("jwt");

        // const res =
        //   await axios.post(
        //     `${BASE_URL}/api/receptionist/doctors`,
        //     {
        //       specialtyId
        //     },
        //     {
        //       headers: {
        //         Authorization:
        //           `Bearer ${token}`
        //       }
        //     }
        //   );




        const res =
  await axios.get(

    `${BASE_URL}/api/doctor/by-specialty/${specialtyId}`,

    {
      headers: {
        Authorization:
          `Bearer ${token}`
      }
    }
  );



  
        setDoctors(
          res.data.doctors || []
        );

      } catch (err) {
        console.log(err);
      }
    };

  const handleChange =
    (e) => {

      const {
        name,
        value
      } = e.target;

      setForm((p) => ({
        ...p,
        [name]: value
      }));
    };

  // SUBMIT
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem("jwt");

        const payload = {
          existingPatientId:
            selectedPatient?._id,
          ...form
        };

        await axios.post(
          `${BASE_URL}/api/appointments/create`,
          payload,
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        toast.success(
          "Appointment Booked Successfully"
        );

        setForm({
          fullName: "",
          age: "",
          gender: "",
          contactNumber: "",
          address: "",
          specialtyId: "",
          doctorId: "",
          appointmentDate: "",
          slotTime: ""
        });

        setSearchTerm("");
        setSelectedPatient(null);

      } catch (err) {

        toast.error(
          err.response?.data?.message ||
          "Booking failed"
        );
      }
    };

  return (

    <div className="appointment-page">

      <div className="appointment-card">

        <h2>
          Appointment Booking
        </h2>

        <form
          onSubmit={handleSubmit}
          className="appointment-form"
        >

          {/* Search */}
          <div className="full-width">

            <input
              type="text"
              placeholder="Search Patient / ID / Contact"
              value={searchTerm}
              onChange={(e) =>
                searchPatients(
                  e.target.value
                )
              }
            />

            {
              existingPatients.length >
              0 && (

                <div className="patient-dropdown">

                  {
                    existingPatients.map(
                      (p) => (

                        <div
                          key={p._id}
                          className="patient-item"
                          onClick={() => {

                            setSelectedPatient(p);

                            setForm(
                              (prev) => ({
                                ...prev,
                                fullName:
                                  p.fullName,
                                age:
                                  p.age,
                                gender:
                                  p.gender,
                                contactNumber:
                                  p.contactNumber,
                                address:
                                  p.address
                              })
                            );

                            setExistingPatients([]);
                            setSearchTerm(
                              p.fullName
                            );
                          }}
                        >

                          <strong>
                            {p.fullName}
                          </strong>

                          <br />

                          {p.patientId}

                        </div>
                      )
                    )
                  }

                </div>
              )
            }

          </div>

          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />

          <input
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">
              Gender
            </option>
            <option value="Male">
              Male
            </option>
            <option value="Female">
              Female
            </option>
          </select>

          <input
            name="contactNumber"
            placeholder="Contact"
            value={form.contactNumber}
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <select
            value={form.specialtyId}
            onChange={(e) =>
              fetchDoctors(
                e.target.value
              )
            }
          >
            <option value="">
              Select Specialty
            </option>

            {
              specialties.map(
                (sp) => (
                  <option
                    key={sp._id}
                    value={sp._id}
                  >
                    {sp.name}
                  </option>
                )
              )
            }
          </select>

          <select
            name="doctorId"
            value={form.doctorId}
            onChange={handleChange}
          >
            <option value="">
              Select Doctor
            </option>

            {
              doctors.map(
                (doc) => (
                  <option
                    key={doc._id}
                    value={doc._id}
                  >
                    {doc.userId?.name}
                  </option>
                )
              )
            }
          </select>

          <input
            type="date"
            name="appointmentDate"
            value={form.appointmentDate}
            onChange={handleChange}
          />

          <input
            type="time"
            name="slotTime"
            value={form.slotTime}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="book-btn"
          >
            Book Appointment
          </button>

        </form>

      </div>

      <ToastContainer />

    </div>
  );
};

export default AppointmentForm;