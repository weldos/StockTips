//React Imports
import React, { Fragment, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

//Bootstrap
import { Row, Col, Card, Form, Button } from "react-bootstrap";

//Redux
import { compose } from "redux";
import { connect } from "react-redux";

//Firebase
import {
  withFirestore,
  useFirestoreConnect,
  useFirestore,
} from "react-redux-firebase";

//FontAwesome and styling
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";


// Styles
const LightGreen = styled.div `
    color: lightgreen;

`

const LightGreenHeader = styled.div `
    color: lightgreen;
    font-weight: bold;
    font-size: 1.5rem;
`


const EditUser = (props) => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  //Variable Setup
  const { firstName, lastName, password, email, phone } = userDetails;
  const id = props.match.params.id;

  // Firebase Setup
  const firestore = useFirestore();
  const history = useHistory();

  useFirestoreConnect(
    (props) => [{ collection: "users", doc: id }],
    connect((state, props) => ({
      users: state.firestore.data.users,
    }))
  );

  const { users } = props;

  useEffect(() => {
    if (users) {
      //pulling out the user we need
      // as we have an ordered array, the doc with our id will be in the first element of the array
      const user = users[0];

      //Update the state with the user data
      setUserDetails({
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [users]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted User");

    // Update our user in the database
    firestore
      .collection("users")
      .doc(id)
      .update(userDetails)
      .then(() => console.log("User has been updated"));

    history.push("/users");
  };

  const onChange = (e) =>
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });

  return (
    <Fragment>
      <Row>
        <Col md={6}>
          <Link to="/users/" className="btn btn-secondary mb-2">
            <FontAwesomeIcon icon={faArrowCircleLeft} size="lg" /> Go to
            Dashboard
          </Link>
        </Col>
      </Row>
      <Card bg="dark" text="success">
        <Card.Header><LightGreenHeader>Edit User : {firstName}{' '}{lastName}</LightGreenHeader></Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group controlId="firstName">
              <Form.Label><LightGreen>First Name:</LightGreen></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                name="firstName"
                value={firstName}
                minLength="2"
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label><LightGreen>Last Name:</LightGreen></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                name="lastName"
                value={lastName}
                minLength="1"
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label><LightGreen>Email:</LightGreen></Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label><LightGreen>Phone:</LightGreen></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                value={phone}
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label><LightGreen>Password:</LightGreen></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the new password"
                name="password"
                value={password}
                minLength="1"
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Button type="submit" variant="success" className="btn-block">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

const enhance = compose(
  withFirestore,
  connect((state) => ({
    users: state.firestore.ordered.users,
  }))
);

export default enhance(EditUser);
