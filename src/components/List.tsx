import { createStyles, Text, UnstyledButton } from "@mantine/core";
import { UseListStateHandlers } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconGripVertical, IconTrash, IconX } from "@tabler/icons";
import { dataType } from "../App";

const useStyles = createStyles((theme, _params, getRef) => ({
	actions: {
		marginLeft: "auto",
		display: "flex",
	},
	action: {
		ref: getRef("action"),
		opacity: 0,
		transform: "scale(0)",
		transition: "all 0.1s ease-in",
		marginRight: 5,
		[`&:nth-child(1)`]: {
			[`&:hover`]: {
				color: theme.colors.red[6],
				transform: "scale(1.2)",
			},
		},
		[`&:nth-child(2)`]: {
			[`&:hover`]: {
				color: theme.colors.indigo[6],
				transform: "scale(1.2)",
			},
		},
	},

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
		[`&:hover .${getRef("action")}`]: {
			opacity: 1,
			transform: "scale(1)",
		},
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

export default function List({
	state,
	handlers,
	handleDelete,
	handleCrossOff,
}: {
	state: dataType[];
	handlers: UseListStateHandlers<dataType>;
	handleDelete: (index: number) => void;
	handleCrossOff: (index: number) => void;
}) {
	const { classes, cx } = useStyles();

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
						<div className={classes.actions}>
							<UnstyledButton
								className={classes.action}
								onClick={() => handleDelete(index)}
							>
								<IconTrash size={19} />
							</UnstyledButton>
							<UnstyledButton
								className={classes.action}
								onClick={() => handleCrossOff(index)}
							>
								<IconX size={19} />
							</UnstyledButton>
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
