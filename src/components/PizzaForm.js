import React, { useState, useEffect } from "react";

function PizzaForm({ currentPizza, onSubmitForm }) {
  const [formData, setFormData] = useState(currentPizza)
  const { topping, size, vegetarian } = formData
 
  useEffect(() => setFormData(currentPizza),[currentPizza])

  function handleChange(e) {
    if (e.target.name === "vegetarian") {
      setFormData({...formData,
        vegetarian: e.target.value === "Vegetarian"
      })
    } else {
      setFormData({...formData,
        [e.target.name]: e.target.value,
      })
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:3001/pizzas/${currentPizza.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(res => res.json())
    .then(updatedPizza => onSubmitForm(updatedPizza))
    setFormData({
      topping: "",
      size: "",
      vegetarian: false,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            value={topping}
            onChange={handleChange}
            placeholder="Pizza Topping"
          />
        </div>
        <div className="col">
          <select value={size} onChange={handleChange} className="form-control" name="size">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              onChange={handleChange}
              checked={vegetarian ? "checked" : ""}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              onChange={handleChange}
              checked={vegetarian ? "" : "checked"}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
