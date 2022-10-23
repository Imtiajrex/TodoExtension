/* eslint-disable react-hooks/exhaustive-deps */
import { Center, ScrollArea } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import List, { reorderArgsType } from "./components/List";
import { useForm } from "@mantine/form";
import Form, { formType } from "./components/Form";
import { UseListStateHandlers } from "@mantine/hooks";
import CrossedList from "./components/CrossedList";
export type dataType = {
	task: string;
	id: string;
};
function App({
	crossedData,
	state,
	handlers,
	form,
	handleCrossDelete,
	handleCrossOff,
	handleDelete,
	handleSubmit,
	reorder,
}: {
	crossedData: dataType[];
	setCrossedData: React.Dispatch<React.SetStateAction<dataType[]>>;
	state: dataType[];
	handlers: UseListStateHandlers<dataType>;
	form: formType;
	handleDelete: (index: number) => void;
	handleCrossOff: (index: number) => void;
	handleCrossDelete: (index: number) => void;
	handleSubmit: (values: { text: string }) => void;
	reorder: (args: reorderArgsType) => void;
}) {
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
						reorder={reorder}
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
