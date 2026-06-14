// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ViewOperationTheatre = () => {
//   const [theaters, setTheaters] = useState([]);
//   const [error, setError] = useState('');
//    const BASE_URL = process.env.REACT_APP_BASE_URL;
//   useEffect(() => {
//     const fetchTheaters = async () => {
//       try {
//         const token = localStorage.getItem('jwt');
//         const res = await axios.get(`${BASE_URL}/api/admin/operation-theaters`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setTheaters(res.data.theaters);
//       } catch (err) {
//         setError('Failed to fetch operation theaters');
//       }
//     };

//     fetchTheaters();
//   }, []);

//   return (
//     <div style={{ maxWidth: '600px', margin: '40px auto' }}>
//       <h2 style={{ textAlign: 'center' }}>Operation Theaters</h2>
//       {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

//       {theaters.length === 0 ? (
//         <p style={{ textAlign: 'center' }}>No operation theaters found.</p>
//       ) : (
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           {theaters.map((ot) => (
//             <li key={ot._id} style={{
//               padding: '15px',
//               marginBottom: '10px',
//               background: '#f1f1f1',
//               borderRadius: '5px'
//             }}>
//               <strong>Name:</strong> {ot.name} <br />
//               <strong>Status:</strong> {ot.status}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ViewOperationTheatre;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewOperationTheatre = () => {
  const [theaters, setTheaters] = useState([]);
  const [error, setError] = useState('');

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const token = localStorage.getItem('jwt');

        const res = await axios.get(
          `${BASE_URL}/api/admin/operation-theaters`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setTheaters(res.data.theaters);
      } catch (err) {
        setError('Failed to fetch operation theaters');
      }
    };

    fetchTheaters();
  }, [BASE_URL]);

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '30px auto',
        padding: '20px',
        background: '#FFFDF9',
        borderRadius: '12px',
        border: '1px solid #E5D8CC',
        boxShadow: '0 4px 16px rgba(139, 94, 60, 0.12)'
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#6B4F3A',
          marginBottom: '25px'
        }}
      >
        Operation Theaters
      </h2>

      {error && (
        <p
          style={{
            color: '#B22222',
            textAlign: 'center',
            fontWeight: '600'
          }}
        >
          {error}
        </p>
      )}

      {theaters.length === 0 ? (
        <p
          style={{
            textAlign: 'center',
            color: '#6B4F3A'
          }}
        >
          No operation theaters found.
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gap: '15px'
          }}
        >
          {theaters.map((ot) => (
            <div
              key={ot._id}
              style={{
                padding: '18px',
                background: '#F7F3EE',
                border: '1px solid #E5D8CC',
                borderRadius: '10px',
                transition: '0.3s ease'
              }}
            >
              <div
                style={{
                  marginBottom: '10px',
                  color: '#4B3A2F',
                  fontSize: '16px'
                }}
              >
                <strong>Name:</strong> {ot.name}
              </div>

              <div
                style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600',
                  background:
                    ot.status === 'Available'
                      ? '#d4edda'
                      : ot.status === 'Occupied'
                      ? '#f8d7da'
                      : '#fff3cd',
                  color:
                    ot.status === 'Available'
                      ? '#155724'
                      : ot.status === 'Occupied'
                      ? '#721c24'
                      : '#856404'
                }}
              >
                {ot.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOperationTheatre;