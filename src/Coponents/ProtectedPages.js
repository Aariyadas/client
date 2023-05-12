import React, { useEffect } from "react";
import { message } from "antd";
import { GetCurrentUser } from "../apicalls/userApi";
import { useNavigate } from "react-router-dom";
import { getLoggedInUser } from "../utils/Helper";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "../redux/userSlice";
import { SetLoading } from "../redux/loaderSlice";

const ProtectedPages = ({ children }) => {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCurrentUser();
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        dispatch(SetCurrentUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetCurrentUser(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    currentUser && (
      // Header
      <div>
        <div className="flex justify-between items-center bg-primary text-white px-5 py-3">
          <div
            onClick={() => navigate("/")} className="cursor-pointer"
            >
            <h1 className="text-2xl">SAVING ALERT</h1>
            <span className="text-sm">
              {currentUser.userType.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-1 ">
            <i class="ri-user-3-line"></i>
            <div className="flex flex-col">
            <span className="mr-5 text-xl cursor-pointer"
            onClick={() => navigate("/profile")}>
              {getLoggedInUser(currentUser).toUpperCase()}
            </span>
          </div>
      
            <i class="ri-user-shared-2-line"
            onClick={(()=>{
              localStorage.removeItem("token")
              navigate('/login')
            })}
            ></i>
          </div>
        </div>
        <div className="p-5">{children}</div>
      </div>
    )
  );
};

export default ProtectedPages;
