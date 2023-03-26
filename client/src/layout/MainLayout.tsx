import { Outlet } from "react-router-dom";

import "../style/style.scss";

const MainLayout = () => {
  return (
    <div className="wrapper">
      <Outlet />
    </div>
  );
};

export default MainLayout;
