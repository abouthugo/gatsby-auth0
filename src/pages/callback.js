import React, {Component} from 'react';
import Auth from '../../utils/auth.config'
import Layout from '../components/layout'

export default class Callback extends Component{
  componentDidMount(){
    const auth = new Auth();
    auth.handleAuthentication();
  }
  
  render(){
    return(
      <Layout>
        <h1>Authenticating...</h1>
      </Layout>
    )
  }
}