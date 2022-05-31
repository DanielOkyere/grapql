const FIND_PERSON = gql`
    query findPersonByName($nameToSearch: String!) {
        findPerson(name: $nameToSearch) {
            name
            phone
            id
            address {
                street
                city
            }
        }
    }
`;

const ALL_PERSONS = gql`
query {
    allPersons {
        name
        phone
        address {
            street
            city
        }
    }
}`;

export default  {
    FIND_PERSON,
    ALL_PERSONS,
}