import * as Yup from "yup";

const CheckInfoValidation = Yup.object().shape({
  username: Yup.string().trim().required("Tên không được để trống"),
  phone: Yup.string().trim().required("Số điện thoại không được để trống"),
  cccd: Yup.string().trim().required("CCCD không được để trống"),
  address: Yup.string().trim().required("Địa chỉ không được để trống"),
});

export { CheckInfoValidation };
