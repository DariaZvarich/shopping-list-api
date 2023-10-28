import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ShoppingList = () => {
    const [items, setItems] = useState(null);

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
        )
    }

    return (
        <div>
            {items.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}    
        </div>
    );
};

export default ShoppingList;