/* eslint-disable no-undef */
import { useListState, useLocalStorage } from "@mantine/hooks";
import App from "./App";
import { useEffect } from "react";
export default function ChromeStorage() {
	const [data, setData] = useLocalStorage({
		defaultValue: [],
		key: "data",
	});
	const [crossedData, setCrossedData] = useLocalStorage({
		defaultValue: [],
		key: "crossed-data",
	});
	const [state, handlers] = useListState(data);
	useEffect(() => {
		const data = localStorage.getItem("data");
		if (data) handlers.setState(JSON.parse(data));
	}, []);
	return (
		<>
			<App
				data={data}
				setData={setData}
				state={state}
				handlers={handlers}
				crossedData={crossedData}
				setCrossedData={setCrossedData}
			/>
		</>
	);
}
