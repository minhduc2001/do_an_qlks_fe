import { Image } from "antd";
import "./index.scss";

interface SubHeaderProps {
  title: string;
  description?: string;
  image?: string;
}

const SubHeader = (props: SubHeaderProps) => {
  const image =
    props.image ??
    "https://ninhbinhlegendhotel.com/wp-content/uploads/2022/08/IMG_3519-1-scaled.jpg";

  return (
    <>
      <div className={`w-full sub-header`}>
        <div className="h-[600px]">
          <Image
            src={image}
            preview={false}
            className="w-full h-[600px] object-cover"
          />
        </div>
        <div className="wrap-info1"></div>
        <div className="wrap-info text-white w-full">
          <h2 className="text-center text-white">{props.title}</h2>
          {props.description && <p>{props?.description}</p>}
        </div>
      </div>
    </>
  );
};

export default SubHeader;
