import { Tabs } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import Inventory from './Inventory'
import Donars from './Donars'
import Hospitals from './Hospitals'

const Profile = () => {
    const { currentUser } = useSelector((state) => state.users)
    return (
        <div>
            <Tabs>
                {currentUser.userType === "organization" && (
                    <>
                        <Tabs.Tab tab="Inventory" key="1">
                            <Inventory/>
                        </Tabs.Tab>
                        <Tabs.Tab tab="Donars" key="2">
                            <Donars/>
                        </Tabs.Tab>
                        <Tabs.Tab tab="Hospitals" key="3">
                            <Hospitals/>
                        </Tabs.Tab>
                    </>
                )}
            </Tabs>
        </div>
    )
}

export default Profile;
