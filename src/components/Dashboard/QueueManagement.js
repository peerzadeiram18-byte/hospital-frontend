import React,
{
useEffect,
useState
} from "react";

import axios from "axios";

import {
toast
} from "react-toastify";

const QueueManagement = () => {

const BASE_URL =
process.env.REACT_APP_BASE_URL;

const [appointments,
setAppointments] =
useState([]);

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

      `${BASE_URL}/api/appointments`,

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
}


};

const updateStatus =
async (id, status) => {


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
    "Appointment updated"
  );

  fetchAppointments();

} catch (err) {

  toast.error("Failed");
}


};

return (


<div>

  <h2>
    Queue Management
  </h2>

  <table border="1">

    <thead>

      <tr>

        <th>Token</th>
        <th>Patient</th>
        <th>Doctor</th>
        <th>Status</th>
        <th>Action</th>

      </tr>

    </thead>

    <tbody>

      {
        appointments.map((a) => (

          <tr key={a._id}>

            <td>
              {a.tokenNumber}
            </td>

            <td>
              {a.patientId?.fullName}
            </td>

            <td>
              {a.doctorId?.userId?.name}
            </td>

            <td>
              {a.status}
            </td>

            <td>

              {
                a.status ===
                "Pending" && (

                  <button
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
                    onClick={() =>
                      updateStatus(
                        a._id,
                        "Completed"
                      )
                    }
                  >
                    Complete
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


);
};

export default QueueManagement;
