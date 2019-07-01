import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Reviews extends Component {
  state = {
    reviews: [],
    reviewerName: "",
    summary: "",
    reviewText: ""
  };

  componentDidMount() {
    this.loadReviews();
  }

  loadReviews = () => {
    API.getReviews()
      .then(res =>
        this.setState({ reviews: res.data, reviewerName: "", summary: "", reviewText: "" })
      )
      .catch(err => console.log(err));
  };

  deleteReview = id => {
    API.deleteReview(id)
      .then(res => this.loadReviews())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.reviewerName && this.state.summary) {
      API.saveReview({
        reviewerName: this.state.reviewerName,
        summary: this.state.summary,
        reviewText: this.state.reviewText
      })
        .then(res => this.loadReviews())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Reviews Should I Consider?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.reviewerName}
                onChange={this.handleInputChange}
                name="reviewerName"
                placeholder="ReviewerName (required)"
              />
              <Input
                value={this.state.summary}
                onChange={this.handleInputChange}
                name="summary"
                placeholder="Summary (required)"
              />
              <TextArea
                value={this.state.reviewText}
                onChange={this.handleInputChange}
                name="reviewText"
                placeholder="ReviewText (Optional)"
              />
              <FormBtn
                disabled={!(this.state.summary && this.state.reviewerName)}
                onClick={this.handleFormSubmit}
              >
                Submit Review
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Reviews On My List</h1>
            </Jumbotron>
            {this.state.reviews.length ? (
              <List>
                {this.state.reviews.map(review => (
                  <ListItem key={review._id}>
                    <Link to={"/reviews/" + review._id}>
                      <strong>
                        {review.reviewerName} by {review.summary}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteReview(review._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Reviews;
