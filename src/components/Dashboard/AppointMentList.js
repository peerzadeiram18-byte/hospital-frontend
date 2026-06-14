// import React,
// {
// useEffect,
// useState
// } from "react";

// import axios from "axios";

// const AppointmentList = () => {

// const BASE_URL =
// process.env.REACT_APP_BASE_URL;

// const [appointments,
// setAppointments] =
// useState([]);

// useEffect(() => {

// fetchAppointments();

// }, []);
// const updateStatus = async (
//   id,
//   status
// ) => {

//   try {

//     const token =
//       localStorage.getItem("jwt");

//     await axios.put(
//       `${BASE_URL}/api/appointments/status/${id}`,
//       { status },
//       {
//         headers: {
//           Authorization:
//             `Bearer ${token}`
//         }
//       }
//     );

//     fetchAppointments();

//   } catch (err) {
//     console.log(err);
//   }
// };

// const fetchAppointments =
// async () => {

// try {

//   const token =
//     localStorage.getItem("jwt");

//   const res =
//     await axios.get(

//       `${BASE_URL}/api/appointments/all`,

//       {
//         headers: {
//           Authorization:
//             `Bearer ${token}`
//         }
//       }
//     );

//   setAppointments(
//     res.data.appointments || []
//   );

// } catch (err) {

//   console.log(err);
// }

// };

// return (

// <div>

//   <h2>
//     Appointment List
//   </h2>

//   <table border="1">

//     <thead>

//       <tr>

//         <th>Patient</th>
//         <th>Doctor</th>
//         <th>Date</th>
//         <th>Token</th>
//         <th>Status</th>
//         <th>Actions</th>


//       </tr>

//     </thead>

//     <tbody>

//       {
//         appointments.map((a) => (

//           <tr key={a._id}>

//             <td>
//               {a.patientId?.fullName}
//             </td>

//             <td>
//               {a.doctorId?.userId?.name}
//             </td>

//             <td>
//               {new Date(
//                 a.appointmentDate
//               ).toLocaleDateString()}
//             </td>

//             <td>
//               {a.tokenNumber}
//             </td>

//             <td>
//               {a.status}
//             </td>
//             <td>

//   {a.status === "Pending" && (
//     <button
//       onClick={() =>
//         updateStatus(
//           a._id,
//           "Confirmed"
//         )
//       }
//     >
//       Confirm
//     </button>
//   )}

//   {a.status === "Confirmed" && (
//     <button
//       onClick={() =>
//         updateStatus(
//           a._id,
//           "Arrived"
//         )
//       }
//     >
//       Patient Arrived
//     </button>
//   )}

// </td>

//           </tr>
//         ))
//       }

//     </tbody>

//   </table>

// </div>

// );
// };

// export default AppointmentList;



import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";
import {
  toast,
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./AppointmentList.css";

const AppointmentList = () => {

  const BASE_URL =
    process.env.REACT_APP_BASE_URL;

  const [appointments,
    setAppointments] =
    useState([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    fetchAppointments();

  }, []);

  const fetchAppointments =
    async () => {

      try {

        const token =
          localStorage.getItem("jwt");

        const res =
          await axios.get(

            `${BASE_URL}/api/appointments/all`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setAppointments(
          res.data.appointments || []
        );

      } catch (err) {

        console.log(err);

        toast.error(
          "Failed to load appointments"
        );

      } finally {

        setLoading(false);
      }
    };

  const updateStatus =
    async (
      id,
      status
    ) => {

      try {

        const token =
          localStorage.getItem("jwt");

        await axios.put(

          `${BASE_URL}/api/appointments/status/${id}`,

          { status },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

        toast.success(
          "Status Updated"
        );

        fetchAppointments();

      } catch (err) {

        console.log(err);

        toast.error(
          err.response?.data?.message ||
          "Update failed"
        );
      }
    };

  const getStatusClass =
    (status) => {

      switch (status) {

        case "Pending":
          return "pending";

        case "Confirmed":
          return "confirmed";

        case "Arrived":
          return "arrived";

        case "Completed":
          return "completed";

        default:
          return "";
      }
    };

  return (

    <div className="appointment-page">

      <ToastContainer />

      <div className="appointment-card">

        <div className="header">

          <h2>
            Appointment List
          </h2>

          <span>
            Total:
            {appointments.length}
          </span>

        </div>

        {
          loading ?

            <div className="loading">
              Loading...
            </div>

            :

            <div className="table-wrapper">

              <table>

                <thead>

                  <tr>

                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Date</th>
                    <th>Token</th>
                    <th>Status</th>
                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    appointments.length === 0 ?

                      <tr>

                        <td
                          colSpan="6"
                          className="no-data"
                        >
                          No Appointments
                        </td>

                      </tr>

                      :

                      appointments.map((a) => (

                        <tr key={a._id}>

                          <td>
                            {a.patientId?.fullName}
                          </td>

                          <td>
                            {a.doctorId?.userId?.name}
                          </td>

                          <td>
                            {
                              new Date(
                                a.appointmentDate
                              )
                                .toLocaleDateString()
                            }
                          </td>

                          <td>
                            #{a.tokenNumber}
                          </td>

                          <td>

                            <span
                              className={`status-badge ${getStatusClass(
                                a.status
                              )}`}
                            >
                              {a.status}
                            </span>

                          </td>

                          <td>

                            {
                              a.status ===
                              "Pending" && (

                                <button
                                  className="confirm-btn"
                                  onClick={() =>
                                    updateStatus(
                                      a._id,
                                      "Confirmed"
                                    )
                                  }
                                >
                                  Confirm
                                </button>
                              )
                            }

                            {
                              a.status ===
                              "Confirmed" && (

                                <button
                                  className="arrived-btn"
                                  onClick={() =>
                                    updateStatus(
                                      a._id,
                                      "Arrived"
                                    )
                                  }
                                >
                                  Arrived
                                </button>
                              )
                            }

                          </td>

                        </tr>
                      ))
                  }

                </tbody>

              </table>

            </div>
        }

      </div>

    </div>
  );
};

export default AppointmentList;