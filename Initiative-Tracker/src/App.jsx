import { useState } from "react";

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
      <table>
        <Header turns={turns} />
        <tbody>
          <Combatant name={"Xan"} initiative={1} hp={27} ac={1} turns={turns} />
          <Combatant name={"Malgra"} initiative={2} hp={30} ac={2} turns={turns} />
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
