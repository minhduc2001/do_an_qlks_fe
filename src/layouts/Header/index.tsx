import { Link } from "react-router-dom";
import "./index.scss";
import { PUBLIC_ROUTES } from "@/lazyLoading";
import { useEffect, useState } from "react";
import { Avatar, Button, Popover } from "antd";
import { LoginOutlined, SyncOutlined } from "@ant-design/icons";
import {
  useIsFetching,
  useIsMutating,
  useMutation,
} from "@tanstack/react-query";
import ApiUser from "@/api/ApiUser";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/slices/UserSlice";

function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const [active, setActive] = useState(window.location.pathname);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const hide = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    hide();
    dispatch(logoutUser());
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    setActive(window.location.pathname);
  }, [window.location.pathname]);

  const getMe = useMutation(ApiUser.getMe);

  useEffect(() => {
    if (ApiUser.isLogin()) getMe.mutate();
    else getMe.reset();
  }, [ApiUser.isLogin()]);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY >= 50;
      if (isScrolled !== isScroll) {
        setIsScroll(!isScroll);
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [isScroll]);

  const content = (
    <div className="group-button">
      <Button onClick={hide}>
        <Link to={"/user"}>Thông tin chung</Link>
      </Button>
      <Button onClick={handleLogout}>Đăng xuất</Button>
    </div>
  );

  return (
    <header className="header">
      <ul
        className={`nav-list flex justify-center items-center p-3 w-full relative ${
          isScroll && "scrolled"
        }`}
      >
        <li className="w-[80px] nav-item mr-20">
          <img
            src="https://ninhbinhlegendhotel.com/wp-content/uploads/2022/07/cropped-logo02.png"
            className="custom-logo w-full h-full"
            alt="Ninh Binh Legend Hotel"
            decoding="async"
            srcSet="https://ninhbinhlegendhotel.com/wp-content/uploads/2022/07/cropped-logo02.png 601w, https://ninhbinhlegendhotel.com/wp-content/uploads/2022/07/cropped-logo02-300x103.png 300w"
          />
        </li>
        {PUBLIC_ROUTES.map(
          (route) =>
            route.name && (
              <li
                key={route.path}
                className={`nav-item ${route.path === active && "active"}`}
              >
                <Link to={route.path} onClick={() => setActive(route.path)}>
                  {route.name}
                </Link>
              </li>
            )
        )}

        <li className="w-[80px] nav-item mt-1 ml-20">
          {getMe?.data?.id ? (
            <Popover
              open={open}
              content={content}
              trigger="click"
              className="cursor-pointer"
              placement={"bottom"}
              onOpenChange={handleOpenChange}
            >
              <Avatar src={getMe?.data?.avatar} />
            </Popover>
          ) : (
            <Link to={"/login"}>
              <LoginOutlined style={{ fontSize: 20 }} />
            </Link>
          )}
        </li>
        {isFetching + isMutating > 0 && (
          <span className="absolute top-1/2 transform -translate-y-1/2 right-[5px] flex item-center text-2xl text-white">
            <SyncOutlined spin />
          </span>
        )}
      </ul>
    </header>
  );
}

export default Header;
