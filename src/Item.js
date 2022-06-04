const Item = ({ item, onDelete }) => {
  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <button onClick={() => onDelete(item)}>Delete</button>
    </li>
  );
};

export default Item;
