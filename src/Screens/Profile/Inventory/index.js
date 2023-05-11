import { Button, message,Table ,text} from 'antd'
import InventoryForm from '../Inventory/InventoryForm.js'
import React from 'react'
import { useDispatch } from 'react-redux'
import { SetLoading } from '../../../redux/loaderSlice.js'
import { GetInventory } from '../../../apicalls/inventoryApi.js'
import { getDateFormat } from '../../../utils/Helper.js'

const Inventory = () => {
    const [data,setData]=React.useState([])
    const [open,setOpen]= React.useState(false)
    const dispatch =useDispatch();
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
            render:(text,record)=> {
            if(record.inventoryType ==="in"){
                return record.donar.name
            }else{
                return record.hospital.hospitalName
            }
            }
        },
        {
            title:"Date",
            dataIndex:"createdAt",
            render:(text)=> getDateFormat(text)
        },
    ]
    const getData =async() =>{
        try{
            dispatch(SetLoading(true))
            const response =await GetInventory();
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
    React.useEffect(()=>{
        getData()
    },[])


    
  return (
    <div>
        
    <div className="flex justify-end">
        <Button type='primary' onClick={() => setOpen(true)} >
            Add Inventory
        </Button>
        </div>
        <Table columns={columns} dataSource ={data}/>
        {open && <InventoryForm open={open} setOpen={setOpen}
        reloadData={getData}/>}
   </div>
  );
}

export default Inventory
