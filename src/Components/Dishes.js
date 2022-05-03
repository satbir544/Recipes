import './Dishes.css';

import { useState, useEffect } from 'react';

function Dishes({ search, cuisineType, mealType, dishType }) {
    // id and key
    const APP_ID = "0354f5ab";
    const API_KEY = "e9db58c25f81040a247151ccb5f7b614";

    const [items, setItems] = useState([]);

    // fetches data from edamam
    useEffect(() => {
        const getData = async () => {
            let toAdd = "";
            if (search === null || search === "") {
                toAdd += `&q=popular`;
            } else {
                toAdd += `&q=${search}`;
            }
            
            if (cuisineType !== null && cuisineType !== "") {
                toAdd += `&cuisineType=${cuisineType}`;
            }
            if (mealType !== null && mealType !== "") {
                toAdd += `&mealType=${mealType}`;
            }
            if (dishType !== null && dishType !== "") {
                toAdd += `&dishType=${dishType}`;
            }

            const api = await fetch(
                `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${API_KEY}` + toAdd
            );
            const data = await api.json();

            setItems(data.hits);
        };

        getData();
    }, [search, cuisineType, mealType, dishType]);


    // popup items
    const [popupIsActive, setPopup] = useState(false);
    const [ingredients, setIngredients] = useState([]);
    const [dishInfo, setDishInfo] = useState(null);


    // popup for dish item click
    const openPopup = (props) => {
        setIngredients(props.ingredients);
        setDishInfo(props);

        setPopup(!popupIsActive);
    };

    const closePopup = () => {
        setPopup(!popupIsActive);
    };

    if (popupIsActive) {
        document.body.classList.add('active-popup')
    } else {
        document.body.classList.remove('active-popup')
    }


    return (
        <div className="dishes">
            { items.length > 0 ? (
                items.map((item) => {
                    return (
                        <div className='card' key={item.recipe.label} onClick={() => openPopup(item.recipe)}>
                            <img alt="dish" src={item.recipe.image}></img>
                            <p>{item.recipe.label}</p>
                        </div>
                    )
                })
            ) : <div className='noItems'><p>Sorry, No items found.</p></div>
            }

            {popupIsActive && (
                <div className="popup">
                    <div onClick={closePopup} className="overlay"></div>
                    <div className="popup-card">
                        <button className="close-popup" onClick={closePopup}>X</button>

                        <div className='container'>
                            <div className="popup-left">
                                <div>
                                    <img alt="dish" src={dishInfo.image}></img>
                                </div>
                                <div className="types">
                                    <p><strong>Cuisine Type: </strong>{dishInfo.cuisineType}</p>
                                    <p><strong>Meal Type: </strong>{dishInfo.mealType}</p>
                                    <p><strong>Dish Type: </strong>{dishInfo.dishType}</p>
                                </div>
                            </div>

                            <div className="popup-right">
                                <div className='title'>
                                    <h2>{dishInfo.label}</h2>
                                </div>
                                <div className="popup-bottom-right">
                                    <div className='ingredients'>
                                        {ingredients.map((ingredient) => {
                                            return (
                                                <div>
                                                    <ul>
                                                        <li>{ingredient.text}</li>
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dishes;