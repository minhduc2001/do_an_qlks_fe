import "./index.scss";

interface SubHeaderProps {
  title: string;
  description: string;
  image?: string;
}

const SubHeader = (props: SubHeaderProps) => {
  const image =
    "https://ninhbinhlegendhotel.com/wp-content/uploads/2022/08/IMG_3519-1-scaled.jpg";

  return (
    <>
      <div className={`w-full sub-header bg-[url('${image}')]`}>
        <div className="wrap-info text-white">
          <h2 className="text-center text-white">{props.title}</h2>
          <p>{props.description}</p>
        </div>
      </div>
    </>
  );
};

export default SubHeader;
