import { useState, useEffect } from "react";

//header for turn structure table
const Header = ({ turns }) => {
  return (
    <thead>
      <tr>
        <td>Name</td>
        <td>Initiative</td>
        <td>HP</td>
        <td>AC</td>
        {turns.map((turn, index) => (
          <td key={index}>Turn {turn}</td>
        ))}
      </tr>
    </thead>
  );
};

//component for inserting combatant
const Combatant = ({ name, initiative, hp, ac, turns }) => {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{initiative}</td>
        <td>{hp}</td>
        <td>{ac}</td>
        {turns.map((turn, index) => (
          <td>
            <input type="checkbox" />
            <br />
            <input type="text" />
          </td>
        ))}
      </tr>
    </>
  );
};

//grabs characters from file
const CombatantGrabber = () => {
  //get the file location
  const [fileContent, setFileContent] = useState('');

  useEffect(()=> {
    fetch('../assets/Combatant.txt')
    .then(response => response.text())
    .then(text=> {
      setFileContent(text);
    })
    .catch(error => {
      console.error('Error fetching file', error);
    });
  }, []);
  return(
    <>
      <h2>file content:</h2>
      <pre>{fileContent}</pre>
    </>
  )
};

const App = () => {
  const turns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const combatants = [
    { name: "Xan", initiative: "1" },
    { name: "Malgra", initiative: "2" },
    { name: "Fyrehunters", initiative: "3" },
    { name: "Presarium", initiative: "4" },
  ];

  return (
    <div className="init-tracker">
      <h1>Initiative and Status Tracker</h1>
      <CombatantGrabber/>
      <table>
        <Header turns={turns} />
        <tbody>
          <Combatant name={"Xan"} initiative={1} hp={27} ac={1} turns={turns} />
          <Combatant name={"Malgra"} initiative={2} hp={30} ac={2} turns={turns} />
          <Combatant name={"Fyrehunters"} initiative={2} hp={33} ac={1} turns={turns}/>
          <Combatant name={"Presarium"} initiative={4} hp={36} ac={4} turns={turns}/>
          
        </tbody>
      </table>
    </div>
  );
};

export default App;

/*
{combatants.map((combatant, index) => (
            <tr key={index}>
              <td> {combatant.name}</td>
              <td> {combatant.initiative}</td>
              {turns.map((turn, index) => (
                <td>
                  <input type="checkbox" />
                  <br />
                  <input type="text" />
                </td>
              ))}
            </tr>
          ))}
*/
