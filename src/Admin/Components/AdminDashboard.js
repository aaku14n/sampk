import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import {
  HOME_ROUTE,
  ADMIN_LOGIN,
  ADD_QUESTION_SUFFIX
} from "../../Utils/RouteUrl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Toast from "react-bootstrap/Toast";
import { ADMIN_AUTH_LOCAL_STORAGE } from "../../Utils/Contaants";
import { CREATE_CANDIDATE_SUCCESS } from "../Actions/Admin.actions";

export default class AdminDashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      panchayat: [],
      panchayatText: "",
      location: "",
      showToast: false
    };
  }
  componentWillMount() {
    const userToken = localStorage.getItem(ADMIN_AUTH_LOCAL_STORAGE);
    if (!userToken) {
      this.props.history.push(ADMIN_LOGIN);
    }
  }
  hideToast = () => {
    this.setState({
      showToast: false
    });
  };
  onAddPanchayat = event => {
    if (event.keyCode === 13) {
      const currentPanchayats = this.state.panchayat;
      currentPanchayats.push(this.state.panchayatText);
      this.setState({
        panchayat: currentPanchayats,
        panchayatText: ""
      });
    }
  };
  removePanchayat = index => {
    const currentPanchayats = this.state.panchayat;
    currentPanchayats.splice(index, 1);
    this.setState({
      panchayat: currentPanchayats
    });
  };

  createCandidate = async () => {
    const createCandidateRes = await this.props.createCandidate(this.state);

    if (createCandidateRes.type === CREATE_CANDIDATE_SUCCESS) {
      this.setState({
        showToast: true,
        name: "",
        panchayat: [],
        panchayatText: "",
        location: ""
      });

      this.props.history.push(
        `${ADD_QUESTION_SUFFIX}/${createCandidateRes.candidateDetails._id}`
      );
    }
  };
  render() {
    return (
      <div>
        <Nav as="ul">
          <Nav.Item as="li">
            <Nav.Link onClick={this.goToHome}>Home</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link onClick={this.logout}>Log out</Nav.Link>
          </Nav.Item>
        </Nav>
        <Container>
          <Jumbotron>
            <Row>
              <Col md={3} />
              <Col md={6}>
                <h3>Create New Candidate</h3>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Candidate Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Candidate name"
                      onChange={value =>
                        this.setState({
                          name: value.target.value
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Place</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Place"
                      onChange={value =>
                        this.setState({
                          location: value.target.value
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Panchayat</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Panchayat"
                      value={this.state.panchayatText}
                      onKeyUp={value => this.onAddPanchayat(value)}
                      onChange={value =>
                        this.setState({
                          panchayatText: value.target.value
                        })
                      }
                    />
                    <Form.Text>Type And then Press enter to add more</Form.Text>
                    <Form.Text>
                      {this.state.panchayat.map((item, i) => {
                        return (
                          <Button
                            variant="outline-primary"
                            key={i}
                            onClick={() => {
                              this.removePanchayat(i);
                            }}
                          >
                            {item}
                            <Badge variant="light">*</Badge>
                            <span className="sr-only">{item}</span>
                          </Button>
                        );
                      })}
                    </Form.Text>
                  </Form.Group>

                  <Button variant="primary" onClick={this.createCandidate}>
                    Create
                  </Button>
                </Form>
              </Col>
            </Row>
          </Jumbotron>
        </Container>

        <Toast
          show={this.state.showToast}
          onClose={this.hideToast}
          style={{
            position: "fixed",
            top: "40px",
            right: "40px"
          }}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Success</strong>
            <small>1 mins ago</small>
          </Toast.Header>
          <Toast.Body>Candidate Created</Toast.Body>
        </Toast>
      </div>
    );
  }
}
