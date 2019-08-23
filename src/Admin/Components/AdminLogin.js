import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { HOME_ROUTE, ADMIN_DASHBOARD } from "../../Utils/RouteUrl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ADMIN_LOGIN_SUCCESS } from "../Actions/Admin.actions";
import { ADMIN_AUTH_LOCAL_STORAGE } from "../../Utils/Contaants";

export default class AdminLogin extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  componentWillMount() {
    const userToken = localStorage.getItem(ADMIN_AUTH_LOCAL_STORAGE);
    if (userToken) {
      this.props.history.push(ADMIN_DASHBOARD);
    }
  }
  goToHome = () => {
    this.props.history.push(HOME_ROUTE);
  };
  login = async () => {
    const userLoginRes = await this.props.adminLogin(this.state);
    if (userLoginRes.type === ADMIN_LOGIN_SUCCESS) {
      this.props.history.push(ADMIN_DASHBOARD);
    }
  };
  render() {
    return (
      <div>
        <Nav as="ul">
          <Nav.Item as="li">
            <Nav.Link onClick={this.goToHome}>Home</Nav.Link>
          </Nav.Item>
        </Nav>
        <Container width="50%">
          <Row>
            <Col md={3} />
            <Col md={6}>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter email"
                    onChange={value =>
                      this.setState({
                        email: value.target.value
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={value =>
                      this.setState({
                        password: value.target.value
                      })
                    }
                  />
                </Form.Group>

                <Button variant="primary" onClick={this.login}>
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
