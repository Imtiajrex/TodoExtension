import { createStyles, Text, UnstyledButton } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { dataType } from "../App";

export const useStyles = createStyles((theme, _, getRef) => ({
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
		[`&:hover`]: {
			color: theme.colors.red[6],
			transform: "scale(1.2)",
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
		paddingLeft: theme.spacing.xl, // to offset drag handle
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.white,
		marginBottom: theme.spacing.sm,
		[`&:hover .${getRef("action")}`]: {
			opacity: 1,
			transform: "scale(1)",
		},
	},
}));
export default function CrossedList({
	crossedData,
	handleCrossedDelete,
}: {
	crossedData: dataType[];
	handleCrossedDelete: (index: number) => void;
}) {
	const Item = ({ task, index }: { task: string; index: number }) => {
		const { classes, cx } = useStyles();
		return (
			<div className={cx(classes.item)}>
				<Text strikethrough>{task}</Text>
				<div className={classes.actions}>
					<UnstyledButton
						className={classes.action}
						onClick={() => handleCrossedDelete(index)}
					>
						<IconTrash size={19} />
					</UnstyledButton>
				</div>
			</div>
		);
	};

	return (
		<>
			{crossedData.map((item, index) => (
				<Item key={item.id} task={item.task} index={index} />
			))}
		</>
	);
}
