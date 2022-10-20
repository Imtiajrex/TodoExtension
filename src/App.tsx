/* eslint-disable react-hooks/exhaustive-deps */
import { Center, ScrollArea } from "@mantine/core";
import { useEffect } from "react";
import List from "./components/List";
import { useForm } from "@mantine/form";
import Form from "./components/Form";
import { useListState, useLocalStorage } from "@mantine/hooks";
export type dataType = {
	name: string;
	id: string;
};
function App() {
	const [data, setData] = useLocalStorage<dataType[]>({
		defaultValue: [],
		key: "data",
	});
	const [state, handlers] = useListState(data);
	useEffect(() => {
		setData(state);
	}, [state]);

	const form = useForm({
		initialValues: {
			text: "",
		},
	});
	const handleSubmit = (values: { text: string }) => {
		handlers.insert(state.length, {
			name: values.text,
			id: Math.random().toString(),
		});
		form.reset();
	};
	const handleDelete = (index: number) => {
		handlers.remove(index);
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
