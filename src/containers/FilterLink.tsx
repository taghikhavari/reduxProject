import { IState } from "../reducers";
import { connect } from "react-redux";
import { EVisibilityFilters, setVisibilityFilter } from "../actions";
import Link from "../components/Link";

interface IOwnProps {
  filter: EVisibilityFilters;
  text: string;
}

const mapStateToProps = (state: IState, ownProps: IOwnProps) => {
	return {
		active: ownProps.filter === state.visibilityFilter
	};
};

const mapDispatchToProps = (dispatch: any, ownProps: IOwnProps) => {
	return {
		onClick: () => {
			dispatch(setVisibilityFilter(ownProps.filter));
		}
	};
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);
export default FilterLink;
