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
            if (search === null) {
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
    const [title, setTitle] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [image, setImage] = useState(null);


    // popup for dish item click
    const openPopup = (props) => {
        setTitle(props.label);
        setIngredients(props.ingredients);
        setImage(props.image);

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
            {items.map((item) => {
                return (
                    <div className='card' key={item.recipe.label} onClick={() => openPopup(item.recipe)}>
                        <img alt="dish" src={item.recipe.image}></img>
                        <p>{item.recipe.label}</p>
                    </div>
                )
            })}

            {popupIsActive && (
                <div className="popup">
                    <div onClick={closePopup} className="overlay"></div>
                    <div className="popup-card">
                        <button className="close-popup" onClick={closePopup}>X</button>

                        <div className='container'>
                            <div className="popup-left">
                                <img alt="dish" src={image}></img>
                            </div>

                            <div className="popup-right">
                                <h2>{title}</h2>
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