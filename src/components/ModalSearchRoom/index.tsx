import { useMemo, useRef } from "react";
import { Formik, FormikProps } from "formik";
import { Col, Empty, Row } from "antd";
import FormGlobal, {
  DatePickerFormikGlobal,
  FormItemGlobal,
  SelectFormikGlobal,
} from "../FormGlobal";
import ModalGlobal from "../ModalGlobal";
import moment, { Moment } from "moment";
import ApiRoom, { ICheckTypeRoom } from "@/api/ApiRoom";
import { useMutation, useQuery } from "@tanstack/react-query";

import ButtonGlobal from "../ButtonGlobal";
import { CheckRoomValidation } from "@/utils/validation/room";
import Notification from "../Notification";
import { SearchOutlined } from "@ant-design/icons";

interface ISearchValue {
  type_room_id?: number;
  checkin: Moment;
  checkout: Moment;
}

interface IModalSearchRoomProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
}
export default function ModalSearchRoom({
  isOpenModal,
  handleCloseModal,
}: IModalSearchRoomProps) {
  const innerRef = useRef<FormikProps<ISearchValue>>(null);

  const initialValues: ISearchValue = {
    checkin: moment().startOf("day"),
    checkout: moment().startOf("day").add(1, "day"),
  };

  const onCancel = () => {
    innerRef.current?.resetForm();
    handleCloseModal();
  };

  const checkTypeRoom = useMutation(ApiRoom.checkTypeRoom);

  const handleSubmit = (values: ISearchValue) => {
    if (!values.type_room_id)
      Notification.notificationError("Dữ liệu đang không đúng");

    const newValues = {
      ...values,
      checkin: new Date(moment(values.checkin).format("YYYY-MM-DD")),
      checkout: new Date(moment(values.checkout).format("YYYY-MM-DD")),
    } as ICheckTypeRoom;

    checkTypeRoom.mutate(newValues);
  };

  const { data: room_types } = useQuery(["get_room_types"], () =>
    ApiRoom.getRooms()
  );

  const convertDataRoomTypes = useMemo(() => {
    return room_types?.results.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  }, [room_types]);

  return (
    <ModalGlobal
      open={isOpenModal}
      title="Kiểm tra phòng trống"
      onOk={onCancel}
      onCancel={onCancel}
    >
      <Formik
        innerRef={innerRef}
        initialValues={initialValues}
        enableReinitialize
        onSubmit={handleSubmit}
        // validationSchema={CheckRoomValidation}
      >
        {({ values, setFieldValue }): JSX.Element => {
          return (
            <FormGlobal>
              <Row gutter={[22, 0]} className="w-full">
                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      <FormItemGlobal
                        name={"type_room_id"}
                        label="Loại phòng"
                        required
                      >
                        <SelectFormikGlobal
                          name="type_room_id"
                          placeholder="Chọn loại phòng"
                          options={convertDataRoomTypes}
                        ></SelectFormikGlobal>
                      </FormItemGlobal>
                    </Col>
                    <Col span={24}>
                      <FormItemGlobal
                        name={"checkin"}
                        label="Check in"
                        required
                      >
                        <DatePickerFormikGlobal
                          name="checkin"
                          placeholder="Check-in"
                          allowClear={false}
                          disabledDate={(d) =>
                            d <= moment().subtract(1, "days") ||
                            d >= values.checkout
                          }
                          onChange={(date) => {
                            setFieldValue("checkin", date?.startOf("day"));
                          }}
                        />
                      </FormItemGlobal>
                    </Col>
                    <Col span={24}>
                      <FormItemGlobal
                        name="checkout"
                        label="Check-out"
                        required
                      >
                        <DatePickerFormikGlobal
                          name="checkout"
                          placeholder="Check-out"
                          allowClear={false}
                          disabledDate={(d) => d <= values.checkin}
                          onChange={(date) => {
                            setFieldValue("checkout", date?.startOf("day"));
                          }}
                        />
                      </FormItemGlobal>
                    </Col>
                    <Col span={24}>
                      <ButtonGlobal isLoading={checkTypeRoom.isLoading}>
                        Kiểm tra
                      </ButtonGlobal>
                    </Col>
                  </Row>
                </Col>
                <Col span={12}>
                  <div className="flex justify-center items-center h-full">
                    <Empty></Empty>
                  </div>
                </Col>
              </Row>
            </FormGlobal>
          );
        }}
      </Formik>
    </ModalGlobal>
  );
}
