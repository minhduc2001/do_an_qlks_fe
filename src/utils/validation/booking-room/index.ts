import * as Yup from "yup";
import { REG_PHONE } from "./reg";

const BookingRoomValidation = Yup.object().shape({
  username: Yup.string().trim().required("Họ tên không được để trống"),
  email: Yup.string()
    .trim()
    .required("Email không được để trống")
    .email("Email không đúng định dạng"),
  phone: Yup.string()
    .trim()
    .required("Số điện thoại không được để trống")
    .matches(REG_PHONE, "Số điện thoại không đúng định dạng"),
});

export { BookingRoomValidation };
