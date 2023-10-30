import React from "react";
import { TextInput } from "../../common/Form/TextInput";
import { Label } from "../../common/Form/Label";
import { Checkbox } from "../../common/Form/Checkbox";

type TextsEnum = "LoginForm.Email" | "LoginForm.Password" | "LoginForm.RememberMe" | "LoginForm.LoginButton";

const Texts: { [key in TextsEnum]: string } = {
	"LoginForm.Email": "Twój Email",
	"LoginForm.Password": "Twoje hasło",
	"LoginForm.RememberMe": "Zapamiętaj mnie",
	"LoginForm.LoginButton": "Zaloguj",
};

function LoginText(props: { text: TextsEnum }) {
	const text = Texts[props.text];
	return <>{text || ""}</>;
}

export default function LoginForm() {
	return (
		<form className="flex flex-col gap-4">
			<div>
				<div className="mb-2">
					<Label>
						<LoginText text={"LoginForm.Email"} />
					</Label>
				</div>
				<TextInput type={"email"} />
			</div>
			<div>
				<div className="mb-2">
					<Label>
						<LoginText text={"LoginForm.Password"} />
					</Label>
				</div>
				<TextInput type={"password"} />
			</div>
			<div className="flex items-center gap-2">
				<Checkbox id={"remember"} />
				<Label htmlFor={"remember"}>
					<LoginText text={"LoginForm.RememberMe"} />
				</Label>
			</div>
			<button
				type="submit"
				className="bg-blue-700 rounded-lg text-white py-2.5 font-medium px-4 w-full text-sm hover:bg-blue-800"
			>
				<LoginText text={"LoginForm.LoginButton"} />
			</button>
		</form>
	);
}
