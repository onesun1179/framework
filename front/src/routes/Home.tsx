import { FC } from "react";
import { Link } from "react-router-dom";

const Home: FC = () => {
	return (
		<>
			{"Home"}
			<Link to={"/login"}>{"test"}</Link>
		</>
	);
};

export default Home;
