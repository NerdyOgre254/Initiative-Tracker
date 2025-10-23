import { useState, useEffect, useRef } from "react";
import "./App.css";

//header for turn structure table
const Header = ({ turns }) => {
  return (
    <thead>
      <tr className="table-header">
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

//component for scaling text input box under each checkbox
//TODO: text box does not scale the column it's in.
const ScalingInput = () => {
  const [text, setText] = useState("");
  const [inputWidth, setInputWidth] = useState(50);
  const spanRef = useRef(null);

  useEffect(() => {
    if (spanRef.current) {
      const textWidth = spanRef.current.offsetWidth;
      const newWidth = Math.max(50, Math.min(textWidth + 30, 600));
      setInputWidth(newWidth);
    }
  }, [text]);

  return (
    <input
      type="text"
      className="status-box"
      value={text}
      onChange={(e) => setText(e.target.value)}
      style={{ width: `${inputWidth}px` }}
    />
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
            <input className="turn-checkbox" type="checkbox" />
            <br />
            <ScalingInput />
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
      <h1 className="title">Initiative and Status Tracker</h1>
      <table className="table-container">
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
    </div>
  );
};

export default App;

/*
Code timeout zones here
*/

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
