import React from "react";
import { useState } from "react";
import { useContext } from "react";
import BaseAPI from "../../API/BaseAPI";
import MyInputGroup from "../UI/MyInput/MyInputGroup";
import { AuthContext } from "../../context";
import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
  const router = useNavigate();
  const pageParam = useParams();

  // eslint-disable-next-line no-unused-vars
  const { userAuth, setUserAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(pageParam.email ? pageParam.email : "");
  const [password, setPassword] = useState("");

  const login = async (event) => {
    try {
      let response = await BaseAPI.login(email, password);
      setUserAuth({ isAuth: true, role: response.role });
      router(`/manager`);
    } catch (error) {
      alert(error);
    }
  };

  // const serverQuery = async () => {
  //   let response = await BaseAPI.login(email, password);
  // };

  return (
    <Container style={{ width: "25rem", marginTop: "2rem" }}>
      <Form onSubmit={login} className="my-3">
        <MyInputGroup
          value={email}
          size="lg"
          type="email"
          placeholder="email"
          label="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <MyInputGroup
          value={password}
          size="lg"
          type="password"
          placeholder="password"
          label="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="button" size="lg" onClick={login}>
          Log in
        </Button>
        <p></p>
        <Button
          size="lg"
          type="button"
          variant="outline-primary"
          onClick={() => {
            router("/signup");
          }}>
          Sign up
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
