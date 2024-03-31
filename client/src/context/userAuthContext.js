
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Initialize user state

    function logout() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, logout,setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

// import { createContext, useContext} from "react";

// const userAuthContext = createContext();

// export function UserAuthContextProvider ({children}){
//     const userToken = localStorage.getItem('Jwt_token');
//     const adminToken = localStorage.getItem('admin_token');
//     const user = {}; // Initialize user object
    
//         // No one is logged in
//         if(!userToken && !adminToken){
//             user.name = "Guest"; // Set a default guest name
//             user.email = null; // Clear email for guests
//             user.isAdmin = false; // Guest is not an admin    
//         }
//     else if (userToken) {
//         // User is logged in
//         user.name = localStorage.getItem("LoggedUserName");
//         user.email = localStorage.getItem("LoggedUserEmail");
//         user.isAdmin = false; // Indicate user is not an admin
//       } 
//       if (adminToken) {
//         // Admin is logged in
//         user.name = localStorage.getItem("admin-name");
//         user.email = localStorage.getItem("admin-email");
//         user.isAdmin = true; // Indicate user is an admin
//       }
//    console.log("auth context",user.name);
//     return (
//         <userAuthContext.Provider
//             value={{user}}
//         >
//             {children}
//         </userAuthContext.Provider>
//     );
// }

// export function useUserAuth() {
//     return useContext(userAuthContext);
// }