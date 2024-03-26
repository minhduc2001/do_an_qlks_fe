import { Button, Col, Image, Row, Upload, UploadFile, UploadProps } from "antd";
import "./index.scss";
import { Formik } from "formik";
import FormGlobal, {
  FormItemGlobal,
  InputFormikGlobal,
  RadioGroupFormikGlobal,
} from "@/components/FormGlobal";
import ButtonGlobal from "@/components/ButtonGlobal";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiUser, { EGender, IUserUpdate } from "@/api/ApiUser";
import Notification from "@/components/Notification";
import { useDispatch } from "react-redux";
import { reloadUser, updateAvatarUser } from "@/redux/slices/UserSlice";
import { CheckInfoValidation } from "@/utils/validation/user";
import { useState } from "react";
import store from "@/redux/store";
import { RcFile } from "antd/lib/upload";

const Infomation = () => {
  const initialValues: IUserUpdate = {
    username: "",
    address: "",
    phone: "",
    cccd: "",
    gender: EGender.Other,
  };

  const dispatch = useDispatch();

  const updateUser = useMutation(ApiUser.updateUser);
  const updateAvatar = useMutation(ApiUser.uploadAvatar);

  const onSubmit = (values: IUserUpdate) => {
    updateUser.mutate(
      {
        id: values.id as number,
        data: {
          username: values.username,
          address: values.address,
          gender: values.gender,
          cccd: values.cccd,
          phone: values.phone,
        },
      },
      {
        onSuccess: (res: IUserUpdate) => {
          Notification.notificationSuccess("Cập nhật thông tin thành công");

          dispatch(reloadUser(res));
        },
      }
    );
  };

  const props: UploadProps = {
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file }) {
      if (file.status !== "uploading") {
        const { user } = store.getState();
        const formData = new FormData();
        formData.append("file", file.originFileObj as RcFile);
        updateAvatar.mutate(
          { id: user.id as number, data: formData },
          {
            onSuccess: (res: { avatar: string }) => {
              dispatch(updateAvatarUser(res as IUserUpdate));
              refetch();
            },
          }
        );
      }
    },
    showUploadList: false,
    multiple: false,
  };

  const { data: me, refetch } = useQuery(["get_me"], () => ApiUser.getMe());

  return (
    <Formik
      initialValues={(me as IUserUpdate) ?? initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={CheckInfoValidation}
    >
      {(): JSX.Element => {
        return (
          <div className="div-root">
            <Row gutter={33}>
              <Col span={10}>
                <div className="flex justify-center flex-col items-center mt-20">
                  <Image
                    src={
                      me?.avatar ||
                      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    }
                    width={160}
                    preview={false}
                  ></Image>
                  <div className="mt-10">
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </div>
                </div>
              </Col>
              <Col span={14}>
                <FormGlobal disabled={updateUser.isLoading}>
                  <Row>
                    <Col span={24}>
                      <FormItemGlobal
                        name={"username"}
                        label={"Tên người dùng"}
                        required
                      >
                        <InputFormikGlobal name="username" />
                      </FormItemGlobal>
                    </Col>
                    <Col span={24}>
                      <FormItemGlobal
                        name={"cccd"}
                        label={"CCCD/CMTND"}
                        required
                      >
                        <InputFormikGlobal name="cccd" />
                      </FormItemGlobal>
                    </Col>
                    <Col span={24}>
                      <FormItemGlobal
                        name={"gender"}
                        label={"Giới tính"}
                        required
                      >
                        <RadioGroupFormikGlobal
                          name="gender"
                          options={[
                            { label: "Nam", value: EGender.Male },
                            { label: "Nữ", value: EGender.Female },
                            { label: "Khác", value: EGender.Other },
                          ]}
                        />
                      </FormItemGlobal>
                    </Col>
                    <Col span={24}>
                      <FormItemGlobal
                        name={"phone"}
                        label={"Số điện thoại"}
                        required
                      >
                        <InputFormikGlobal name="phone" />
                      </FormItemGlobal>
                    </Col>
                    <Col span={24}>
                      <FormItemGlobal
                        name={"address"}
                        label={"Địa chỉ"}
                        required
                      >
                        <InputFormikGlobal name="address" />
                      </FormItemGlobal>
                    </Col>

                    <Col span={24} className="flex justify-center">
                      <ButtonGlobal>Cập nhật thông tin</ButtonGlobal>
                    </Col>
                  </Row>
                </FormGlobal>
              </Col>
            </Row>
          </div>
        );
      }}
    </Formik>
  );
};

export default Infomation;
