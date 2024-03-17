import { useRef } from "react";
import { Formik, FormikProps } from "formik";
import { Col, Divider, Image, Row, Tabs, TabsProps } from "antd";
import FormGlobal, {
  DatePickerFormikGlobal,
  FormItemGlobal,
  InputFormikGlobal,
  InputNumberFormikGlobal,
  RadioGroupFormikGlobal,
  SelectFormikGlobal,
} from "../FormGlobal";
import ModalGlobal from "../ModalGlobal";
import moment, { Moment } from "moment";
import ApiRoom, { IBookRoomBody, IRoomRes } from "@/api/ApiRoom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Notification from "../Notification";
import { BookingRoomValidation } from "@/utils/validation/booking-room";
import { REG_EMAIL } from "@/utils/validation/booking-room/reg";
import ApiUser, { EGender } from "@/api/ApiUser";

interface IRoomValue {
  firstName: string;
  lastName: string;
  gender: EGender;
  email: string;
  phone: string;
  checkin: Moment;
  checkout: Moment;
  idRoom?: number;
  paymentType: string;
  quantity: number;
}

interface IModalOrderRoomProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  roomSelected: IRoomRes;
}
export default function ModalOrderRoom({
  isOpenModal,
  handleCloseModal,
  roomSelected,
}: IModalOrderRoomProps) {
  const innerRef = useRef<FormikProps<IRoomValue>>(null);

  const initialValues: IRoomValue = {
    firstName: "",
    lastName: "",
    gender: EGender.Other,
    email: "",
    phone: "",
    checkin: moment().startOf("day"),
    checkout: moment().startOf("day").add(1, "day"),
    idRoom: roomSelected.id,
    paymentType: "Momo",
    quantity: 1,
  };

  const onCancel = () => {
    innerRef.current?.resetForm();
    handleCloseModal();
  };

  const calculateNight = (sd: Moment, ed: Moment) => {
    return (
      ed.diff(sd, "days") *
      (roomSelected.price ?? 0) *
      (innerRef.current?.values.quantity ?? 0)
    ).toLocaleString();
  };

  const bookRoomMutation = useMutation(ApiRoom.bookRoom);
  const handleSubmit = (values: IRoomValue) => {
    const newValues: IBookRoomBody = {
      ...values,
      checkin: values.checkin.format("YYYY-MM-DD"),
      checkout: values.checkout.format("YYYY-MM-DD"),
    };
    bookRoomMutation.mutate(newValues, {
      onSuccess: (response) => {
        Notification.notificationSuccess("Vui lòng hoàn tất thủ tục đặt phòng");
        window.open(response, "_blank");
        onCancel();
      },
    });
  };

  const { data: me } = useQuery(["get_me"], () => ApiUser.getMe());

  return (
    <Formik
      innerRef={innerRef}
      initialValues={{
        firstName: "",
        lastName: "",
        gender: EGender.Other,
        email: "",
        phone: "",
        checkin: moment().startOf("day"),
        checkout: moment().startOf("day").add(1, "day"),
        idRoom: roomSelected.id,
        paymentType: "Momo",
        quantity: 1,
        ...me,
      }}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={BookingRoomValidation}
    >
      {(formikProps): JSX.Element => {
        return (
          <ModalGlobal
            open={isOpenModal}
            title="Đặt phòng"
            onOk={formikProps.handleSubmit}
            onCancel={onCancel}
            isLoadingOK={bookRoomMutation.isLoading}
          >
            <>
              {" "}
              <FormGlobal>
                <Row gutter={[16, 0]}>
                  <Col span={24}>
                    <Row gutter={[32, 0]}>
                      <Col span={12}>
                        <FormItemGlobal
                          name="username"
                          label="Tên khách hàng"
                          required
                        >
                          <InputFormikGlobal
                            name="username"
                            placeholder="tên khách hàng"
                            disabled
                          />
                        </FormItemGlobal>
                        <FormItemGlobal
                          name="email"
                          label="Email"
                          required
                          rules={[
                            {
                              pattern: REG_EMAIL,
                              message: "Email không đúng định dạng",
                            },
                          ]}
                        >
                          <InputFormikGlobal
                            name="email"
                            placeholder="Email"
                            disabled
                          />
                        </FormItemGlobal>
                        <FormItemGlobal name="address" label="Địa chỉ" required>
                          <InputFormikGlobal
                            name="address"
                            placeholder="Nhập địa chỉ"
                            disabled
                          />
                        </FormItemGlobal>
                      </Col>
                      <Col span={12}>
                        <FormItemGlobal
                          name="phone"
                          label="Số điện thoại"
                          required
                        >
                          <InputFormikGlobal
                            name="phone"
                            placeholder="Số điện thoại"
                            disabled
                          />
                        </FormItemGlobal>
                        <FormItemGlobal
                          name="quantity"
                          label="quantity"
                          required
                        >
                          <InputNumberFormikGlobal
                            name="quantity"
                            placeholder="Số lượng"
                            min={1}
                          />
                        </FormItemGlobal>
                      </Col>
                    </Row>

                    <Row gutter={[32, 0]}>
                      <Col span={12}>
                        <FormItemGlobal name="cccd" label="CCCD" required>
                          <InputFormikGlobal
                            name="cccd"
                            placeholder="CCCD"
                            disabled
                          />
                        </FormItemGlobal>
                      </Col>
                      <Col span={12}>
                        <FormItemGlobal
                          name="gender"
                          label="Giới tính"
                          required
                        >
                          <SelectFormikGlobal
                            name="gender"
                            placeholder="Giới tính"
                            options={[
                              { label: "Nam", value: EGender.Male },
                              { label: "Nữ", value: EGender.Female },
                              { label: "Khác", value: EGender.Other },
                            ]}
                            disabled
                          />
                        </FormItemGlobal>
                      </Col>
                    </Row>

                    <Row gutter={[32, 0]}>
                      <Col span={12}>
                        <FormItemGlobal
                          name="checkin"
                          label="Check-in"
                          required
                        >
                          <DatePickerFormikGlobal
                            name="checkin"
                            allowClear={false}
                            disabledDate={(d) =>
                              d <= moment().subtract(1, "days") ||
                              d >= formikProps.values.checkout
                            }
                            onChange={(date) => {
                              formikProps.setFieldValue(
                                "checkin",
                                date?.startOf("day")
                              );
                            }}
                          />
                        </FormItemGlobal>
                      </Col>
                      <Col span={12}>
                        <FormItemGlobal
                          name="checkout"
                          label="Check-out"
                          required
                        >
                          <DatePickerFormikGlobal
                            name="checkout"
                            allowClear={false}
                            disabledDate={(d) =>
                              d <= formikProps.values.checkin
                            }
                            onChange={(date) => {
                              formikProps.setFieldValue(
                                "checkout",
                                date?.startOf("day")
                              );
                            }}
                          />
                        </FormItemGlobal>
                      </Col>
                    </Row>
                    <span className="font-bold">
                      Số tiền thanh toán:{" "}
                      {calculateNight(
                        formikProps.values.checkin,
                        formikProps.values.checkout
                      )}{" "}
                      VNĐ
                    </span>
                    <Divider />
                    <div className="mt-5">
                      <span className="font-bold">Phương thức thanh toán</span>
                      <FormItemGlobal name="paymentType" required>
                        <RadioGroupFormikGlobal
                          name="paymentType"
                          options={[
                            { label: "Momo", value: "Momo" },
                            { label: "Vnpay", value: "Vnpay" },
                            { label: "Zalopay", value: "Zalopay" },
                          ]}
                        />
                      </FormItemGlobal>
                    </div>
                  </Col>
                </Row>
              </FormGlobal>
            </>
          </ModalGlobal>
        );
      }}
    </Formik>
  );
}
