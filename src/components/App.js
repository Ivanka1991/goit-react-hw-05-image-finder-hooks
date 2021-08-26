import React, { Component } from "react";
import "../index.css";
import { ToastContainer } from "react-toastify";
import api from "./services/picture-api";
import ImageGallery from "./ImageGallery/ImageGallery";
import Button from "./Button/Button";
import Searchbar from "./Searchbar/Searchbar";
import Spinner from "./Loader/Loader";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

class App extends Component {
  state = {
    error: null,
    status: "idle",
    requestKey: "",
    page: 1,
    images: [],
  };

  handleFormSubmit = (newRequestKey) => {
    this.setState({ requestKey: newRequestKey, page: 1, images: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.requestKey;
    const nextName = this.state.requestKey;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });
      this.fetchPicture();
    }
    if (prevState.page !== this.state.page && this.state.page > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }

  fetchPicture = () => {
    const { requestKey, page } = this.state;

    api
      .fetchPicture(requestKey, page)
      .then((response) =>
        this.setState((prevState) => ({
          images: [...prevState.images, ...response.hits],
          page: prevState.page + 1,
        }))
      )
      .catch((error) => this.setState({ error, status: Status.REJECTED }))
      .finally(() => this.setState({ status: Status.RESOLVED }));
  };

  render() {
    const { status } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        <ToastContainer autoClose={3000} />
        {status === Status.IDLE && (
          <p className="welcomeText">Please enter your search term</p>
        )}

        {status === Status.PENDING && <Spinner />}

        {status === Status.RESOLVED && (
          <>
            <ImageGallery images={this.state.images} />
            <Button onClick={this.fetchPicture} />
          </>
        )}
      </>
    );
  }
}

export default App;
