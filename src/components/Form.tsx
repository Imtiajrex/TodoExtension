import { Button, Center, createStyles, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
const useStyles = createStyles((theme) => ({
	form: {
		width: "100%",
		padding: "20px 0px",
		backgroundColor: theme.colors.dark[7],
	},
}));
export default function Form({
	form,
	handleSubmit,
}: {
	form: UseFormReturnType<
		{
			text: string;
		},
		(values: { text: string }) => {
			text: string;
		}
	>;
	handleSubmit: (e: any) => void;
}) {
	const { classes } = useStyles();
	return (
		<form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
			<TextInput
				withAsterisk
				placeholder="Enter a task"
				mb={10}
				{...form.getInputProps("text")}
			/>
			<Center>
				<Button
					type="submit"
					color={"indigo"}
					fullWidth
					disabled={form.values.text.length === 0}
				>
					Add Task
				</Button>
			</Center>
		</form>
	);
}
