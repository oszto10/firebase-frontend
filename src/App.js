import "./App.css";
import React, { useEffect, useState } from "react";
import Person from "./components/Person";
import { addPerson, getPeople } from "./DataManager";

function App() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");
  const [height, setHeight] = useState();
  const [mass, setMass] = useState();

  useEffect(() => {
    getPeople().then((peopleData) => {
      setPeople(peopleData);
    });

    /* fetch("https://swapi.dev/api/people")
      .then((res) => res.json())
      .then((data) => {
        setPeople(data.results);
        console.log(data.results);
      }); -- ez a régi fetch*/
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Name"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <input
        onChange={(event) => {
          setHeight(event.target.value);
        }}
        type="number"
        placeholder="Height"
      />
      <input
        onChange={(event) => {
          setMass(event.target.value);
        }}
        type="number"
        placeholder="Mass"
      />
      <button
        onClick={async () => {
          await addPerson(name, height, mass);
          getPeople().then((peopleData) => {
            setPeople(peopleData);
          });
        }}
      >
        Mentés
      </button>

      {people.map((person, i) => (
        <Person
          key={i}
          name={person.name}
          height={person.height}
          mass={person.mass}
        />
      ))}
    </div>
  );
}

export default App;
