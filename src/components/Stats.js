export default function Stats({ items }) {
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
