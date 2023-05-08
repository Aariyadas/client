import { Tabs } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import InventoryForm from './Inventory/InventoryForm.js'

const Profile = () => {
    const { currentUser } = useSelector((state) => state.users)
    return (
        <div>
            <Tabs>
                {currentUser.userType === "organization" && (
                    <>
                        <Tabs.Tab tab="Inventory" key="1">
                        <InventoryForm/>
                        </Tabs.Tab>
                        <Tabs.Tab tab="Donars" key="2"></Tabs.Tab>
                        <Tabs.Tab tab="Hospitals" key="3"></Tabs.Tab>
                    </>
                )}
            </Tabs>
        </div>
    )
}

export default Profile;
