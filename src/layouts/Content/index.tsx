import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import FloatButton from "@/components/FloatButton/FloatButton";
import ModalSearchRoom from "@/components/ModalSearchRoom";
import { Outlet } from "react-router-dom";

export default function Content() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <div>
      <Header />
      <Outlet></Outlet>
      <Footer />
      <FloatButton onClick={() => setIsOpenModal((prev) => !prev)} />
      <ModalSearchRoom
        isOpenModal={isOpenModal}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
}
