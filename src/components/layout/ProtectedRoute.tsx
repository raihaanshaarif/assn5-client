import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { JwtPayload } from "jwt-decode";

// Extend JwtPayload to include your custom fields
interface MyJwtPayload extends JwtPayload {
  role: string;
  // Add other fields if needed, e.g., id, email, etc.
}


type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined;
  };

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
    const token = useAppSelector(useCurrentToken);
  
    let user;
  
    if (token) {
      user = verifyToken(token) as MyJwtPayload;;
    }
  
    const dispatch = useAppDispatch();
  
    if (role !== undefined && role !== user?.role) {
      dispatch(logout());
      return <Navigate to="/login" replace={true} />;
    }
    if (!token) {
      return <Navigate to="/login" replace={true} />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;
  