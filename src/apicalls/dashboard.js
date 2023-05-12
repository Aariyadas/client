import {axiosInstance} from "./axios"

export const GetAllBloodGroupsInInventory =() =>{
    return axiosInstance("get","/api/dashboard/blood-group-data")
}