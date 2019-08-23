import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Nav from "react-bootstrap/Nav";
import { ADMIN_LOGIN, SURVEY_SUFFIX } from "../Utils/RouteUrl";
class LandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCandidate: ""
    };
  }
  adminLogin = () => {
    this.props.history.push(ADMIN_LOGIN);
  };
  componentDidMount() {
    this.props.getAllCandidates();
  }
  selectCandidate = value => {
    this.setState({ selectedCandidate: value });
  };
  goToSurvey = () => {
    this.props.history.push(
      `${SURVEY_SUFFIX}/${this.state.selectedCandidate.value}`
    );
  };
  render() {
    return (
      <div
        style={{
          height: "100vh",
          backgroundColor: "#e8ecef"
        }}
      >
        <Jumbotron>
          {this.props.candidates && (
            <Container>
              <h2>Please Select your candidate here.</h2>
              <Select
                options={this.props.candidates.map(c => {
                  return {
                    value: c._id,
                    label: c.name
                  };
                })}
                onChange={value => this.selectCandidate(value)}
              />
              <Button
                variant="primary"
                size="md"
                style={{ marginTop: "10px" }}
                onClick={() => {
                  this.goToSurvey();
                }}
              >
                Start Survey
              </Button>
            </Container>
          )}
          <Nav
            className="justify-content-end"
            style={{
              position: "fixed",
              bottom: 0,
              right: 0
            }}
          >
            <Nav.Item>
              <Nav.Link onClick={this.adminLogin}>Admin Portal</Nav.Link>
            </Nav.Item>
          </Nav>
        </Jumbotron>
      </div>
    );
  }
}
export default LandingPage;
