import { useMemo, useRef } from "react";
import { Formik, FormikProps } from "formik";
import { Col, Empty, Row } from "antd";
import FormGlobal, {
  DatePickerFormikGlobal,
  FormItemGlobal,
} from "../FormGlobal";
import ModalGlobal from "../ModalGlobal";
import moment, { Moment } from "moment";
import ApiRoom, { ICheckTypeRoom } from "@/api/ApiRoom";
import { useMutation, useQuery } from "@tanstack/react-query";

import ButtonGlobal from "../ButtonGlobal";
import Notification from "../Notification";
import { useNavigate } from "react-router-dom";

import "./index.scss";

interface ISearchValue {
  check_in: Moment;
  check_out: Moment;
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
  const navigate = useNavigate();

  const initialValues: ISearchValue = {
    check_in: moment().startOf("day"),
    check_out: moment().startOf("day").add(1, "day"),
  };

  const onCancel = () => {
    innerRef.current?.resetForm();
    handleCloseModal();
  };

  const checkTypeRoom = useMutation(ApiRoom.checkTypeRoom);

  const handleSubmit = (values: ISearchValue) => {
    const newValues = {
      ...values,
      check_in: new Date(moment(values.check_in).format("YYYY-MM-DD")),
      check_out: new Date(moment(values.check_out).format("YYYY-MM-DD")),
    } as ICheckTypeRoom;

    checkTypeRoom.mutate(newValues);
  };

  const handleClick = (slug: string) => {
    navigate("/room/" + slug);
    onCancel();
  };

  return (
    <ModalGlobal
      open={isOpenModal}
      title="Kiểm tra phòng trống"
      onOk={onCancel}
      onCancel={onCancel}
      width={1000}
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
                        name={"check_in"}
                        label="Check in"
                        required
                      >
                        <DatePickerFormikGlobal
                          name="check_in"
                          placeholder="Check-in"
                          allowClear={false}
                          disabledDate={(d) =>
                            d <= moment().subtract(1, "days") ||
                            d >= values.check_out
                          }
                          onChange={(date) => {
                            setFieldValue("check_in", date?.startOf("day"));
                          }}
                        />
                      </FormItemGlobal>
                    </Col>
                    <Col span={24}>
                      <FormItemGlobal
                        name="check_out"
                        label="Check-out"
                        required
                      >
                        <DatePickerFormikGlobal
                          name="check_out"
                          placeholder="Check-out"
                          allowClear={false}
                          disabledDate={(d) => d <= values.check_in}
                          onChange={(date) => {
                            setFieldValue("check_out", date?.startOf("day"));
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
                    {checkTypeRoom?.data && checkTypeRoom.data.length ? (
                      <Row className="w-full" gutter={[0, 10]}>
                        {checkTypeRoom.data.map((data, index) => {
                          return (
                            data && (
                              <Col
                                key={index}
                                span={24}
                                className="col-data"
                                onClick={() => {
                                  handleClick(data?.type_room?.slug);
                                }}
                              >
                                <span>Loại: {data?.type_room?.name}</span>
                                <span>Còn trống: {data?.c}</span>
                              </Col>
                            )
                          );
                        })}
                      </Row>
                    ) : (
                      <Empty></Empty>
                    )}
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
