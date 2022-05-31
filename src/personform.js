import { useState } from "react"
import { gql, useMutation } from "@apollo/client";
import CREATE_PERSON  from "./mutations"
import ALL_PERSONS from "./queries"


const PersonForm = ({setError}) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');

    const [createPerson] = useMutation(CREATE_PERSON,{
        refetchQueries: [{ query: ALL_PERSONS }],
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    });
    const submit = (event) => {
        event.preventDefault();

        createPerson({
            variables: {
                name, phone, street, city
            }
        })

        setName('');
        setPhone('');
        setStreet('');
        setCity('');

    }
    return (
        <div> 
            <h2> Create new</h2>
            <form onSubmit={submit}>
               <div>
                   <label>Name</label>
                   <input value= {name} onChange={({target}) => setName(target.value)}/>
               </div>
               <div>
                   <label>Phone</label>
                   <input value= {phone} onChange={({target}) => setPhone(target.value)}/>
               </div>
               <div>
                   <label>Street</label>
                   <input value= {street} onChange={({target}) => setStreet(target.value)}/>
               </div>
               <div>
                   <label>city</label>
                   <input value= {city} onChange={({target}) => setCity(target.value)}/>
               </div>
                <button type="submit">create</button>
                </form>
        </div>
    )
}
export default PersonForm;