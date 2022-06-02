const Item = ({ item }) => {
  return (
    <div>
      <li>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </li>
    </div>
  );
};

export default Item;
