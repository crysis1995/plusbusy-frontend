import React from "react";
import LoginForm from "../Login/LoginForm";

export default function LoginPage() {
	return (
		<div
			className="relative h-screen bg-cover bg-center"
			style={{ backgroundImage: `url(${"./bus.jpg"})` }}
		>
			<div className="absolute w-1/2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded p-12">
				<h1 className={"text-3xl font-semibold pb-6 text-center"}>
					Logowanie
				</h1>
				<LoginForm />
			</div>
		</div>
	);
}
