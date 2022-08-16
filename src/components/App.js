import React, {useState, useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [editPizza, setEditPizza] = useState({
    topping: "",
    size: "Small",
    vegetarian: true,
  })

  useEffect(() => {
    fetch('http://localhost:3001/pizzas')
    .then(res => res.json())
    .then(pizzaData => setPizzas(pizzaData))
  },[]);

  function handleSubmitForm(updatedPizza) {
    setPizzas(pizzas.map(pizza => pizza.id === updatedPizza.id ? updatedPizza : pizza))
  }

  function handleEditPizza(editingPizza) {
    setEditPizza(editingPizza)
  }
  
  return (
    <>
      <Header />
      <PizzaForm currentPizza={editPizza} onSubmitForm={handleSubmitForm} />
      <PizzaList pizzas={pizzas} onEditPizza={handleEditPizza} />
    </>
  );
}

export default App;
