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
`;

const UserContainer = styled.div`
`;

const StyledText = styled.h1`
`;

const StyledImage = styled.img`
`;

const StyledEmail = styled.p`
`;

export default function CallbackPage() {
    return (
      <Suspense fallback={<LoadingContainer>Loading...</LoadingContainer>}>
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
            <StyledText> Welcome, {user.name || user.login}!</StyledText>
            <StyledImage src={user.avatar_url} alt="User Avatar" />
            {user.email && <StyledEmail>{user.email}</StyledEmail>}
        </UserContainer>
    );
}