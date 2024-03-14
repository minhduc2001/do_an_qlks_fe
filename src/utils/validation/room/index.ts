import * as Yup from "yup";

const CheckRoomValidation = Yup.object().shape({
  type_room_id: Yup.string().trim().required("Loại phòng không được để trống"),
});

export { CheckRoomValidation };
