import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loaderSlice';
import { message, Table } from 'antd';
import { getAllOrganizationsForDonars, getAllOrganizationsForHospital } from '../../../apicalls/userApi';
import { getDateFormat } from '../../../utils/Helper';

function Organization({ userType }) {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoading(true));

      let response = null;
      if (userType === 'hospital') {
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
      title: 'Name',
      dataIndex: 'organizationName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (text) => getDateFormat(text),
    },
  ];

  useEffect(() => {
    getData();
  }, [userType]);

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Organization;
