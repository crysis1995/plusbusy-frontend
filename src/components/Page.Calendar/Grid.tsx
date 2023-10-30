import { PropsWithClassName } from "../../common/types";
import React, { PropsWithChildren } from "react";
import classNames from "classnames";

type Props = {
	resolution?: number;
};

type ContextType = {
	resolution: number;
	headerRowSpan: number;
	startColumn: number;
};

export const GridContext = React.createContext<ContextType>({ resolution: 24, headerRowSpan: 2, startColumn: 2 });

export function Grid({ children, className, resolution = 24 }: PropsWithClassName<PropsWithChildren<Props>>) {
	return (
		<GridContext.Provider value={{ resolution, headerRowSpan: 2, startColumn: 2 }}>
			<div className={classNames("grid", className)}>{children}</div>
		</GridContext.Provider>
	);
}
