'use client'
import * as React from "react";

export interface AuthenticityTokenProviderProps {
	children: React.ReactNode;
	token: string;
}

export interface AuthenticityTokenInputProps {
	name?: string;
}

const csrfContext = React.createContext<string | null>(null);


export function AuthenticityTokenProvider({
	children,
	token,
}: AuthenticityTokenProviderProps) {
	return <csrfContext.Provider value={token}>
    {children}
    </csrfContext.Provider>;
}


export function useAuthenticityToken() {
	const token = React.useContext(csrfContext);
	if (!token) throw new Error("Missing AuthenticityTokenProvider.");
	return token;
}


export function AuthenticityTokenInput({
	name = "csrf_token",
}: AuthenticityTokenInputProps) {
	const token = useAuthenticityToken();
	return <input type="hidden" defaultValue={token} name={name} />;
}