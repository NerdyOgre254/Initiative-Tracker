import { useState, useEffect, useRef, Fragment } from "react";
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

//subsection for adding combatants
const CombatantAdder = ({ onAddCombatant }) => {
  const [combatant, setCombatant] = useState({
    characterName: "",
    initiative: "",
    hp: 0,
    ac: 0,
  });

  //manages holding state of typed inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCombatant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //creates a formatted combatant on click of button
  const handleClick = () => {
    const formattedCombatant = {
      characterName: combatant.characterName,
      initiative: Number(combatant.initiative),
      hp: Number(combatant.hp),
      ac: Number(combatant.ac),
    };

    //call parent function
    onAddCombatant(formattedCombatant);

    //form reset at end of
    setCombatant({
      characterName: "",
      initiative: "",
      hp: 0,
      ac: 0,
    });
  };

  //value in each input feeds the data upward
  return (
    <div className="add-character-box">
      <table>
        <tbody>
          <tr>
            <td>Character Name</td>
            <td>
              <input
                type="text"
                required
                name="characterName"
                value={combatant.characterName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>Initiative</td>
            <td>
              <input
                type="text"
                required
                name="initiative"
                value={combatant.initiative}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>HP</td>
            <td>
              <input type="text" name="hp" value={combatant.hp} onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <td>AC</td>
            <td>
              <input type="text" name="ac" value={combatant.ac} onChange={handleChange} />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={handleClick}>Add Character</button>
    </div>
  );
};

//component for inserting combatant into data structure
//note that previous version had <> in render which caused no key indexing
const Combatant = ({ name, initiative, hp, ac, turns }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{initiative}</td>
      <td>{hp}</td>
      <td>{ac}</td>
      {turns.map((turn, index) => (
        <td key={index}>
          <input className="turn-checkbox" type="checkbox" />
          <br />
          <ScalingInput />
        </td>
      ))}
    </tr>
  );
};

//component for removing combatant from data structure, dropdown menu with confirmation box
const CombatantRemover = ({ combatants, onRemove }) => {
  const [selectedCombatant, setSelectedCombatant] = useState("None");

  const handleClick = () => {
    if (selectedCombatant !== "None") {
      onRemove(selectedCombatant);
      setSelectedCombatant("None");
    }
  };

  return (
    <label>
      Remove Combatant:
      <select
        name="selectedCombatant"
        value={selectedCombatant}
        onChange={(e) => setSelectedCombatant(e.target.value)}
      >
        <option value="None">---</option>
        {combatants.map((combatant) => (
          <option key={combatant.characterName} value={combatant.characterName}>
            {combatant.characterName}
          </option>
        ))}
      </select>
      <button onClick={handleClick}>Remove!</button>
    </label>
  );
};

const App = () => {
  const turns = Array.from({ length: 10 }, (_, i) => i + 1);
  const [combatants, setCombatants] = useState([]);

  const addCombatant = (newCombatant) => {
    setCombatants((prev) => {
      const updated = [...prev, newCombatant];
      // Sort by initiative (highest first)
      return updated.sort((a, b) => b.initiative - a.initiative);
    });
  };

  const handleRemoveCombatant = (nameToRemove) => {
    setCombatants(combatants.filter((c) => c.characterName !== nameToRemove));
  };

  return (
    <div className="init-tracker">
      <h1 className="title">Initiative and Status Tracker</h1>
      <table className="table-container">
        <Header turns={turns} />
        <tbody>
          {combatants.map((combatant, index) => (
            <Combatant
              key={index}
              name={combatant.characterName}
              initiative={combatant.initiative}
              hp={combatant.hp}
              ac={combatant.ac}
              turns={turns}
            />
          ))}
        </tbody>
      </table>
      <br />
      <CombatantAdder onAddCombatant={addCombatant} />
      <CombatantRemover combatants={combatants} onRemove={handleRemoveCombatant} />
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
