//Import React and Bootstrap components
import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import {Button, Row, Col, ButtonGroup, Card, ListGroup} from "react-bootstrap";


//Redux Imports
import { compose } from "redux";
import {
  withFirestore,
  useFirestoreConnect,
  useFirestore,
} from "react-redux-firebase";
import { connect } from "react-redux";


// Font Awesome and Styling
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

// Spinner Component
import Spinner from "../layout/Spinner";


//Styles
const Span = styled.span`
    color: white;
`;

const H3 = styled.h3 `
    color: lightgreen;
    font-weight: bold;
`

const H4 = styled.h4 `
    color: lightgreen;
    font-size: 1.3rem;
`
const Strong = styled.strong `
    color: black;
    font-weight: bold;
`
const WhiteStyle = styled.div `
    color: black;
`


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


  const deleteID = (e, id) => {
    // Delete the client from the database
    firestore
      .collection("users")
      .doc(id)
      .update({
        userId: firestore.FieldValue.delete()
      })
      .then(() => console.log("User ID Deleted"));
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

          <Card bg="dark" border="success" style={{ width: '45rem' }} >
            <Card.Header>
              <H3>
                {user.firstName} {user.lastName}
              </H3>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={10} sm={6}>
                  <H4>
                    UserID:{" "}
                    {user.userId ? ( 
                      <div>
                        <Span>{user.userId}</Span> 
                        <br />
                        <br />
                        <Button className="btn btn-warning" onClick={(e) => deleteID(e, id)}>Delete ID</Button>   
                      </div>
                      ) : ( <Span>ID Not found</Span> )
                     }
                  </H4>
                </Col>
              </Row>
              <hr />
              <ListGroup>
                <ListGroup.Item variant="success"><Strong>Email: </Strong><WhiteStyle>{user.email}</WhiteStyle></ListGroup.Item>
                <ListGroup.Item variant="success"><Strong>Phone: </Strong><WhiteStyle>{user.phone}</WhiteStyle></ListGroup.Item>
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
