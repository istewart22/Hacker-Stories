import Item from './Item';

const List = ({ list, onDelete }) => {
  return (
    <ul>
      {list.map((item) => (
        <Item key={item.objectID} item={item} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default List;
