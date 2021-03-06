import { useState} from 'react';
import { gql, useQuery } from "@apollo/client";
import PersonForm from "./personform";
import Persons from "./persons";

const ALL_PERSONS = gql`
    query {
        allPersons {
            name
            phone
            id
        }
    }
`;

const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
        return null;
    }
    return <div style={{ color: "red" }}>{errorMessage}</div>;
};

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const result = useQuery(ALL_PERSONS);

    if (result.loading) {
        return <div>Loading...</div>;
    }

    const notify = (message) => {
        setErrorMessage(message);
        setTimeout(() => {
            setErrorMessage(null);
        }, 10000);
    };

    return (
        <div>
            <Notify errorMessage={errorMessage} />
            <Persons persons={result.data.allPersons} />
            <PersonForm setError={notify} />
        </div>
    );
};

export default App;
