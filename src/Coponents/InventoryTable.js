import { Table, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { getDateFormat } from '../utils/Helper';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../redux/loaderSlice';
import { GetInventoryWithFilters } from '../apicalls/inventoryApi';

const InventoryTable = (filters) => {
    const [data, setData] = React.useState([]);
    
   
    const dispatch = useDispatch();

    const getData =async() =>{
        try{
            dispatch(SetLoading(true))
            const response =await GetInventoryWithFilters (filters);
            console.log(response)
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
   console.log(getData)
  
    const columns=[
        {
            title:"Inventory Type",
            dataIndex:"inventoryType",
            render: (text) => typeof text === "string" ? text.toUpperCase() : "",
        },
        {
            title:"Blood Group",
            dataIndex:"bloodGroup",
            render: (text) => typeof text === "string" ? text.toUpperCase() : "",
        },
        {
            title:"Quantity",
            dataIndex:"quantity",
            render: (text) =>
            typeof text === "number" ? `${text}ML`.toUpperCase() : "",
        },
        {
            title:"Reference",
            dataIndex:"reference",
            render:(text,record)=>
            record.organization.organizationName,
        },
        {
            title:"Date",
            dataIndex:"createdAt",
            render:(text)=> getDateFormat(text)
        },
    ]
   
    useEffect(() => {
    getData()
    }, []);
  
    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
  
  

export default InventoryTable