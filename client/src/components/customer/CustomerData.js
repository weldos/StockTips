import React, {Component} from 'react';
import jQuery from 'jquery';

// Bootstrap
import { Table } from "react-bootstrap";

import styled from 'styled-components';

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
    font-size: 1.2rem;
`;

const TD = styled.td`
    color: white;
    
`;

class CustomerData extends Component {

  state = {
    users: []
  }

  async componentDidMount(){
    const res = await jQuery.get('https://jsonplaceholder.typicode.com/users', function(data){
      })
      console.log(res)
      this.setState({users: res })  
  }


  render(){
    const {users} = this.state 
  return (
 <div>
    <H2>Dummy User Data</H2>
    {users == "" ? (<Spinner />) : ( 

    <Table striped>
          <thead className="thead-inverse">
            <tr>
              <TH>Name</TH>
              <TH>Email</TH>
              <TH>Phone</TH>
              <TH>Website</TH>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <TD><strong>
                  {user.name}
                </strong></TD>
                <TD>{user.email}</TD>
                <TD>{user.phone}</TD>
                <TD>{user.website}</TD>
              </tr>
            ))}
          </tbody>
        </Table>

    )  }
    
</div>
    )
  }
}

export default CustomerData
