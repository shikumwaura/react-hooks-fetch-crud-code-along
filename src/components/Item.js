import React from "react";

function Item({ item, onToggleCart, onDeleteItem }) {
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button className={item.isInCart ? "remove" : "add"} onClick={onToggleCart}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={onDeleteItem}>
        Delete
      </button>
    </li>
  );
}

export default Item;
