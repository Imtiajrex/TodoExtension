import { createStyles, Text } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconGripVertical } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
	item: {
		display: "flex",
		alignItems: "center",
		borderRadius: theme.radius.md,
		border: `1px solid ${
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
		}`,
		padding: `${theme.spacing.sm}px ${theme.spacing.xl}px`,
		paddingLeft: theme.spacing.xl - theme.spacing.md, // to offset drag handle
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
		marginBottom: theme.spacing.sm,
	},

	itemDragging: {
		boxShadow: theme.shadows.sm,
	},

	symbol: {
		fontSize: 30,
		fontWeight: 700,
		width: 60,
	},

	dragHandle: {
		...theme.fn.focusStyles(),
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		color:
			theme.colorScheme === "dark"
				? theme.colors.dark[1]
				: theme.colors.gray[6],
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
	},
}));

interface ListProps {
	data: {
		name: string;
		id: string;
	}[];
}

export default function List({ data }: ListProps) {
	const { classes, cx } = useStyles();
	const [state, handlers] = useListState(data);

	const items = state.map((item, index) => {
		return (
			<Draggable key={item.id} index={index} draggableId={item.id}>
				{(provided: any, snapshot: any) => (
					<div
						className={cx(classes.item, {
							[classes.itemDragging]: snapshot.isDragging,
						})}
						ref={provided.innerRef}
						{...provided.draggableProps}
					>
						<div {...provided.dragHandleProps} className={classes.dragHandle}>
							<IconGripVertical size={18} stroke={1.5} />
						</div>
						<div>
							<Text>{item.name}</Text>
						</div>
					</div>
				)}
			</Draggable>
		);
	});

	return (
		<DragDropContext
			onDragEnd={({ destination, source }: any) =>
				handlers.reorder({ from: source.index, to: destination?.index || 0 })
			}
		>
			<Droppable droppableId="dnd-list" direction="vertical">
				{(provided: any) => (
					<div {...provided.droppableProps} ref={provided.innerRef}>
						{items}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}
