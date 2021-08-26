import React, { Component } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";

class Searchbar extends Component {
  state = {
    requestKey: "",
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleRequestChange = (event) => {
    this.setState({ requestKey: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.requestKey.trim() === "") {
      toast("Enter your query!");
      return;
    }
    this.props.onSubmit(this.state.requestKey);
    this.setState({ requestKey: "" });
  };
  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.requestKey}
            onChange={this.handleRequestChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
