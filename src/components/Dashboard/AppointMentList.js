import React,
{
useEffect,
useState
} from "react";

import axios from "axios";

const AppointmentList = () => {

const BASE_URL =
process.env.REACT_APP_BASE_URL;

const [appointments,
setAppointments] =
useState([]);

useEffect(() => {

fetchAppointments();

}, []);
const updateStatus = async (
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

    fetchAppointments();

  } catch (err) {
    console.log(err);
  }
};

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
}

};

return (

<div>

  <h2>
    Appointment List
  </h2>

  <table border="1">

    <thead>

      <tr>

        <th>Patient</th>
        <th>Doctor</th>
        <th>Date</th>
        <th>Token</th>
        <th>Status</th>
        <th>Actions</th>


      </tr>

    </thead>

    <tbody>

      {
        appointments.map((a) => (

          <tr key={a._id}>

            <td>
              {a.patientId?.fullName}
            </td>

            <td>
              {a.doctorId?.userId?.name}
            </td>

            <td>
              {new Date(
                a.appointmentDate
              ).toLocaleDateString()}
            </td>

            <td>
              {a.tokenNumber}
            </td>

            <td>
              {a.status}
            </td>
            <td>

  {a.status === "Pending" && (
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
  )}

  {a.status === "Confirmed" && (
    <button
      onClick={() =>
        updateStatus(
          a._id,
          "Arrived"
        )
      }
    >
      Patient Arrived
    </button>
  )}

</td>

          </tr>
        ))
      }

    </tbody>

  </table>

</div>

);
};

export default AppointmentList;
