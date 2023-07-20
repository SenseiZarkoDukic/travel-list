import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";

export default function App() {
  const [items, setItems] = useState([]);

  // const [numItems, setNumItems] = useState(0);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
    // setNumItems((num) => num + 1);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  // if (sortBy === "clear") {
  //   sortedItems = items.map((item) => item.remove());
  // }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
      <div className="action">
        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="input">SORT BY INPUT ORDER</option>
          <option value="description">SORT By DESCRIPTION</option>
          <option value="packed">SORT BY PACKED STATUS</option>
        </select>

        <button onClick={onClearItems}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  let percPackedItems = Math.round((packedItems * 100) / numItems);

  console.log(numItems);
  console.log(packedItems);
  console.log(percPackedItems);

  return (
    <footer className="stats">
      {percPackedItems === 100 ? (
        <em>You got everything! Ready to go ✈️</em>
      ) : (
        <em>
          You have {numItems} items on your list, and you already packed{" "}
          {packedItems} (
          {isNaN(percPackedItems) ? (percPackedItems = 0) : percPackedItems}%)
        </em>
      )}
    </footer>
  );
}
