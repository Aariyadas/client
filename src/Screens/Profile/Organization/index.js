import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoading } from "../../../redux/loaderSlice";
import { message, Table, Modal } from "antd";
import {
  getAllOrganizationsForDonars,
  getAllOrganizationsForHospital,
} from "../../../apicalls/userApi";
import { getDateFormat } from "../../../utils/Helper";
import InventoryTable from "../../../Coponents/InventoryTable";

function Organization({ userType }) {
  const [showHistoryModal, setShowHistoryModal] = useState();
  const [selectedOrganization, setSelectedOrganization] = useState([]);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(SetLoading(true));

      let response = null;
      if (userType === "hospital") {
        response = await getAllOrganizationsForHospital();
      } else {
        response = await getAllOrganizationsForDonars();
      }

      dispatch(SetLoading(false));

      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "organizationName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span
          className="underline text-md cursor-pointer"
          onClick={() => {
            setSelectedOrganization(record);
            setShowHistoryModal(true);
          }}
        >
          History
        </span>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, [userType]);

  return (
    <div>
      <Table columns={columns} dataSource={data} />
      {showHistoryModal && (
      <Modal
        title={
            `${ userType ==="donar" ? "DonationHistory" : "TransfusionHistory"} In ${selectedOrganization.organizationName}`
        }
        centered
        open ={showHistoryModal}
        onClose ={()=> setShowHistoryModal(false)}
        width={1000}
        onCancel={()=> setShowHistoryModal(false)
        }
      >
        <InventoryTable
          filters={{
            organization: selectedOrganization._id,
    
        
            [userType]: currentUser._id,
          }}
        />
      </Modal>
      )}
    </div>
  );
}

export default Organization;
