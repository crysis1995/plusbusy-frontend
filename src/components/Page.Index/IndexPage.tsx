import React from "react";
import Navbar from "../../common/Navbar";
import {Outlet, useLocation} from "react-router-dom";

const IndexPage = () => {
	return (
		<div className={"flex flex-col h-screen"}>
			<Navbar.Navbar className={"h-fit p-4"}>
				<Navbar.BrandName path={"/"} name={"Plusbusy"} />
				<div className={"flex flex-row items-center"}>
					<div className=" mr-5">
						<Navbar.Menu>
							{/*<Navbar.MenuLink path={"/jobs"}>Zlecenia</Navbar.MenuLink>*/}
							<Navbar.MenuLink path={"/courses"}>Kursy</Navbar.MenuLink>
							<Navbar.MenuLink path={"/vehicles"}>Pojazdy</Navbar.MenuLink>
							<Navbar.MenuLink path={"/drivers"}>Kierowcy</Navbar.MenuLink>
						</Navbar.Menu>
					</div>
					<div className=" border-l border-gray-300 px-4">
						<Navbar.User userName={"Jan Kowalski"} />
					</div>
				</div>
			</Navbar.Navbar>
			<div className={"w-full h-full flex flex-col"}>
				<div className={"w-full h-full p-3"}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default IndexPage;
