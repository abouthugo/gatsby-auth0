import React from 'react';
import styled from 'styled-components';
import Auth from '../../utils/auth.config';


const Button = styled.button`
  padding: 5px 20px;
  background: ${props => props.loggedIn ? "black" : "white"};
  color: ${props => props.loggedIn ? "white" : "black"};
  border: 1px solid grey;
  border-radius: 10px;
  margin: 10px 0;
`;

export default () => {
  const auth = new Auth();
  if(auth.isAuthenticated()){
    return <Button loggedIn onClick={auth.logout}>Log Out</Button>
  } 
  return <Button onClick={auth.login}>Log In</Button>
}