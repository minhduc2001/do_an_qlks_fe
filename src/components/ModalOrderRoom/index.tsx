import { useEffect, useRef } from "react";
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
import ApiRoom, { EPaymentType, IBookRoomBody, IRoomRes } from "@/api/ApiRoom";
import { useMutation, useQuery } from "@tanstack/react-query";
import Notification from "../Notification";
import { BookingRoomValidation } from "@/utils/validation/booking-room";
import { REG_EMAIL } from "@/utils/validation/booking-room/reg";
import ApiUser, { EGender } from "@/api/ApiUser";
import store from "@/redux/store";
import ApiPromotion from "@/api/ApiPromotion";

interface IRoomValue {
  username: string;
  gender: EGender;
  email: string;
  phone: string;
  check_in: Moment;
  check_out: Moment;
  type_room_id: number;
  payment_type: EPaymentType;
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
    username: "",
    gender: EGender.Other,
    email: "",
    phone: "",
    check_in: moment().startOf("day"),
    check_out: moment().startOf("day").add(1, "day"),
    type_room_id: roomSelected.id ?? 1,
    payment_type: EPaymentType.Vnpay,
    quantity: 1,
  };

  const onCancel = () => {
    innerRef.current?.resetForm();
    handleCloseModal();
  };
  const getPromotionMutation = useMutation(ApiPromotion.getPromotion);
  const calculateNight = (sd: Moment, ed: Moment) => {
    let discount = 0;
    const amount =
      ed.diff(sd, "days") *
      (roomSelected.price ?? 0) *
      (innerRef.current?.values.quantity ?? 0);
    if (
      getPromotionMutation.data &&
      getPromotionMutation.data.discount <= amount
    ) {
      discount = amount - (amount * getPromotionMutation.data.discount) / 100;
    }

    return {
      current: amount,
      discount: discount,
      diff: amount === discount,
    };
  };

  const bookRoomMutation = useMutation(ApiRoom.bookRoom);
  const handleSubmit = (values: IRoomValue) => {
    const newValues = {
      quantity: values.quantity,
      check_in: new Date(values.check_in.format("YYYY-MM-DD")),
      check_out: new Date(values.check_out.format("YYYY-MM-DD")),
      payment_method: values.payment_type,
      type_room_id: roomSelected.id,
    };

    bookRoomMutation.mutate(newValues as IBookRoomBody, {
      onSuccess: (response) => {
        Notification.notificationSuccess("Vui lòng hoàn tất thủ tục đặt phòng");
        window.open(response, "_blank");
        onCancel();
      },
    });
  };

  const getMeMutation = useMutation(ApiUser.getMe);

  const { user } = store.getState();

  useEffect(() => {
    if (user?.id) {
      getMeMutation.mutate();
    }
  }, [user]);

  useEffect(() => {
    getPromotionMutation.mutate(new Date());
  }, []);

  return (
    <Formik
      innerRef={innerRef}
      initialValues={{
        ...initialValues,
        ...getMeMutation.data,
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
                        <FormItemGlobal
                          name="check_in"
                          label="Check-in"
                          required
                        >
                          <DatePickerFormikGlobal
                            name="check_in"
                            allowClear={false}
                            disabledDate={(d) =>
                              d <= moment().subtract(1, "days") ||
                              d >= formikProps.values.check_out
                            }
                            onChange={(date) => {
                              getPromotionMutation.mutate(
                                new Date(
                                  date?.startOf("day").format("YYYY-MM-DD") ??
                                    ""
                                )
                              );
                              formikProps.setFieldValue(
                                "check_in",
                                date?.startOf("day")
                              );
                            }}
                          />
                        </FormItemGlobal>
                      </Col>
                      <Col span={12}>
                        <FormItemGlobal
                          name="check_out"
                          label="Check-out"
                          required
                        >
                          <DatePickerFormikGlobal
                            name="check_out"
                            allowClear={false}
                            disabledDate={(d) =>
                              d <= formikProps.values.check_in
                            }
                            onChange={(date) => {
                              formikProps.setFieldValue(
                                "check_out",
                                date?.startOf("day")
                              );
                            }}
                          />
                        </FormItemGlobal>
                      </Col>
                    </Row>

                    {!calculateNight(
                      formikProps.values.check_in,
                      formikProps.values.check_out
                    ).diff ? (
                      <>
                        <span className="font-bold line-through">
                          Giá gốc:{" "}
                          {calculateNight(
                            formikProps.values.check_in,
                            formikProps.values.check_out
                          ).current.toLocaleString()}{" "}
                          VNĐ
                        </span>

                        <span className="font-bold ml-20">
                          Số tiền thanh toán:{" "}
                          {calculateNight(
                            formikProps.values.check_in,
                            formikProps.values.check_out
                          ).discount.toLocaleString()}{" "}
                          VNĐ
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-bold">
                          Số tiền thanh toán:{" "}
                          {calculateNight(
                            formikProps.values.check_in,
                            formikProps.values.check_out
                          ).current.toLocaleString()}{" "}
                          VNĐ
                        </span>
                      </>
                    )}

                    <Divider />
                    <div className="mt-5">
                      <span className="font-bold">Phương thức thanh toán</span>
                      <FormItemGlobal name="payment_type" required>
                        <RadioGroupFormikGlobal
                          name="payment_type"
                          options={[
                            { label: "Momo", value: EPaymentType.Momo },
                            { label: "Vnpay", value: EPaymentType.Vnpay },
                            { label: "Zalopay", value: EPaymentType.Zalopay },
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
