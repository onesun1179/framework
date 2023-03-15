import { FC } from "react";
import { Link } from "react-router-dom";
import FullLayout from "@src/component/layout/FullLayout";

const Home: FC = () => {
	return (
		<FullLayout>
			{"Home"}
			<Link to={"/login"}>{"test"}</Link>
		</FullLayout>
	);
};

export default Home;
