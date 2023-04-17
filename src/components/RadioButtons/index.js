import "./style.css";

const RadioBtn = (props) => {
  const { name, id, value, setGameProps } = props;

  function radioButtonHandler(event) {
    const radioName = event.target.getAttribute("name");
    const radioValue = event.target.value;

    switch (radioName) {
      case "theme":
        setGameProps((state) => {
          return { ...state, theme: radioValue };
        });
        break;

      case "numberOfPlayers":
        setGameProps((state) => {
          return { ...state, numberOfPlayers: parseInt(radioValue) };
        });
        break;

      case "gridSize":
        setGameProps((state) => {
          return { ...state, gridSize: radioValue };
        });
        break;
    }
  }

  return (
    <>
      <input
        type="radio"
        name={name}
        value={value}
        className="radio__rating"
        id={id}
        onChange={radioButtonHandler}
      />
      <label htmlFor={id} className="radio__label radio__theme">
        <div className="label_text">{value.charAt(0).toUpperCase() + value.slice(1)}</div>
      </label>
    </>
  );
};

export default RadioBtn;
