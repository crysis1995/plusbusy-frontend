import BodyCell from "./BodyCell";
import HeaderCell from "./HeaderCell";
import HeaderSection from "./HeaderSection";
import Table from "./Table";
import BodySection from "./BodySection";
import Title from "./Title";

export default {
	Table,
	Title,
	Body: { Section: BodySection, Cell: BodyCell },
	Header: { Section: HeaderSection, Cell: HeaderCell },
};
