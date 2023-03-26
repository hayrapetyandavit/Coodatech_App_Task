import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { authSelector, userSelector } from "../redux/auth/authSelector";

const PublicLayout = () => {
  const auth = useSelector(authSelector);
  const user = useSelector(userSelector);

  if (!auth) {
    return <Outlet />;
  }
  if (user.role) {
    return <Navigate to="/" replace />;
  }
  return <Navigate to="/login" replace />;
};

export default PublicLayout;
