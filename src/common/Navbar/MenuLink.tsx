import React from "react";
import LinkElement from "./LinkElement";
import classNames from "classnames";
import useCurrentLocation from "./utils/useCurrentLocation";

type AsLinkProps = {
    path: string;
};
type AsButtonProps = {};

type Props = React.PropsWithChildren & (AsButtonProps | AsLinkProps);

const MenuLink = (props: Props) => {
    const path = "path" in props ? props.path : undefined;
    const data = useCurrentLocation(path);
    return (
        <li className="py-0">
            <LinkElement className={classNames({[data.cssClass]: data.isActive})}
                         path={path}>{props.children}</LinkElement>
        </li>
    );
};

export default MenuLink;
