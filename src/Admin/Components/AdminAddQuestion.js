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

import {
  CREATE_CANDIDATE_SUCCESS,
  ADD_QUESTION_SUCCESS
} from "../Actions/Admin.actions";

import { ADMIN_AUTH_LOCAL_STORAGE } from "../../Utils/Contaants";
const TEXT_BOX = "Textbox";
const RADIO = "Radio";
const CHECKBOX = "Checkbox";
export default class AdminAddQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      showToast: false,
      questionType: RADIO,
      question: "",
      options: [],
      optionsText: ""
    };
  }
  componentWillMount() {
    const userToken = localStorage.getItem(ADMIN_AUTH_LOCAL_STORAGE);
    if (!userToken) {
      this.props.history.push(ADMIN_LOGIN);
    }
  }
  hideToast = () => {
    this.setState({ showToast: false });
  };
  goToHome = () => {
    this.props.history.push(HOME_ROUTE);
  };
  changeQuestionType = type => {
    this.setState({
      questionType: type
    });
  };
  onAddOption = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      const currentQuestions = this.state.options;
      currentQuestions.push(this.state.optionsText);
      this.setState({
        options: currentQuestions,
        optionsText: ""
      });
    }
  };

  removeOption = index => {
    const currentQuestions = this.state.options;
    currentQuestions.splice(index, 1);
    this.setState({
      options: currentQuestions
    });
  };
  createCandidate = async () => {
    const payload = {
      candidateId: this.props.match.params.candidateId,
      question: this.state.question,
      questionType: this.state.questionType,
      options: this.state.options
    };
    const addQuestion = await this.props.addQuestion(payload);

    if (addQuestion.type === ADD_QUESTION_SUCCESS) {
      this.setState({
        showToast: true,
        questionType: RADIO,
        question: "",
        options: [],
        optionsText: ""
      });
      setTimeout(() => {
        this.hideToast();
      }, 2000);
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
                <h3>Add Question</h3>

                <Form.Group controlId="formBasicQuestion">
                  <Form.Label>Question </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="Candidate name"
                    value={this.state.question}
                    onChange={value =>
                      this.setState({
                        question: value.target.value
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Question Type</Form.Label>
                  <div>
                    <div
                      onClick={() => {
                        this.changeQuestionType(CHECKBOX);
                      }}
                    >
                      <input
                        type="radio"
                        value={CHECKBOX}
                        checked={this.state.questionType === CHECKBOX}
                      />
                      {CHECKBOX}
                    </div>
                    <div
                      onClick={() => {
                        this.changeQuestionType(RADIO);
                      }}
                    >
                      <input
                        type="radio"
                        value={RADIO}
                        checked={this.state.questionType === RADIO}
                      />
                      {RADIO}
                    </div>
                    <div
                      onClick={() => {
                        this.changeQuestionType(TEXT_BOX);
                      }}
                    >
                      <input
                        type="radio"
                        value={TEXT_BOX}
                        checked={this.state.questionType === TEXT_BOX}
                      />
                      {TEXT_BOX}
                    </div>
                  </div>
                </Form.Group>

                <Form.Group controlId="formBasicOtions">
                  <Form.Label>Options</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Option"
                    value={this.state.optionsText}
                    onKeyUp={value => this.onAddOption(value)}
                    onChange={value =>
                      this.setState({
                        optionsText: value.target.value
                      })
                    }
                  />
                  <Form.Text>Type And then Press enter to add more</Form.Text>
                  <Form.Text>
                    {this.state.options.map((item, i) => {
                      return (
                        <Button
                          variant="outline-primary"
                          key={i}
                          onClick={() => {
                            this.removeOption(i);
                          }}
                          type="button"
                        >
                          {item}
                          <Badge variant="light">*</Badge>
                          <span className="sr-only">{item}</span>
                        </Button>
                      );
                    })}
                  </Form.Text>
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={() => this.createCandidate()}
                  type="button"
                >
                  Create
                </Button>
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
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>Question Created</Toast.Body>
        </Toast>
      </div>
    );
  }
}
