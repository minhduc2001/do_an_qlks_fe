import { useNavigate } from "react-router-dom";
import ModalGlobal from "../ModalGlobal";

interface ModalNotiLoginProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  title: string;
  handleSubmit: () => void;
}
export default function ModalNotiLogin({
  isOpenModal,
  handleCloseModal,
  title,
  handleSubmit,
}: ModalNotiLoginProps) {
  const onCancel = () => {
    handleCloseModal();
  };

  return (
    <ModalGlobal
      open={isOpenModal}
      title="Thông báo"
      onOk={handleSubmit}
      onCancel={onCancel}
      width={500}
    >
      <>{title}!</>
    </ModalGlobal>
  );
}
