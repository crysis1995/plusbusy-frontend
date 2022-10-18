import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {TextInputColors} from "flowbite-react/lib/esm/components/FormControls/TextInput";

type TextsEnum =
	| "LoginForm.Email"
	| "LoginForm.Password"
	| "LoginForm.RememberMe"
	| "LoginForm.LoginButton";

const Texts: { [key in TextsEnum]: string } = {
	"LoginForm.Email": "Twój Email",
	"LoginForm.Password": "Twoje hasło",
	"LoginForm.RememberMe": "Zapamiętaj mnie",
	"LoginForm.LoginButton": "Zaloguj",
};

export default function () {
	return (
		<form className="flex flex-col gap-4">
			<div>
				<div className="mb-2 block">
					<Label htmlFor="email1" value={Texts["LoginForm.Email"]} />
				</div>
				<TextInput  id="email1" type="email" placeholder="" required={true} />
			</div>
			<div>
				<div className="mb-2 block">
					<Label htmlFor="password1" value={Texts["LoginForm.Password"]} />
				</div>
				<TextInput id="password1" type="password" required={true} />
			</div>
			<div className="flex items-center gap-2">
				<Checkbox id="remember" />
				<Label htmlFor="remember">{Texts["LoginForm.RememberMe"]}</Label>
			</div>
			<Button type="submit">{Texts["LoginForm.LoginButton"]}</Button>
		</form>
	);
}
