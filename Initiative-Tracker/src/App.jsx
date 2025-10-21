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

const App = () => {
  const turns = Array.from({ length: 10 }, (_, i) => i + 1);
  const [combatants, setCombatants] = useState([
    { name: "Xan", initiative: 1, hp: 5, ac: 10, turns: turns },
    { name: "Malgra", initiative: 2, hp: 10, ac: 15, turns: turns },
    { name: "Fyrehunters", initiative: 3, hp: 15, ac: 20, turns: turns },
    { name: "Presarium", initiative: 4, hp: 20, ac: 25, turns: turns },
  ]);

  useEffect(() => {
    const sortedCombatants = [...combatants].sort((a, b) => b.initiative - a.initiative);
    setCombatants(sortedCombatants);
  }, []);

  return (
    <div className="init-tracker">
      <h1>Initiative and Status Tracker</h1>
      <table>
        <Header turns={turns} />
        <tbody>
          {combatants.map((combatant, index) => (
            <Combatant
              key={index}
              name={combatant.name}
              initiative={combatant.initiative}
              hp={combatant.hp}
              ac={combatant.ac}
              turns={combatant.turns}
            />
          ))}
        </tbody>
      </table>
      <NextTurnButton />
    </div>
  );
};

const NextTurnButton = () => {
  const handleClick = () => {
    //find the next unused turn and tick that checkbox
    //get the combatants and turns
    /*
    for (turns)
     for (combatants)
      if (turn[i] is unclicked)
        set turn[i] to clicked
        exit the loop
    */

    console.log("Button Clicked");
  };
  return <button onClick={handleClick}>Next Turn</button>;
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

/*
<Combatant name={"Xan"} initiative={1} hp={27} ac={1} turns={turns} />
          <Combatant name={"Malgra"} initiative={2} hp={30} ac={2} turns={turns} />
          <Combatant name={"Fyrehunters"} initiative={2} hp={33} ac={1} turns={turns} />
          <Combatant name={"Presarium"} initiative={4} hp={36} ac={4} turns={turns} />
*/
