import "./App.css";
import { gql, useQuery } from "@apollo/client";

const gqlPathList = gql`
    query GetLocations {
        pathList {
            children {
                title
            }
        }
    }
`;

function App() {
    const { loading, error, data } = useQuery(gqlPathList);
    console.log(data, error);
    return null;
}

export default App;
