import './App.css';

const Item = ({ item, onDelete }) => {
  return (
    <li className='item'>
      <span style={{ width: '40%' }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: '30%' }}>{item.author}</span>
      <span style={{ width: '10%' }}>{item.num_comments}</span>
      <span style={{ width: '10%' }}>{item.points}</span>
      <span style={{ width: '10%' }}>
        <button className='button button_small' onClick={() => onDelete(item)}>
          Delete
        </button>
      </span>
    </li>
  );
};

export default Item;
