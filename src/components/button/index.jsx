import "./button.scss";
function Button({ props }) {
  return (
    <button
      className={`btn ${props.className}`}
      onclick={props.onclick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  );
}

const outlineButton = (props) => {
  return (
    <button
      className={`btn-outline ${props.className}`}
      onclick={props.onclick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  );
};

// Button.prototype = {
//   onclick: Proptypes.func,
// };

export default Button;
