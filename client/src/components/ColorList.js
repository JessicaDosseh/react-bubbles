import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ props, colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setcolorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    console.log("Saving edits to color", colorToEdit);

    axiosWithAuth()
    // .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit);
    // props.history.push("/bubblepage");

    // .put("colors/" + colorToEdit.id, colorToEdit)
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then (response => {
      console.log("Color edited:", response);

      axiosWithAuth()
          .get(`http://localhost:5000/api/colors`)
          .then(res => updateColors(res.data))
          .catch(err => console.log(err))
        setEditing(false);

    })
    .catch (error => {
      console.log("Couldn't edit color:", error);
    })

  };

  const deleteColor = color => {
    // make a delete request to delete this color
    console.log("Deleting color", color);
    console.log("Deleting color id: ", color.id);

    axiosWithAuth()
    // .delete(`http://localhost:5000/api/colors/${color.id}`);
    // props.history.push("/bubblePage");
    // .delete("colors/" + color.id)
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then (response => {
      console.log("Color deleted:", response);

      let remainingColors = colors.filter(existingColor => existingColor.id !== color.id);
      updateColors(remainingColors);

    })
    .catch (error => {
      console.log("Could not delete color:", error);
    })
  };

  const addColor = event => {

    event.preventDefault();

    console.log("Adding color", colorToAdd);

    axiosWithAuth()
    // axios()
    .post("http://localhost:5000/api/colors", colorToAdd)
    .then (response => {
      console.log("Color added:", response);

      updateColors([...colors, colorToAdd]);

    })
    .catch (error => {
      console.log("Couldn't add color:", error);
    })
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <div className="addColorDiv">
        <form name="addColor">
          <legend>add color</legend>
              <label>
                color name:
                <input
                  onChange={e =>
                    setcolorToAdd({ ...colorToAdd, color: e.target.value })
                  }
                  value={colorToAdd.color}
                />
              </label>
              <label>
                hex code:
                <input
                  onChange={e =>
                    setcolorToAdd({
                      ...colorToAdd,
                      code: { hex: e.target.value }
                    })
                  }
                  value={colorToAdd.code.hex}
                />
              </label>
            <div className="button-row">
              <button onClick={addColor}>add</button>
            </div>
          </form>
        </div>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
