
// OPDReportPage.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './OPDReportPage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OPDReportPage = () => {
  const printRef = useRef();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);

  const [centralData, setCentralData] = useState([]);
  const [departmentWiseData, setDepartmentWiseData] = useState({});
  const [doctorWiseData, setDoctorWiseData] = useState([]);
  const [newVsOldData, setNewVsOldData] = useState(null);
  const [sonographyData, setSonographyData] = useState([]);


  const [billingSummary, setBillingSummary] =
  useState(null);

const [paymentRecon, setPaymentRecon] =
  useState(null);



  const [reportType, setReportType] = useState('all');
  const [hasFetched, setHasFetched] = useState(false);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('jwt');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/admin/departments`,
        { headers }
      );

      setDepartments(res.data.departments || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchReports = async () => {
    if (!startDate || !endDate) {
      toast.warning('Please select dates');
      return;
    }

    try {
      setHasFetched(false);

      const params = {
        startDate,
        endDate,
        billType: 'OPD'

      };

      if (departmentId) {
        params.departmentId = departmentId;
      }

      // CENTRAL
      if (reportType === 'central' || reportType === 'all') {
        const res = await axios.get(
          `${BASE_URL}/api/reports/opd-register`,
          { params, headers }
        );

        setCentralData(res.data.consultations || []);
      }

      // DEPARTMENT
      if (reportType === 'department' || reportType === 'all') {
        const res = await axios.get(
          `${BASE_URL}/api/reports/opd-register/department-wise`,
          { params, headers }
        );

        setDepartmentWiseData(
          res.data.specialtyWiseRegister || {}
        );
      }

      // DOCTOR
      if (reportType === 'doctor' || reportType === 'all') {
        const res = await axios.get(
          `${BASE_URL}/api/reports/opd-register/doctor-wise`,
          { params, headers }
        );

        setDoctorWiseData(res.data || []);
      }

      // NEW VS OLD
      if (reportType === 'newold' || reportType === 'all') {
        const res = await axios.get(
          `${BASE_URL}/api/reports/opd-register/new-vs-old`,
          { params, headers }
        );

        setNewVsOldData(res.data || null);
      }

      // SONOGRAPHY
      if (reportType === 'sonography' || reportType === 'all') {
        const res = await axios.get(
          `${BASE_URL}/api/reports/sonography-report`,
          { params, headers }
        );

        setSonographyData(res.data || []);
      }


       //Billing Summary

      if (
  reportType === 'billing' ||
  reportType === 'all'
) {
  const res = await axios.get(
    `${BASE_URL}/api/reports/billing-summary`,
    {
      params,
      headers
    }
  );

  setBillingSummary(
    res.data || null
  );
}


    //Payment Reconciliation

if (
  reportType === 'payment' ||
  reportType === 'all'
) {
  const res = await axios.get(
    `${BASE_URL}/api/reports/payment-reconciliation`,
    {
      params,
      headers
    }
  );

  setPaymentRecon(
    res.data || null
  );
}







      setHasFetched(true);

      toast.success('Reports fetched successfully');
    } catch (error) {
      console.log(error);
      toast.error('Error fetching reports');
    }
  };

  // PRINT ALL REPORTS
  // const handlePrint = () => {
  //   const printContents = printRef.current.innerHTML;
  //   const win = window.open('', '', 'width=1200,height=800');

  //   win.document.write(`
  //     <html>
  //       <head>
  //         <title>OPD Reports</title>

  //         <style>
  //           body{
  //             font-family: Arial;
  //             padding:20px;
  //           }

  //           h2,h3,h4{
  //             margin-top:25px;
  //           }

  //           table{
  //             width:100%;
  //             border-collapse: collapse;
  //             margin-top:10px;
  //             margin-bottom:30px;
  //           }

  //           th,td{
  //             border:1px solid #000;
  //             padding:8px;
  //             font-size:12px;
  //             text-align:left;
  //           }

  //           th{
  //             background:#f2f2f2;
  //           }
  //         </style>
  //       </head>

  //       <body>
  //         ${printContents}
  //       </body>
  //     </html>
  //   `);

  //   win.document.close();
  //   win.focus();
  //   win.print();
  //   win.close();
  // };



  const handlePrint = () => {
  const printContents = printRef.current.innerHTML;

  const win = window.open('', '', 'width=1200,height=800');

  win.document.write(`
    <html>
      <head>
        <title>OPD Reports</title>

        <style>
          body{
            font-family: Arial, sans-serif;
            padding:20px;
            color:#000;
          }

          .report-container{
            width:100%;
          }

          .header{
            text-align:center;
            border-bottom:3px solid #000;
            padding-bottom:10px;
            margin-bottom:15px;
          }

          .hospital-title{
            font-size:22px;
            font-weight:bold;
          }

          .hospital-sub{
            font-size:13px;
            margin-top:4px;
          }

          .report-title{
            font-size:18px;
            margin-top:8px;
            font-weight:bold;
          }

          .date-row{
            display:flex;
            justify-content:space-between;
            margin:15px 0;
            font-size:14px;
          }

          h2,h3,h4{
            margin-top:20px;
            margin-bottom:8px;
          }

          table{
            width:100%;
            border-collapse:collapse;
            margin-top:10px;
            margin-bottom:25px;
          }

          th,td{
            border:1px solid #000;
            padding:8px;
            font-size:12px;
            text-align:left;
          }

          th{
            background:#eee;
            font-weight:bold;
          }

          .footer{
            margin-top:40px;
            display:flex;
            justify-content:space-between;
          }

          @page{
            size:A4;
            margin:15mm;
          }

          @media print{
            body{
              margin:0;
            }
          }
        </style>
      </head>

      <body>

        <div class="report-container">

          <div class="header">

            <div class="hospital-title">
              Dr. M.I. Jamkhanawala Tibbia Medical College
            </div>

            <div class="hospital-sub">
              Haji Abdul Razzak Kalsekar Tibbia Hospital
            </div>

            <div class="hospital-sub">
              Anjuman-I-Islam Complex, Versova, Mumbai
            </div>

            <div class="report-title">
              OPD REPORT
            </div>
          </div>

          <div class="date-row">
            <div>
              <b>From:</b> ${startDate}
            </div>

            <div>
              <b>To:</b> ${endDate}
            </div>

            <div>
              <b>Printed:</b>
              ${new Date().toLocaleString()}
            </div>
          </div>

          ${printContents}

          <div class="footer">

            <div>
              Generated by Hospital System
            </div>

            <div>
              __________________<br/>
              Authorized Sign
            </div>

          </div>

        </div>

      </body>

      <script>
        window.onload=function(){
          window.print();
          window.close();
        }
      </script>

    </html>
  `);

  win.document.close();
};
  return (
    <div className="opd-report-container">

      <h2 className="main-heading">
        📋 OPD Report Dashboard
      </h2>

      {/* FILTERS */}

      <div className="opd-form-grid">

        <label className="opd-form-label">
          Start Date

          <input
            type="date"
            className="opd-form-input"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
          />
        </label>

        <label className="opd-form-label">
          End Date

          <input
            type="date"
            className="opd-form-input"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
          />
        </label>

        <label className="opd-form-label">
          Department

          <select
            className="opd-form-input"
            value={departmentId}
            onChange={(e) =>
              setDepartmentId(e.target.value)
            }
          >
            <option value="">All</option>

            {departments.map((dep) => (
              <option
                key={dep._id}
                value={dep._id}
              >
                {dep.name}
              </option>
            ))}
          </select>
        </label>

        <label className="opd-form-label">
          Report Type

          <select
            className="opd-form-input"
            value={reportType}
            onChange={(e) =>
              setReportType(e.target.value)
            }
          >
            <option value="all">
              All Reports
            </option>

            <option value="central">
              Central OPD
            </option>

            <option value="department">
              Department Wise
            </option>

            <option value="doctor">
              Doctor Wise
            </option>

            <option value="newold">
              New Vs Old
            </option>

            <option value="sonography">
              Sonography
            </option>


            <option value="billing">
  Billing Summary
</option>

<option value="payment">
  Payment Reconciliation
</option>
          </select>
        </label>

      </div>

      {/* BUTTONS */}

      <div className="button-row">

        <button
          className="fetch-btn"
          onClick={handleFetchReports}
        >
          Fetch Reports
        </button>

        {hasFetched && (
          <button
            className="print-btn"
            onClick={handlePrint}
          >
            🖨 Print Reports
          </button>
        )}
      </div>

      {/* REPORT AREA */}

      <div ref={printRef}>

        {/* CENTRAL */}

        {(reportType === 'central' ||
          reportType === 'all') &&
          hasFetched && (
            <>
              <h3>
                Central OPD Register
              </h3>
<div className="table-wrapper">

              <table className="opd-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Department</th>
                    <th>Diagnosis</th>
                    <th>Payment</th>
                  </tr>
                </thead>

                <tbody>
                  {centralData.length === 0 ? (
                    <tr>
                      <td colSpan="6">
                        No data found
                      </td>
                    </tr>
                  ) : (
                    centralData.map((c, i) => (
                      <tr key={i}>
                        <td>
                          {new Date(
                            c.consultationDateTime
                          ).toLocaleString()}
                        </td>

                        <td>
                          {c.patientId?.fullName ||
                            'N/A'}
                        </td>

                        <td>
                          {c.doctorId?.userId?.name ||
                            'N/A'}
                        </td>

                        <td>
                          {c.doctorId?.specialty
                            ?.name || 'N/A'}
                        </td>

                        <td>
                          {c.diagnosis || 'N/A'}
                        </td>

                        <td>
                         ₹{c.visitPayment || 0}
                        </td>


                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              </div>
            </>
          )}

        {/* DEPARTMENT */}

        {(reportType === 'department' ||
          reportType === 'all') &&
          hasFetched && (
            <>
              <h3>
                Department Wise Report
              </h3>

              {Object.keys(
                departmentWiseData
              ).map((dept, index) => (
                <div key={index}>

                  <h4>{dept}</h4>

                  <table className="opd-table">

                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Diagnosis</th>
                        {/* <th>Payment</th> */}
                      </tr>
                    </thead>

                    <tbody>
                      {departmentWiseData[
                        dept
                      ].map((c, i) => (
                        <tr key={i}>
                          <td>
                            {new Date(
                              c.consultationDateTime
                            ).toLocaleString()}
                          </td>

                          <td>
                            {c.patientId
                              ?.fullName || 'N/A'}
                          </td>

                          <td>
                            {c.doctorId?.userId
                              ?.name || 'N/A'}
                          </td>

                          <td>
                            {c.diagnosis ||
                              'N/A'}
                          </td>


                          {/* <td>
                                ₹{c.visitPayment || 0}
                          </td> */}


                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              ))}
            </>
          )}

        {/* DOCTOR */}

        {(reportType === 'doctor' ||
          reportType === 'all') &&
          hasFetched && (
            <>
              <h3>
                Doctor Wise Report
              </h3>

              {doctorWiseData.map((doc, index) => (
                <div key={index}>

                  <h4>
                    Dr. {doc.doctor.name}
                  </h4>

                  <p>
                    Total Consultations :
                    {' '}
                    {doc.totalConsultations}
                  </p>

                  <table className="opd-table">

                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Patient</th>
                        <th>ChiefComplaint</th>
                        <th>Diagnosis</th>
                        <th>Payment</th>
                      </tr>
                    </thead>

                    <tbody>
                      {doc.consultations.map(
                        (c, i) => (
                          <tr key={i}>
                            <td>
                              {new Date(
                                c.consultationDateTime
                              ).toLocaleString()}
                            </td>

                            <td>
                              {c.patientId
                                ?.fullName ||
                                'N/A'}
                            </td>

                            <td>
                              {c.chiefComplaint ||
                                'N/A'}
                            </td>

                            <td>
                              {c.diagnosis ||
                                'N/A'}
                            </td>


                            <td>
                                 ₹{c.visitPayment || 0}
                            </td>



                          </tr>
                        )
                      )}
                    </tbody>

                  </table>
                </div>
              ))}
            </>
          )}

        {/* NEW OLD */}

        {(reportType === 'newold' ||
          reportType === 'all') &&
          hasFetched &&
          newVsOldData && (
            <>
              <h3>
                New Vs Old Patients
              </h3>

              <table className="opd-table">
                <tbody>
                  <tr>
                    <th>
                      Total Consultations
                    </th>

                    <td>
                      {
                        newVsOldData.totalConsultations
                      }
                    </td>
                  </tr>

                  <tr>
                    <th>Unique Patients</th>

                    <td>
                      {
                        newVsOldData.uniquePatients
                      }
                    </td>
                  </tr>

                  <tr>
                    <th>New Patients</th>

                    <td>
                      {
                        newVsOldData.newPatients
                      }
                    </td>
                  </tr>

                  <tr>
                    <th>Old Patients</th>

                    <td>
                      {
                        newVsOldData.oldPatients
                      }
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}

        {/* SONOGRAPHY */}

        {(reportType === 'sonography' ||
          reportType === 'all') &&
          hasFetched && (
            <>
              <h3>
                Sonography Report
              </h3>

              <table className="opd-table">

                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Scan Type</th>
                    <th>Procedure</th>
                    <th>Report</th>
                    <th>Cost</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {sonographyData.length === 0 ? (
                    <tr>
                      <td colSpan="8">
                        No reports found
                      </td>
                    </tr>
                  ) : (
                    sonographyData.map((s, i) => (
                      <tr key={i}>

                        <td>
                          {new Date(
                            s.createdAt
                          ).toLocaleString()}
                        </td>

                        <td>
                          {s.patientId
                            ?.fullName || 'N/A'}
                        </td>

                        <td>
                          {s.doctorId?.userId
                            ?.name || 'N/A'}
                        </td>

                        <td>
                          {s.scanType || 'N/A'}
                        </td>

                        <td>
                              {s.procedureType || s.manualChargeId?.itemName || 'N/A'} 
                        </td>

                        <td>
                          {s.report || 'N/A'}
                        </td>

                        <td>
                          ₹{s.cost || 0}
                        </td>

                        <td>
                          {s.status ||
                            'Pending'}
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>

              </table>
            </>
          )}


         {/* Billing Summary UI */}

   {(reportType === 'billing' ||
  reportType === 'all') &&
  billingSummary && (

    <>

      <h2>Billing Summary</h2>

      <h3>
        Grand Total:
        ₹{
          typeof billingSummary.totalAmount=== 'number'
            ? billingSummary.totalAmount.toFixed(2)
            : '0.00'
        }
      </h3>

      {/* ITEM BREAKDOWN */}

      <h3>Breakdown by Item Type</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Item Type</th>
            <th>Total Amount</th>
            <th>Count</th>
          </tr>
        </thead>

        <tbody>

          {(billingSummary.breakdown || []).map(
            (item, index) => (

              <tr key={index}>
                <td>{item.type}</td>
                <td>
                  ₹{
                    typeof item.amount === 'number'
                      ? item.amount.toFixed(2)
                      : '0.00'
                  }
                </td>
                <td>{item.count}</td>
              </tr>

            )
          )}

        </tbody>
      </table>

      {/* PAYMENT STATUS */}

      <h3>Payment Status Breakdown</h3>

      <table className="table">

        <thead>
          <tr>
            <th>Status</th>
            <th>Total Amount</th>
          </tr>
        </thead>

        <tbody>

          {(billingSummary.paymentStatusBreakdown || []).map(
            (status, index) => (

              <tr key={index}>
                <td>{status._id || 'N/A'}</td>
                <td>
                  ₹{
                    typeof status.totalAmount === 'number'
                      ? status.totalAmount.toFixed(2)
                      : '0.00'
                  }
                </td>
                
              </tr>

            )
          )}

        </tbody>
      </table>

      {/* BILL DETAILS */}

      {billingSummary.bills?.length > 0 && (
        <>

          <h3>Bill Details</h3>

          <table className="table">

            <thead>
              <tr>
                <th>Bill No</th>
                <th>Patient</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {billingSummary.bills.map((bill, index) => (

                <tr key={bill._id || index}>

               <td>
  {bill.billId ? bill.billId : (bill.billNumber ? bill.billNumber : bill._id)}
</td>

                  <td>
                    {bill.patient_id_ref?.fullName ||
                      bill.patient?.fullName ||
                      'N/A'}
                  </td>

                  <td>
                    {bill.createdAt
                      ? new Date(
                          bill.createdAt
                        ).toLocaleDateString()
                      : 'N/A'}
                  </td>

                ₹{
  typeof bill.total_amount === 'number'
    ? bill.total_amount.toFixed(2)
    : '0.00'
}

                  <td>
                    {bill.payment_status || 'N/A'}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </>
      )}

    </>
)}




       {/* Payment Reconciliation UI */}


       {(reportType === 'payment' ||
  reportType === 'all') &&
  hasFetched &&
  paymentRecon && (
    <>
      <h3>
        Payment Reconciliation
      </h3>

      <table className="opd-table">
        <tbody>

          <tr>
            <th>Total Received</th>

            <td>
              ₹
              {paymentRecon.totalReceived}
            </td>
          </tr>

        </tbody>
      </table>

      <h4>
        Method Breakdown
      </h4>

      <table className="opd-table">
        <thead>
          <tr>
            <th>Method</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(
            paymentRecon.methodBreakdown ||
              {}
          ).map(([k, v], i) => (
            <tr key={i}>
              <td>{k}</td>
              <td>₹{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>
        User Collection
      </h4>

      <table className="opd-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(
            paymentRecon.userBreakdown ||
              {}
          ).map(([k, v], i) => (
            <tr key={i}>
              <td>{k}</td>
              <td>₹{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>
        Payment List
      </h4>

      <table className="opd-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Bill NO</th>
            <th>Patient</th>
            <th>Method</th>
            <th>Amount</th>
            <th>Received By</th>
          </tr>
        </thead>

        <tbody>
          {paymentRecon.payments?.map(
            (p, i) => (
              <tr key={i}>
                <td>
                  {new Date(
                    p.payment_date
                  ).toLocaleString()}
                </td>
                                 <td>
  {p.bill_id_ref?.billId ||
    p.bill_id_ref?.billNumber ||
    p.bill_id_ref?._id ||
    'N/A'}
</td>
                <td>
                  {p.bill_id_ref
                    ?.patient_id_ref
                    ?.fullName || 'N/A'}
                </td>

                <td>
                  {p.payment_method}
                </td>

                <td>
                  ₹
                  {p.amount_paid}
                </td>

                <td>
                  {p
                    .received_by_user_id_ref
                    ?.name || 'N/A'}
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  )}





      </div>

      <ToastContainer />

    </div>
  );
};

export default OPDReportPage;