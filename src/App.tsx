/* eslint-disable react-hooks/exhaustive-deps */
import { Center, ScrollArea } from "@mantine/core";
import { useEffect } from "react";
import List from "./components/List";
import { useForm } from "@mantine/form";
import Form from "./components/Form";
import { useListState } from "@mantine/hooks";
import { useChromeStorageSync } from "use-chrome-storage";
export type dataType = {
	name: string;
	id: string;
};
function App() {
	const [data, setData, isPersistent, error] = useChromeStorageSync("data", []);
	const [state, handlers] = useListState(data as dataType[]);
	const form = useForm({
		initialValues: {
			text: "",
		},
	});
	if (error) {
		console.log(error);
		return <></>;
	}
	const handleSubmit = (values: { text: string }) => {
		const newItem = {
			name: values.text,
			id: Math.random().toString(),
		};
		handlers.insert(0, newItem);
		setData([newItem, ...state]);
		form.reset();
	};
	const handleDelete = (index: number) => {
		handlers.remove(index);
		setData(state.filter((item) => item.id !== state[index].id));
	};
	const handleCrossOff = (index: number) => {};
	return (
		<Center>
			<div
				style={{
					minWidth: 350,
					maxWidth: 800,
					height: 350,
					padding: 20,
				}}
			>
				<ScrollArea style={{ height: "100%", width: "100%", borderRadius: 16 }}>
					<List
						state={state}
						handlers={handlers}
						handleCrossOff={handleCrossOff}
						handleDelete={handleDelete}
					/>
				</ScrollArea>
				<Form form={form} handleSubmit={handleSubmit} />
			</div>
		</Center>
	);
}

export default App;
