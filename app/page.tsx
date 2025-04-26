"use client";
import styled from "styled-components";
import Link from "next/link";

const HomeContainer = styled.div`
`;

const HomeHeader = styled.h1`
`;

const HomeText = styled.p`
`;

const SignInButton = styled(Link)`
`;

export default function Home() {
  return (
    <HomeContainer>
      <HomeHeader> Welcome to my OAuth App</HomeHeader>
      <HomeText> This is a simple OAuth app using GitHub</HomeText>
      <SignInButton href="/signin">Go to sign in</SignInButton>
    </HomeContainer>
  );
}
