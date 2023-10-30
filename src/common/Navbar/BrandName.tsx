import React from "react";
import LinkElement from "./LinkElement";
import useCurrentLocation from "./utils/useCurrentLocation";
import classNames from "classnames";

type AsLinkProps = {
    path: string;
};
type AsButtonProps = {};

type Props = {
    name: string | JSX.Element;
} & (AsButtonProps | AsLinkProps);

const BrandName: React.FC<Props> = (props) => {
    const path = "path" in props ? props.path : undefined;
    const data = useCurrentLocation(path);

    return (
        <LinkElement path={path} className={classNames("flex items-center px-5", {[data.cssClass]: data.isActive})}>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">{props.name}</span>
        </LinkElement>
    );
};

export default BrandName;
