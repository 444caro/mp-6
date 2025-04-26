"use client";
import styled from "styled-components";

const SignInContainer = styled.div`
  font-family: Corbel, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", "DejaVu Sans", "Bitstream Vera Sans", "Liberation Sans", Verdana, "Verdana Ref", sans-serif;
  width: 90vw;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  border: 10px rgb(168,153,138) solid;
  background-color: rgb(214,205,197);
  border-radius: 10px;
`;

const Header = styled.h1`
  font-size: calc(2em + 4vw);
  letter-spacing: 0.1em;
  text-align: center;
  color: rgb(239,235,231);
  background-color: rgb(138,153,168);
  margin: 2vw;
  padding: 2vw;
  border: 7px rgb(168,153,138) solid;
  border-radius: 10px;
`;

const SignInButton = styled.a`
  background-color:rgb(138,153,168);
  color: rgb(239,235,231);
  align-self: center;
  padding: 30px;
  margin-top: calc(4em + 3vw);
  font-size: calc(10px + 1.5vw);
  font-weight: bold;
  border: none;
  border-radius: 70px;
  cursor: pointer;
  &:hover {
    background-color: rgb(80, 111, 143);
  }
`;

const SignInText = styled.h2`
  font-size: calc(0.8em + 2vw);
  letter-spacing: 0.2em;
  color: rgb(239,235,231);
  background-color: rgb(138,153,168);
  margin: 2vw;
  padding: 2vw;
  border-radius: 10px;
`;

export default function SignIn() {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}&scope=user:email`;
    return (
        <SignInContainer>
            <Header> OAUTH APP </Header>
            <SignInText>Sign in to your account</SignInText>
            <SignInButton href={githubAuthUrl}>Sign in with GitHub</SignInButton>
        </SignInContainer>
    );
}