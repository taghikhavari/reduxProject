import { Action } from "redux";
import { sendMessage } from "./store/chat/actions";
import { RootState } from "./store";
import { ThunkAction } from "redux-thunk";

export const thunkSendMessage = (
	message: string
): ThunkAction<void, RootState, unknown, Action<string>> => async dispatach => {
	const asyncRes = await exampleAPI();
	dispatach(
		sendMessage({
			message,
			user: asyncRes,
			timestamp: new Date().getTime()
		})
	);
};

function exampleAPI() {
	return Promise.resolve("Async Chat Bot");
}
