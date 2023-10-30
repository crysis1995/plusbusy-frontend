import { Vehicle } from "../../services/Api.types";
import React from "react";
import { PropsWithClassName } from "../../common/types";

interface Props {
	vehicle: Vehicle;
}

export default function VehicleInfo({ vehicle, className }: PropsWithClassName<Props>) {
	return (
		<div className={className}>
			{vehicle.Plates} - ({vehicle.CustomName})
		</div>
	);
}
