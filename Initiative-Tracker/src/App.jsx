import { useState } from "react";

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
        <thead>
          <tr>
            <td>Name</td>
            <td>Initiative</td>
            {turns.map((turn, index) => (
              <td key={index}>Turn {turn}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {combatants.map((combatant, index) => (
            <tr key={index}>
              <td> {combatant.name}</td>
              <td> {combatant.initiative}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
