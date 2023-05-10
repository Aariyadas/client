import React from 'react'
import { useDispatch } from 'react-redux'
import { SetLoading } from '../../../redux/loaderSlice'
import { message,Table } from 'antd'
import { GetALLDonarsOfAnOrganization } from '../../../apicalls/userApi'
import { getDateFormat } from '../../../utils/Helper'



const Donars = () => {
    const [data,setData]=React.useState([])
    const dispatch=useDispatch()
    const getData =async() =>{
        try{
            dispatch(SetLoading(true))
            const response =await GetALLDonarsOfAnOrganization();
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
            dataIndex:"name",
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
        <h1>Donars</h1>
        <Table columns={columns} dataSource={data}/>
    </div>

  )
}

export default Donars