//Import React and Bootstrap components
import React, { useState, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import {Form, InputGroup, Button, FormControl, Row, Col, ButtonGroup, Card, ListGroup} from "react-bootstrap";


//Redux Imports
import { compose } from "redux";
import {
  withFirestore,
  useFirestoreConnect,
  useFirestore,
} from "react-redux-firebase";
import { connect } from "react-redux";
import classnames from "classnames";


// Font Awesome and Styling
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

// Spinner Component
import Spinner from "../layout/Spinner";


const UserDetails = (props) => {

  const id = props.match.params.id;
  const firestore = useFirestore();
  const history = useHistory();

  useFirestoreConnect(
    (props) => [{ collection: "users", doc: id }],
    connect((state, props) => ({
      users: state.firestore.data.users,
    }))
  );

  const { users } = props;

  

  const onDeleteClick = (e) => {
    // Delete the client from the database
    firestore
      .collection("users")
      .doc(id)
      .delete()
      .then(() => console.log("User Deleted"));
    // Redirect back to dashboard
    history.push("/users");
  };


  if (!users) {
    return <Spinner />;
  } else {
    const user = users[0];
    return (
      <Fragment>
        <Row>
          <Col md={6}>
            <Link to="/users" className="btn btn-secondary mb-2">
              <FontAwesomeIcon icon={faArrowCircleLeft} size="lg" /> Go To
              Dashboard
            </Link>
          </Col>
          <Col md={6}>
            <ButtonGroup className="btn-group float-right">
              <Button className="btn btn-info px-3">
                <Link
                  to={`/users/edit/${user.id}`}
                  className="btn text-light"
                >
                  Edit
                </Link>
              </Button>

              <Button
                className="btn btn-danger ml-1"
                onClick={(e) => onDeleteClick(e)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </Col>
          <hr />

          <Card bg="dark">
            <Card.Header>
              <h3>
                {user.firstName} {user.lastName}
              </h3>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={10} sm={6}>
                  <h4>
                    UserID:{" "}
                    <span className="text-secondary">{user.id}</span>
                  </h4>
                </Col>
              </Row>
              <hr />
              <ListGroup>
                <ListGroup.Item variant="light"><strong>Email: </strong>{user.email}</ListGroup.Item>
                <ListGroup.Item variant="light"><strong>Phone: </strong>{user.phone}</ListGroup.Item>

              </ListGroup>
            </Card.Body>
          </Card>
        </Row>
      </Fragment>
    );
  }
};

const enhance = compose(
  withFirestore,
  connect((state) => ({
    users: state.firestore.ordered.users,
  }))
);

export default enhance(UserDetails);
