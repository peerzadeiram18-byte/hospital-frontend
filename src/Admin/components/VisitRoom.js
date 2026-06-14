// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const VisitRoom = () => {
//   const [labourRooms, setLabourRooms] = useState([]);
//   const [error, setError] = useState("");
//    const BASE_URL = process.env.REACT_APP_BASE_URL;
//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const token = localStorage.getItem("jwt");
//       const res = await axios.get(`${BASE_URL}/api/admin/labour-rooms`, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

//         setLabourRooms(res.data.labourRooms || []);
//       } catch (err) {
//         console.error("Failed to fetch labour rooms:", err);
//         setError("Failed to load data.");
//       }
//     };

//     fetchRooms();
//   }, []);

//   return (
    
//     <div style={{ padding: '20px' }}>
//       <h2>Visit Labour Rooms</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {labourRooms.length > 0 ? (
//         <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
//           <thead>
//             <tr>
//               <th style={thStyle}>#</th>
//               <th style={thStyle}>Name</th>
//               <th style={thStyle}>Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {labourRooms.map((room, index) => (
//               <tr key={room._id}>
//                 <td style={tdStyle}>{index + 1}</td>
//                 <td style={tdStyle}>{room.name}</td>
//                 <td style={tdStyle}>{room.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No labour rooms found.</p>
//       )}
//     </div>
//   );
// };

// // Table styles
// const thStyle = {
//   border: "1px solid #ddd",
//   padding: "8px",
//   backgroundColor: "#f2f2f2",
//   fontWeight: "bold",
//   textAlign: "left",
// };

// const tdStyle = {
//   border: "1px solid #ddd",
//   padding: "8px",
//    backgroundColor: "#f2f2f2",
// };

// export default VisitRoom;


import React, { useEffect, useState } from "react";
import axios from "axios";

const VisitRoom = () => {
  const [labourRooms, setLabourRooms] = useState([]);
  const [error, setError] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("jwt");

        const res = await axios.get(
          `${BASE_URL}/api/admin/labour-rooms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLabourRooms(res.data.labourRooms || []);
      } catch (err) {
        console.error("Failed to fetch labour rooms:", err);
        setError("Failed to load data.");
      }
    };

    fetchRooms();
  }, []);

  return (
    <div
      style={{
        background: "#F7F3EE",
        minHeight: "100vh",
        padding: "30px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "#FFFDF9",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #E8DCCB",
          boxShadow: "0 8px 24px rgba(139,94,60,0.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#8B5E3C",
            marginBottom: "25px",
            fontWeight: "700",
          }}
        >
          Labour Room List
        </h2>

        {error && (
          <p
            style={{
              color: "#dc2626",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {error}
          </p>
        )}

        {labourRooms.length > 0 ? (
          <div
            style={{
              overflowX: "auto",
              borderRadius: "12px",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "700px",
              }}
            >
              <thead>
                <tr
                  style={{
                    background: "#8B5E3C",
                  }}
                >
                  <th
                    style={{
                      border: "1px solid #CDB79E",
                      padding: "12px",
                      color: "#FFFDF9",
                      textAlign: "left",
                    }}
                  >
                    #
                  </th>

                  <th
                    style={{
                      border: "1px solid #CDB79E",
                      padding: "12px",
                      color: "#FFFDF9",
                      textAlign: "left",
                    }}
                  >
                    Name
                  </th>

                  <th
                    style={{
                      border: "1px solid #CDB79E",
                      padding: "12px",
                      color: "#FFFDF9",
                      textAlign: "left",
                    }}
                  >
                    Description
                  </th>
                </tr>
              </thead>

              <tbody>
                {labourRooms.map((room, index) => (
                  <tr
                    key={room._id}
                    style={{
                      background:
                        index % 2 === 0
                          ? "#FFFDF9"
                          : "#F7F3EE",
                    }}
                  >
                    <td
                      style={{
                        border: "1px solid #E8DCCB",
                        padding: "12px",
                        color: "#4A3426",
                      }}
                    >
                      {index + 1}
                    </td>

                    <td
                      style={{
                        border: "1px solid #E8DCCB",
                        padding: "12px",
                        color: "#4A3426",
                        fontWeight: "600",
                      }}
                    >
                      {room.name}
                    </td>

                    <td
                      style={{
                        border: "1px solid #E8DCCB",
                        padding: "12px",
                        color: "#4A3426",
                      }}
                    >
                      {room.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              color: "#6B4F3A",
              fontStyle: "italic",
            }}
          >
            No labour rooms found.
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitRoom;