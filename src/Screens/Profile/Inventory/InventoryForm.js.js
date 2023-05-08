import { Modal } from 'antd'
import React from 'react'

const InventoryForm = ({ open, setOpen, reloadData }) => {
  return (
   <div>
    <h1>Hello</h1>
   <Modal title ="Add Inventory"
   open={open} // Use "visible" instead of "open"
   onCancel={()=>setOpen(false)}
   centered
   ></Modal>
   </div>
  ) 
}


export default InventoryForm