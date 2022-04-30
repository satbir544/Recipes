import './Dishes.css';

import { useState, useEffect } from 'react';

function Dishes({search, cuisineType, mealType, dishType}) {
    const APP_ID = "0354f5ab";
    const API_KEY = "e9db58c25f81040a247151ccb5f7b614";

    const [items, setItems] = useState([]);

    useEffect(() => {
        getData();
    }, [search]);

    const getData = async () => {
        const api = await fetch(
            `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}&imageSize=SMALL&q=${search}`
        );
        const data = await api.json();
        //console.log(data);

        setItems(data.hits);
    };

    return (
        <div className="dishes">
            {items.map((item) => {
                return (
                    <div className='card' key={item.recipe.label}>
                        <img alt="dish" src={item.recipe.image}></img>
                        <p>{item.recipe.label}</p>
                    </div>
                )
            })}
        </div>
    );
}

export default Dishes;