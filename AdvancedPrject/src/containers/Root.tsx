import React from "react";
import { Provider } from "react-redux";
import configureStore from "../configureStore";
import AsyncApp from "./AsyncApp";

const store = configureStore();

const Root = () => (
	<Provider store={store}>
		<React.StrictMode>
			<AsyncApp />
		</React.StrictMode>
	</Provider>
);

export default Root;
