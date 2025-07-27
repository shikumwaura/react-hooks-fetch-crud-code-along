import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Fetch items on mount
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch items");
        return r.json();
      })
      .then(setItems)
      .catch((err) => console.error(err));
  }, []);

  function handleAddItem(newItem) {
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to add item");
        return r.json();
      })
      .then((addedItem) => setItems((items) => [...items, addedItem]))
      .catch((err) => console.error(err));
  }

  function handleUpdateItem(updatedItem) {
    setItems((items) =>
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  }

  function handleToggleCart(item) {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isInCart: !item.isInCart }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to update item");
        return r.json();
      })
      .then(handleUpdateItem)
      .catch((err) => console.error(err));
  }

  function handleDeleteItem(deletedItem) {
    fetch(`http://localhost:4000/items/${deletedItem.id}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (!r.ok) throw new Error("Failed to delete item");
        setItems((items) => items.filter((item) => item.id !== deletedItem.id));
      })
      .catch((err) => console.error(err));
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) =>
    selectedCategory === "All" ? true : item.category === selectedCategory
  );

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter category={selectedCategory} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onToggleCart={() => handleToggleCart(item)}
            onDeleteItem={() => handleDeleteItem(item)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
