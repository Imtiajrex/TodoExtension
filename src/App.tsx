import { Container } from "@mantine/core";
import { useState } from "react";
import List from "./components/List";
function App() {
	const [data, setData] = useState([
		{ name: "Shuvo", id: "sdlkfjsliwe" },
		{ name: "Imtiaj", id: "qwesdfsv" },
		{ name: "Suhana", id: "weryhfbd234" },
		{ name: "Roger", id: "sdlkfjslsfdbs4whiwe" },
	]);

	return (
		<div className="App">
			<Container mt={"lg"}>
				<List data={data} />
			</Container>
		</div>
	);
}

export default App;
