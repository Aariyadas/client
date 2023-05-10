import React from 'react'
import { useDispatch } from 'react-redux'
import { SetLoading } from '../../../redux/loaderSlice'
import { message,Table } from 'antd'
import { GetAllOrganizationofADonar, GetAllOrganizationofAHospital } from '../../../apicalls/userApi'
import { getDateFormat } from '../../../utils/Helper'



const Organization= (userType) => {
    const [data,setData]=React.useState([])
    const dispatch=useDispatch()
    const getData =async() =>{
        try{
            dispatch(SetLoading(true))
           let response =null ;
           if(userType === "hospital"){
            response = await GetAllOrganizationofAHospital();
           } else{
            response = await GetAllOrganizationofADonar();
           }       
           dispatch(SetLoading(false))
            if(response.success){
             
                setData(response.data)
            }else{
                throw new Error(response.message)
            }

        }catch(error){
            message.error(error.message)
            dispatch(SetLoading(false))
        }
    }


    const columns =[
        {
            title:"Name",
            dataIndex:"organizationName",
        },
        {
            title:"Email",
            dataIndex:"email",
        },
        {
            title:"Phone",
            dataIndex:"phone"
        },
        {
            title:"Address",
            dataIndex:"address"
        },
        {
            title:"Created At",
            dataIndex:"createdAt",
            render:(text)=> getDateFormat(text)
        },
        
]
    React.useEffect(()=>{
        getData()
    },[])

    
  return (
    <div>
        <Table columns={columns} dataSource={data}/>
    </div>

  )
}

export default Organization