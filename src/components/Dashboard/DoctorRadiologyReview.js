import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Chip
} from "@mui/material";

import { toast } from "react-toastify";

const DoctorRadiologyReview = () => {

  const [reports,setReports] =
    useState([]);

  const BASE_URL =
    process.env.REACT_APP_BASE_URL;

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {};

  useEffect(()=>{

    fetchReports();

  },[]);

  const fetchReports =
    async()=>{

      try{

        const token =
          localStorage.getItem("jwt");

        const res =
          await axios.get(
            `${BASE_URL}/api/doctor/doctor/radiology-review/${user.doctorId}`,
            {
              headers:{
                Authorization:
                `Bearer ${token}`
              }
            }
          );

        setReports(res.data);

      }
      catch(err){

        console.log(err);

        toast.error(
          "Failed to load reports"
        );

      }

    };

  const handleAdmit =
    async(orderId)=>{

      try{

        const token =
          localStorage.getItem("jwt");

        await axios.put(
          `${BASE_URL}/api/doctor/radiology/admit-after-review/${orderId}`,
          {},
          {
            headers:{
              Authorization:
              `Bearer ${token}`
            }
          }
        );

        toast.success(
          "Patient sent for IPD Admission"
        );

        fetchReports();

      }
      catch(err){

        console.log(err);

        toast.error(
          "Admission failed"
        );

      }

    };

  return (

    <Box>

      <Typography
        variant="h4"
        fontWeight="bold"
        mb={3}
      >
        Radiology Reports Review
      </Typography>

      <Paper>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>
                Patient
              </TableCell>

              <TableCell>
                Test
              </TableCell>

              <TableCell>
                Report
              </TableCell>

              <TableCell>
                Date
              </TableCell>

              <TableCell>
                Status
              </TableCell>

              <TableCell>
                Action
              </TableCell>

            </TableRow>

          </TableHead>

          <TableBody>

            {
              reports.map((report)=>(

                <TableRow
                  key={report._id}
                >

                  <TableCell>
                    {
                      report.patientId
                        ?.fullName
                    }
                  </TableCell>

                  <TableCell>
                    {
                      report.testType
                    }
                  </TableCell>

                  <TableCell>

                    <Box
                      sx={{
                        maxWidth:"350px"
                      }}
                    >
                      {
                        report.reportText
                      }
                    </Box>

                  </TableCell>

                  <TableCell>

                    {
                      report.reportDate
                      ?
                      new Date(
                        report.reportDate
                      ).toLocaleDateString()
                      :
                      "-"
                    }

                  </TableCell>

                  <TableCell>

                    <Chip
                      label={
                        report.status
                      }
                      color="success"
                    />

                  </TableCell>

                  <TableCell>

                    <Button
                      variant="contained"
                      color="error"
                      onClick={()=>
                        handleAdmit(
                          report._id
                        )
                      }
                    >
                      Admit To IPD
                    </Button>

                  </TableCell>

                </TableRow>

              ))
            }

          </TableBody>

        </Table>

      </Paper>

    </Box>

  );

};

export default DoctorRadiologyReview;