import { axiosInstance } from "./axios";

export const LoginUser =async(payload) =>{
    const response =await axiosInstance("post","/api/users/login",payload);
    return response;
}

export const RegisterUser = async (payload) => {
    const response = await axiosInstance("post", "/api/users/register", payload);
    return response;
  };

  export const GetCurrentUser = async () =>{
    const response = await axiosInstance("get","/api/users/get-current-users");
    return response;
   
  }


  export const GetALLDonarsOfAnOrganization =() =>{
    return axiosInstance("get",'/api/users/get-all-donars')
  }


  export const GetAllHospitalsOfAnOrganization =() =>{
    return axiosInstance("get",'/api/users/get-all-hospitals')
  }

  export const GetAllOrganizationofADonar=() =>{
    return axiosInstance("get",'/api/users/get-all-organization-for-donars')
  }

  export const GetAllOrganizationofAHospital=() =>{
    return axiosInstance("get",'/api/users/get-all-organization-for-hospitals')
  }