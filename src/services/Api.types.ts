export type Driver = {
	Id: number;
	Name: string;
	Surname: string;
};

export type Vehicle = {
	Id: number;
	Plates: string;
	CustomName: string;
};

export type Course = {
	Id: number;
	Vehicle: Vehicle;
	Event: {
		Name: string;
		StartDate: string;
		EndDate: string;
	};
};
