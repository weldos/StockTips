//Import React and Bootstrap components
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Row, Col, Table } from "react-bootstrap";
import styled from 'styled-components';

//Import Redux/Firestore functions
import { compose } from "redux";
import { withFirestore, useFirestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'; 

//Custom Spinner
import Spinner from "../layout/Spinner";



//Styles
const H2 = styled.h2`
    font-size: 2.5rem;
    color: lightgreen;
    font-weight: bold;
`;

const TH = styled.th`
    color: lightgreen;
`;

const TD = styled.td`
    color: white;
    
`;

const Users = ({ users }) => {
  // Database Listener (pass in the collection we are listening to)
  useFirestoreConnect("users");

  if (users) {
    return (
      <Fragment>
        <Row>
          <Col md={6}>
            <H2>
              <FontAwesomeIcon icon={faUsers} size="lg" /> Users
            </H2>
          </Col>
        </Row>
        <Table striped>
          <thead className="thead-inverse">
            <tr>
              <TH>Name</TH>
              <TH>Email</TH>
              <TH>Phone</TH>
              <TH>More Details</TH>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <TD><strong>
                  {user.firstName} {user.lastName}
                </strong></TD>
                <TD>{user.email}</TD>
                <TD>{user.phone}</TD>
                <TD>
                  <Link
                    to={`/users/${user.id}`}
                    className="btn btn-secondary text-light"
                  >
                    <FontAwesomeIcon icon={faQuestionCircle} size="lg" /> Details
                  </Link>
                </TD>
              </tr>
            ))}
          </tbody>
        </Table>
      </Fragment>
    );
  } else {
    return <Spinner />;
  }
};

Users.propTypes = {
  firestore: PropTypes.object.isRequired,
  users: PropTypes.array,
};

const enhance = compose(
  withFirestore,
  connect((state) => ({
    users: state.firestore.ordered.users,
  }))
);

export default enhance(Users);
