import { Helmet as HelmetWrapper } from "react-helmet";

function Helmet(props: HelmetProps) {
  return (
    <HelmetWrapper>
      <title>Khách sạn Ninh Bình| {props.title}</title>
      <meta name="description" content={props.description} />
    </HelmetWrapper>
  );
}

Helmet.defaultProps = {
  title: "Khách sạn Ninh Bình",
  description: "",
};

export default Helmet;
