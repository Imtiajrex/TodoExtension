/* eslint-disable no-undef */
import { useListState, useLocalStorage } from "@mantine/hooks";
import App from "./App";
import { useEffect, useRef } from "react";
import { useForm } from "@mantine/form";
export default function ChromeStorage() {
	const [crossedData, setCrossedData] = useLocalStorage({
		defaultValue: [],
		key: "crossed-data",
	});
	const update = useRef(false);
	const [state, handlers] = useListState([]);
	useEffect(() => {
		chrome.storage.sync.get("data", function (result) {
			const data = result.data;
			if (data) handlers.setState(JSON.parse(data));
			console.log("Got data ", result);
		});
	}, []);
	useEffect(() => {
		if (update.current) {
			update.current = false;
			chrome.storage.sync.set({ data: JSON.stringify(state) }, function () {});
		}
	}, [state]);

	const form = useForm({
		initialValues: {
			text: "",
		},
	});
	const handleSubmit = (values) => {
		const newItem = {
			task: values.text,
			id: Math.random().toString(),
		};
		handlers.insert(0, newItem);
		chrome.storage.sync.set({
			data: JSON.stringify([newItem, ...state]),
		});
		form.reset();
	};
	const handleDelete = (index) => {
		chrome.storage.sync.set({
			data: JSON.stringify(state.filter((item) => item.id !== state[index].id)),
		});
		handlers.remove(index);
	};
	const handleCrossOff = (index) => {
		setCrossedData([...crossedData, state[index]]);
		handleDelete(index);
	};
	const handleCrossDelete = (index) => {
		setCrossedData(
			crossedData.filter((item) => item.id !== crossedData[index].id)
		);
	};
	const reorder = ({ from, to }) => {
		update.current = true;
		handlers.reorder({ from, to });
	};
	return (
		<>
			<App
				state={state}
				handlers={handlers}
				crossedData={crossedData}
				form={form}
				setCrossedData={setCrossedData}
				handleCrossDelete={handleCrossDelete}
				handleSubmit={handleSubmit}
				handleCrossOff={handleCrossOff}
				handleDelete={handleDelete}
				reorder={reorder}
			/>
		</>
	);
}
