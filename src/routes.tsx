import React from "react";
import { PUBLIC_ROUTES } from "./lazyLoading";
import { Route, Routes } from "react-router-dom";
import { Spin } from "antd";
import Login from "./pages/Login";
import Content from "./layouts/Content";

const SuspenseWrapper = (props: SuspenseWrapperProps) => {
  return <React.Suspense fallback={<Spin />}>{props.children}</React.Suspense>;
};

function MainRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/" element={<Content />}>
        {PUBLIC_ROUTES.map((route) => (
          <Route
            path={route.path}
            key={route.path}
            element={
              <SuspenseWrapper>
                <route.component />
              </SuspenseWrapper>
            }
          />
        ))}
      </Route>
    </Routes>
  );
}

export default MainRoutes;
