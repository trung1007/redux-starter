import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ModalComponent from "./modal";

const ButtonOption = ({ option, id }: any) => {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [isShow, setIsShow] = useState(false);

  const handleOnClick = () => {
    setIsShow(true);
  };

  const handleOnClose = () => {
    setIsShow(false);
  };

  useEffect(() => {
    switch (option) {
      case "create":
        setTitle("Add New");
        setTheme("primary");
        break;
      case "edit":
        setTitle("Edit");
        setTheme("warning");
        break;
      case "delete":
        setTitle("Delete");
        setTheme("danger");
        break;
      default:
        break;
    }
  }, [option]);

  return (
    <>
      <Button style={{ height: 40 }} variant={theme} onClick={handleOnClick}>
        {title}
      </Button>
      {isShow ? (
        <ModalComponent
          option={option}
          isShow={isShow}
          onClose={handleOnClose}
          id={id}
        />
      ) : null}
    </>
  );
};

export default ButtonOption;
