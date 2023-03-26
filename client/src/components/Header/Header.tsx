import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/auth/authSlice";

import "./header.scss";

const Header: React.FC = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(`${JSON.parse(localStorage.getItem("user")!)?.name}`);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogout = (e: React.MouseEvent<HTMLElement>) => {
    localStorage.removeItem("user");
    dispatch(logoutAction(navigate));
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <div className="header__logo">coodatech</div>
          <div className="user-side">
            <div className="user-icon">
              <Avatar
                name={user}
                size="34"
                textSizeRatio={1.75}
                round="20px"
                title={user}
                color="#696666f2"
              />
            </div>
            <div
              className="logout-icon"
              title="log out"
              onClick={(e) => {
                isLogout(e);
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
