import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";
import { toast } from "react-toastify";

const PendingTests = () => {

  const [tests, setTests] = useState([]);

  const BASE_URL =
    process.env.REACT_APP_BASE_URL;

  const fetchTests = async () => {

    try {

      const token =
        localStorage.getItem("jwt");

      const res = await axios.get(
        `${BASE_URL}/api/lab/pending-tests`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTests(res.data.tests || []);

    } catch (err) {

      console.log(err);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const collectSample = async (id) => {

    try {

      const token =
        localStorage.getItem("jwt");

      await axios.put(
        `${BASE_URL}/api/lab/collect-sample/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(
        "Sample collected"
      );

      fetchTests();

    } catch (err) {

      toast.error("Failed");
    }
  };

  const startProcessing = async (id) => {

    try {

      const token =
        localStorage.getItem("jwt");

      await axios.put(
        `${BASE_URL}/api/lab/start-processing/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success(
        "Processing started"
      );

      fetchTests();

    } catch (err) {

      toast.error("Failed");
    }
  };

  return (
    <div className="container">

      <h2>
        Pending Lab Tests
      </h2>

      <table>

        <thead>

          <tr>

            <th>Patient</th>
            <th>Test</th>
            <th>Status</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {tests.map((t) => (

            <tr key={t._id}>

              <td>
                {t.patientId?.fullName}
              </td>

              <td>{t.testType}</td>

              <td>{t.status}</td>

              <td>

                {!t.sampleCollected && (

                  <button
                    onClick={() =>
                      collectSample(t._id)
                    }
                  >
                    Collect Sample
                  </button>

                )}

                {t.status ===
                  "Sample Collected" && (

                  <button
                    onClick={() =>
                      startProcessing(
                        t._id
                      )
                    }
                  >
                    Start Processing
                  </button>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default PendingTests;