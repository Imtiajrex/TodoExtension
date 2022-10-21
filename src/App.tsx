/* eslint-disable react-hooks/exhaustive-deps */
import { Center, ScrollArea } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import List from "./components/List";
import { useForm } from "@mantine/form";
import Form from "./components/Form";
import { UseListStateHandlers } from "@mantine/hooks";
import CrossedList from "./components/CrossedList";
export type dataType = {
	task: string;
	id: string;
};
function App({
	crossedData,
	setCrossedData,
	setData,
	state,
	handlers,
}: {
	crossedData: dataType[];
	setCrossedData: React.Dispatch<React.SetStateAction<dataType[]>>;
	setData: React.Dispatch<React.SetStateAction<dataType[]>>;
	state: dataType[];
	handlers: UseListStateHandlers<dataType>;
}) {
	const form = useForm({
		initialValues: {
			text: "",
		},
	});
	// console.log(error);
	const handleSubmit = (values: { text: string }) => {
		const newItem = {
			task: values.text,
			id: Math.random().toString(),
		};
		handlers.insert(0, newItem);
		setData([newItem, ...state]);
		form.reset();
	};
	const handleDelete = (index: number) => {
		setData(state.filter((item) => item.id !== state[index].id));
		handlers.remove(index);
	};
	const handleCrossOff = (index: number) => {
		setCrossedData([...crossedData, state[index]]);
		handleDelete(index);
	};
	const handleCrossDelete = (index: number) => {
		setCrossedData(
			crossedData.filter((item) => item.id !== crossedData[index].id)
		);
	};
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
					<CrossedList
						crossedData={crossedData}
						handleCrossedDelete={handleCrossDelete}
					/>
				</ScrollArea>
				<Form form={form} handleSubmit={handleSubmit} />
			</div>
		</Center>
	);
}

export default App;
