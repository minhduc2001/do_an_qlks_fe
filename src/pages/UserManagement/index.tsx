import { Formik } from "formik";
import "./index.scss";
import { Tabs, TabsProps } from "antd";
import { useMemo } from "react";
import Infomation from "./components/Infomation";
import PasswordChange from "./components/Password";
import SubHeader from "@/components/SubHeader/SubHeader";

const UserManagement = () => {
  const items: TabsProps["items"] = useMemo(() => {
    return [
      {
        key: "1",
        label: "Thông tin tài khoản",
        children: <Infomation></Infomation>,
      },
      {
        key: "2",
        label: "Mật khẩu",
        children: <PasswordChange></PasswordChange>,
      },
    ];
  }, []);
  return (
    <>
      {/* <SubHeader title="jaj" description=""></SubHeader> */}
      <div className="px-20 py-10 mt-[150px]">
        <Tabs defaultActiveKey="1" items={items} tabPosition="left" />
      </div>
    </>
  );
};

export default UserManagement;
