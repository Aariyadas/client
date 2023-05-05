import React from "react";
import { Form, Input,TextArea } from "antd";

const OrgHospitalForm = ({ type }) => {
    return (
      <>
        <Form.Item
          label={type === "hospital" ? "Hospital Name" : "Organization Name"}
          name={type === "hospital" ? "hospitalName" : "organizationName"}
        >
          <Input />
        </Form.Item>
        <Form.Item name="owner" label="Owner">
          <Input name="owner" />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>
        <Form.Item name="website" label="Website">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" className="col-span-2">
          <Input.TextArea />
        </Form.Item>
        
      </>
    );
  };
  


export default OrgHospitalForm;
