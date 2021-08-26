import { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <button onClick={this.props.onClick} className="Button" type="button">
        Load more
      </button>
    );
  }
}

export default Button;

/* window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  }); */
