"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";

interface GithubUser {
    login: string;
    avatar_url: string;
    name: string;
    email: string | null;
}

const LoadingContainer = styled.div`
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

const UserContainer = styled.div`
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

const StyledText = styled.h1`
  font-size: calc(0.8em + 2vw);
  letter-spacing: 0.2em;
  color: rgb(239,235,231);
  background-color: rgb(138,153,168);
  margin: 2vw;
  padding: 2vw;
  border-radius: 10px;
`;

const StyledImage = styled.img`
    width: calc(5em + 15vw);
    height: calc(5em + 15vw);
    border-radius: 50%;
    margin-top: calc(1em + 3vw);
    border: 8px rgb(168,153,138) solid;
`;

const StyledEmail = styled.p`
  background-color:rgb(138,153,168);
  color: rgb(239,235,231);
  align-self: center;
  padding: 30px;
  margin-top: calc(1em + 3vw);
  font-size: calc(10px + 1.5vw);
  font-weight: bold;
  border: none;
  border-radius: 10px;
`;

export default function CallbackPage() {
    return (
      <Suspense fallback={<LoadingContainer><Header>Loading...</Header></LoadingContainer>}>
        <Callback />
      </Suspense>
    );
}

function Callback() {
    const searchParams = useSearchParams();
    const code = searchParams.get("code");
    const [user, setUser] = useState<GithubUser | null>(null);

    useEffect(() => {
        if (code){
            const getUserData = async() => {
                const response = await fetch(`/api/auth`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ code }),
                });
                if (response.ok) {
                    const { access_token } = await response.json();
                    if (access_token) {
                        // Fetch user data from GitHub API
                        const userResponse = await fetch("https://api.github.com/user", {
                            headers: {
                                Authorization: `Bearer ${access_token}`,
                            },
                        });
                        // Fetch user emails from GitHub API
                        const emailResponse = await fetch("https://api.github.com/user/emails", {
                            headers: {
                                Authorization: `Bearer ${access_token}`,
                            },
                        });
                        if (userResponse.ok && emailResponse.ok) {
                            const userData = await userResponse.json();
                            const emailData = await emailResponse.json();
                            const primaryEmail = emailData.find((email: { primary: boolean }) => email.primary);
                            setUser({
                                ...userData,
                                email: primaryEmail ? primaryEmail.email : null,
                            });
                        } else {
                            console.error("Error fetching user data from GitHub API");
                        }
                    } else {
                        console.error("No access token received");
                    }
                } else{
                    console.error("Error fetching access token from backend");
                }
            };
            getUserData();
        }
    }, [code]);

    if (!user) {
        return <LoadingContainer>Loading...</LoadingContainer>;
    }
    return (
        <UserContainer>
            <Header> OAUTH APP </Header>
            <StyledText> Welcome, {user.name || user.login}!</StyledText>
            <StyledImage src={user.avatar_url} alt="User Avatar" />
            {user.email && <StyledEmail>{user.email}</StyledEmail>}
        </UserContainer>
    );
}