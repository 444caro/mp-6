"use client";
import styled from "styled-components";

const SignInContainer = styled.div`
`;

const SignInButton = styled.a`
`;

const SignInText = styled.h1`
`;

export default function SignIn() {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI}&scope=user:email`;
    return (
        <SignInContainer>
            <SignInText>Sign in to your account</SignInText>
            <SignInButton href={githubAuthUrl}>Sign in with GitHub</SignInButton>
        </SignInContainer>
    );
}