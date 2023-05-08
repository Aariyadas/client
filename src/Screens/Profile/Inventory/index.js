import { Button } from 'antd'
import InventoryForm from '../Inventory/InventoryForm.js'
import React from 'react'

const Inventory = () => {
    const [open,setOpen]= React.useState(false)
  return (
    <div>
        
    <div className="flex justify-end">
        <Button type='primary' onClick={() => setOpen(true)}>
            Add Inventory
        </Button>
        </div>

        {open && <InventoryForm open={open} setOpen={setOpen}/>}
   </div>
  );
}

export default Inventory