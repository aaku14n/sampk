import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Toast from "react-bootstrap/Toast";
import Select from "react-select";
import {
  CREATE_CANDIDATE_SUCCESS,
  CREATE_SURVEY_SUCCESS
} from "../Admin/Actions/Admin.actions";
const TEXT_BOX = "Textbox";
const RADIO = "Radio";
const CHECKBOX = "Checkbox";
const JOBS = [
  "Farmer",
  "Jobless",
  "Employee",
  "Businessmen",
  "Labour",
  "Force",
  "Police",
  "Student"
];
export default class Survey extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedCandidate: "",
      surveyOutput: [],
      gender: "Male",
      showToast: false
    };
  }
  getInitialData = async () => {
    const candidateRes = await this.props.getAllCandidates();
    const selectedCandidate = candidateRes.candidates.find(
      cd => cd._id === this.props.match.params.candidateId
    );
    this.setState({
      selectedCandidate
    });
  };
  componentDidMount() {
    this.getInitialData();
  }

  hideToast = () => {
    this.setState({ showToast: false });
  };
  addAnswer = (questionObj, answer) => {
    const currentSurveyState = this.state.surveyOutput;
    const index = currentSurveyState.findIndex(item => {
      return item.questionId === questionObj._id;
    });

    if (index < 0) {
      currentSurveyState.push({
        questionId: questionObj._id,
        answer: [answer]
      });
    } else {
      if (questionObj.questionType === CHECKBOX) {
        const indexAnswer = currentSurveyState[index].answer.findIndex(i => {
          return 1 === answer;
        });
        if (indexAnswer < 0) {
          currentSurveyState[index].answer.push(answer);
        } else {
          currentSurveyState[index].answer.splice(indexAnswer, 1);
        }
      } else {
        currentSurveyState[index].answer = [answer];
      }
    }
    this.setState({ surveyOutput: currentSurveyState });
  };
  addTextAnswer = (questionObj, answer) => {
    const currentSurveyState = this.state.surveyOutput;
    const index = currentSurveyState.findIndex(item => {
      return item.questionId === questionObj._id;
    });

    if (index < 0) {
      currentSurveyState.push({
        questionId: questionObj._id,
        answer: answer
      });
    } else {
      currentSurveyState[index].answer = answer;
    }
    this.setState({ surveyOutput: currentSurveyState });
  };
  createSurvey = async () => {
    const payload = {
      candidateId: this.props.match.params.candidateId,
      surveyInfo: {
        age: this.state.age,
        block: this.state.block,

        boothNo: this.state.boothNo,
        contactNo: this.state.contactNo,
        gender: this.state.gender,
        job: this.state.job,
        name: this.state.name,
        panchayat: this.state.panchayat
      },
      answers: this.state.surveyOutput
    };
    const surveyRes = await this.props.createSurvey(payload);
    console.log(surveyRes);
    if (surveyRes.type === CREATE_SURVEY_SUCCESS) {
      this.setState({
        showToast: true,
        age: "",
        block: "",

        boothNo: "",
        contactNo: "",
        gender: "",
        job: "",
        name: "",
        panchayat: "",
        surveyOutput: []
      });
    }
  };
  renderQuestionCard = (questionObj, id) => {
    return (
      <Card
        key={id}
        style={{
          marginBottom: "10px"
        }}
      >
        <Card.Header>Question {id + 1}</Card.Header>
        <Card.Body>
          <Card.Title>{questionObj.question}</Card.Title>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Options</Form.Label>
            {[CHECKBOX, RADIO].includes(questionObj.questionType) ? (
              questionObj.options.map((option, idx) => {
                const answerObj = this.state.surveyOutput.find(question => {
                  return question.questionId === questionObj._id;
                });

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      this.addAnswer(questionObj, option);
                    }}
                  >
                    <input
                      type="radio"
                      value={option}
                      checked={answerObj && answerObj.answer.includes(option)}
                    />
                    {option}
                  </div>
                );
              })
            ) : (
              <Form.Group controlId="formBasicQuestion">
                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Answer"
                  value={this.state.question}
                  onChange={value =>
                    this.addTextAnswer(questionObj, value.target.value)
                  }
                />
              </Form.Group>
            )}
          </Form.Group>
        </Card.Body>
      </Card>
    );
  };
  renderBasicFormDetails = () => {
    return (
      <div>
        <Form.Group controlId="formBasicQuestion">
          <Form.Label>Name</Form.Label>
          <Form.Control
            as="input"
            rows="3"
            placeholder="Name"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicQuestion">
          <Form.Label>Age</Form.Label>
          <Form.Control
            as="input"
            type="number"
            placeholder="Age"
            value={this.state.age}
            onChange={value => this.setState({ age: event.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicQuestion">
          <Form.Label>Gender</Form.Label>
          <Row>
            <Col>
              <div
                onClick={() => {
                  this.setState({ gender: "Male" });
                }}
              >
                <input type="radio" checked={this.state.gender === "Male"} />
                Male
              </div>
            </Col>
            <Col>
              <div
                onClick={() => {
                  this.setState({ gender: "Female" });
                }}
              >
                <input type="radio" checked={this.state.gender === "Female"} />
                Female
              </div>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="formBasicQuestion">
          <Form.Label>Block</Form.Label>
          <Form.Control
            as="input"
            rows="3"
            placeholder="Name"
            value={this.state.block}
            onChange={event => this.setState({ block: event.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicQuestion">
          <Form.Label>Panchayat</Form.Label>
          <Select
            options={
              this.state.selectedCandidate &&
              this.state.selectedCandidate.panchayat &&
              this.state.selectedCandidate.panchayat.map(item => {
                return {
                  value: item,
                  label: item
                };
              })
            }
            onChange={value => this.setState({ panchayat: value.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicQuestion">
          <Form.Label>Job</Form.Label>
          <Select
            options={JOBS.map(job => {
              return {
                value: job,
                label: job
              };
            })}
            onChange={value => this.setState({ job: value.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicQuestion">
          <Form.Label>Both No.</Form.Label>
          <Form.Control
            as="input"
            type="number"
            placeholder="Booth No"
            value={this.state.boothNo}
            onChange={event => this.setState({ boothNo: event.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasicQuestion">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            as="input"
            type="number"
            placeholder="Contact"
            value={this.state.contactNo}
            onChange={value => this.setState({ contactNo: value.target.value })}
          />
        </Form.Group>
      </div>
    );
  };
  render() {
    return (
      <div>
        <Navbar bg="light" expand="md">
          <Navbar.Brand onClick={this.goToHome}>Smapark Kranti</Navbar.Brand>
          <Nav as="ul" bg="light" expand="lg">
            <Nav.Item as="li">
              <Nav.Link onClick={this.goToHome}>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link onClick={this.logout}>Log out</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar>
        <Container className="mt-4">
          <Jumbotron>
            <Row>
              <Col md={3} />
              <Col md={6}>
                {this.renderBasicFormDetails()}
                {this.state.selectedCandidate &&
                  this.state.selectedCandidate.questions.map((question, id) => {
                    return this.renderQuestionCard(question, id);
                  })}

                <Button
                  variant="primary"
                  onClick={() => this.createSurvey()}
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
          </Toast.Header>
          <Toast.Body>Survey Created</Toast.Body>
        </Toast>
      </div>
    );
  }
}
