import { useNavigate } from "react-router-dom";
import ModalGlobal from "../ModalGlobal";

interface ModalNotiLoginProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
}
export default function ModalNotiLogin({
  isOpenModal,
  handleCloseModal,
}: ModalNotiLoginProps) {
  const onCancel = () => {
    handleCloseModal();
  };

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/login");
  };

  return (
    <ModalGlobal
      open={isOpenModal}
      title="Thông báo"
      onOk={handleSubmit}
      onCancel={onCancel}
      width={500}
    >
      <>Hãy đăng nhập để đặt phòng!</>
    </ModalGlobal>
  );
}
