import React from 'react'
import { useDispatch } from 'react-redux'
import { SetLoading } from '../../../redux/loaderSlice'
import { message,Table } from 'antd'
import { GetAllHospitalsOfAnOrganization } from '../../../apicalls/userApi'
import { getDateFormat } from '../../../utils/Helper'



const Donars = () => {
    const [data,setData]=React.useState([])
    const dispatch=useDispatch()
    const getData =async() =>{
        try{
            dispatch(SetLoading(true))
            const response =await GetAllHospitalsOfAnOrganization();
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
            title:"Hospital Name",
            dataIndex:"hospitalName",
        },
        {
            title:"Email",
            dataIndex:"email",
        },
        {
            title:"Address",
            dataIndex:"address",
        },
        
        {
            title:"Phone",
            dataIndex:"phone"
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
        <h1>Hospitals</h1>
        <Table columns={columns} dataSource={data}/>
    </div>

  )
}

export default Donars