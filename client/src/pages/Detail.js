import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Detail extends Component {
  state = {
    review: {}
  };
  // When this component mounts, grab the review with the _id of this.props.match.params.id
  // e.g. localhost:3000/reviews/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getReview(this.props.match.params.id)
      .then(res => this.setState({ review: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.review.reviewerName} by {this.state.review.summary}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Review Text</h1>
              <p>
                {this.state.review.reviewText}
              </p>
            </article>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Summary</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
