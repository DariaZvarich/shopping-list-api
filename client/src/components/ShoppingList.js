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
    function handleAddButtonClick(id){
        const newItem = {
            id: items.length + 1,
            name: name,
            quantity: 1,
            isSelected: false,
        };
        setItems([...items, newItem]);
        setName('');
    }

    return (
        <div>
            <input type = "text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Item name' />
            <button onClick={handleAddButtonClick}> Add Item </button>
            <ul>
            {items.map((item) => (
                <li key={item.id}>
                <span>{item.name}</span>
                <button type="button" onClick={() => handleRemove(item.id)}>
                    Remove
                </button>
                <button>
                    Add Item
                </button>
                </li>
            ))}
            </ul>
        </div>
      );
};

export default ShoppingList;