import React from "react";
import { Button, Form, Input, Radio } from "antd";
import { Link } from "react-router-dom";
import OrgHospitalForm from "./OrgHospitalForm";
import Password from "antd/es/input/Password";

const Register = () => {
  const [type, setType] = React.useState("donar");
  const onFinish=(values)=>{
    console.log(values)
  }
  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Form
        layout="vertical"
        className="bg-white rounded shadow grid grid-cols-2 p-5 gap-5 w-1/2 "
        onFinish={onFinish}
     >
        <h1 className="col-span-2 uppercase text-2xl ">
          <span className="text-primary item-center">
            {type.toUpperCase()}-Registeration
          </span>
        </h1>

        <Radio.Group
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="col-span-2"
        >
          <Radio value="donar">Donar</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organization">Organization</Radio>
        </Radio.Group>
        {type === "donar" && (
          <>
            {" "}
            <Form.Item label="Name" name='name'>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name='email'>
              <Input  type='email'/>
            </Form.Item>
            <Form.Item label="Phone" name='phone'>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name='password'>
              <Input  type='password'/>
            </Form.Item>
          </>
        )}
        {type !== "donar" && <OrgHospitalForm type={type} />}
        <Button className="bg-primary hover:bg-primary-700 block" htmlType="submit">
          Register
        </Button>

        <Link
          to="/login"
          className="col-span-2 text-center text-gray-700 underline"
        >
          Already have an account? Login
        </Link>
      </Form>
    </div>
  );
};

export default Register;
