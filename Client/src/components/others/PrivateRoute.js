// import React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const isAuthenticated = localStorage.getItem('token');
//   const navigate = useNavigate(); // Initialize the useNavigate hook

//   return (
//     <Routes>

// <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           // Use navigate to redirect to the login page
//           navigate('/login')
//         )
//       }
//     />
//     </Routes>
  
//   );
// };

// export default PrivateRoute;
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <div>
              {/* Render the component */}
              <Component {...props} />
              {/* Add the "this is home" line */}
              <p>This is home</p>
            </div>
          ) : (
            // Redirect to the login page if not authenticated
            navigate('/login')
          )
        }
      />
    </Routes>
  );
};


export default PrivateRoute;
