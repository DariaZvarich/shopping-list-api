import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ShoppingList = () => {
    const [items, setItems] = useState(null);
    const [name, setName] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/api/items')
        .then((res) => setItems(res.data.items))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);

    if (items === null || items === undefined){
        return <div>loading ...</div>;
    }

    if (items.length < 1) {
        return (
            <div>
                You have no items
            </div>
        );
    }

    function handleRemove(id){
        const deleteItem = items.filter((item) => item.id !== id);
        setItems(deleteItem);
    }
    function handleAddButtonClick(){
        const newItem = {
            id: items.length + 1,
            name: name,
            quantity: 1,
            isSelected: false,
        };
        setItems([...items, newItem]);
        setName('');
    }
    function toggleComplete(index){
        const updateItem = [...items];
        updateItem[index].isSelected = !updateItem[index].isSelected;
        setItems(updateItem);

    }

    function handleQuantityIncrease(index){
        const increaseItem = [...items];
        increaseItem[index].quantity++;
        setItems(increaseItem);
    }

    return (
        <div className='item-name'> 
        <div>
            <input type = "text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Item name' />
            <button onClick={handleAddButtonClick}> Add Item 
            </button>
            <ul>
            {items.map((item, index) => (
                <li key={item.id}>
                <span style={{ textDecoration: item.isSelected ? 'line-through' : 'none' }}
                                onClick={() => toggleComplete(index)}>
                {item.name}
                </span>
                <button type="button" onClick={() => handleRemove(item.id)}>
                    Remove
                </button>
                </li>
            ))}
            </ul>
        </div>
        </div>
      );
};

export default ShoppingList;