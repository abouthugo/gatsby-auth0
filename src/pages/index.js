import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LoginButton from "../components/loginButton";
import Auth from '../../utils/auth.config';

const auth = new Auth();
const Message = auth.getUserName() && <h1>Welcome {auth.getUserName()}</h1>;
const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    {Message}
    <LoginButton/>
  </Layout>
)

export default IndexPage
