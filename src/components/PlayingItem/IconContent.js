import iconMatch from "./IconMatch/IconMatch";

const IconContent = ({ number }) => {
  return <img src={iconMatch(number)} alt="" className="img_icon" />;
};

export default IconContent;
