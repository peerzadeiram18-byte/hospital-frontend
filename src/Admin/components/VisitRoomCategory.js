// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const VisitRoomCategory = () => {
//   const [Rooms, setRooms] = useState([]);
//   const [error, setError] = useState("");
//    const BASE_URL = process.env.REACT_APP_BASE_URL;
//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const token = localStorage.getItem("jwt");
//        const res = await axios.get(`${BASE_URL}/api/admin/room-categories`, {
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

//    setRooms(res.data.roomCategories || []);

//       } catch (err) {
//         console.error("Failed to fetch rooms:", err);
//         setError("Failed to load data.");
//       }
//     };

//     fetchRooms();
//   }, []);

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>All Room Categories</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {Rooms.length > 0 ? (
//         <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
//           <thead>
//             <tr>
//               <th style={thStyle}>#</th>
//               <th style={thStyle}>Name</th>
//               <th style={thStyle}>Description</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Rooms.map((room, index) => (
//               <tr key={room._id}>
//                 <td style={tdStyle}>{index + 1}</td>
//                 <td style={tdStyle}>{room.name}</td>
//                 <td style={tdStyle}>{room.description}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No rooms found.</p>
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




// export default VisitRoomCategory;



import React, { useEffect, useState } from "react";
import axios from "axios";

const VisitRoomCategory = () => {
  const [Rooms, setRooms] = useState([]);
  const [error, setError] = useState("");
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem("jwt");

        const res = await axios.get(
          `${BASE_URL}/api/admin/room-categories`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRooms(res.data.roomCategories || []);
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
        setError("Failed to load data.");
      }
    };

    fetchRooms();
  }, []);

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "30px auto",
        padding: "25px",
        background: "#F7F3EE",
        minHeight: "100vh",
        borderRadius: "16px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#8B5E3C",
          marginBottom: "25px",
          fontSize: "30px",
          fontWeight: "700",
        }}
      >
        Room Categories
      </h2>

      {error && (
        <p
          style={{
            color: "#D32F2F",
            textAlign: "center",
            background: "#FFF5F5",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #FFCCCC",
          }}
        >
          {error}
        </p>
      )}

      <div
        style={{
          background: "#FFFDF9",
          borderRadius: "14px",
          padding: "20px",
          boxShadow: "0 4px 12px rgba(139,94,60,0.08)",
          border: "1px solid #E8DCCB",
          overflowX: "auto",
        }}
      >
        {Rooms.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "600px",
            }}
          >
            <thead>
              <tr>
                <th style={thStyle}>#</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Description</th>
              </tr>
            </thead>

            <tbody>
              {Rooms.map((room, index) => (
                <tr
                  key={room._id}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "#FFFDF9" : "#F7F3EE",
                  }}
                >
                  <td style={tdStyle}>{index + 1}</td>
                  <td style={tdStyle}>{room.name}</td>
                  <td style={tdStyle}>{room.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "#8B5E3C",
              fontWeight: "500",
            }}
          >
            No Room Categories Found
          </p>
        )}
      </div>
    </div>
  );
};

const thStyle = {
  border: "1px solid #CDB79E",
  padding: "12px",
  backgroundColor: "#8B5E3C",
  color: "#FFFDF9",
  fontWeight: "600",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #E8DCCB",
  padding: "12px",
  color: "#4A3426",
};

export default VisitRoomCategory;