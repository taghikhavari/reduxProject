import React from "react";
import FilterLink from "../containers/FilterLink";
import { EVisibilityFilters } from "../actions";

const Footer = () => (
	<p>
		Show: <FilterLink filter={EVisibilityFilters.SHOW_ALL} text={"All"} />
		{", "}
		<FilterLink filter={EVisibilityFilters.SHOW_ACTIVE} text={"Active"} />
		{", "}
		<FilterLink filter={EVisibilityFilters.SHOW_COMPLETED} text={"Completed"} />
	</p>
);

export default Footer;
