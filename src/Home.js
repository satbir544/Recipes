import { useState, useEffect } from 'react';
import Dishes from './Components/Dishes';
import './Home.css'

function Home() {
    // store user input
    const [search, setSearch] = useState('popular');
    const [inputTxt, setInputTxt] = useState(null);

    const getInputTxt = (val) => {
        setInputTxt(val.target.value);
    }

    const searchClickHandler = () => {
        setSearch(inputTxt);
        localStorage.setItem("searchTxt", JSON.stringify(inputTxt));
    }

    useEffect(() => {
        const data = localStorage.getItem("searchTxt");
        setSearch(data);
    }, [])


    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchClickHandler();
        }
    }

    const inputClickHandler = (e) => {
        e.target.select();
    }


    // store dish types
    const [cuisineType, setCuisineType] = useState(null);
    const [mealType, setMealType] = useState(null);
    const [dishType, setDishType] = useState(null);


    const handleCuisineType = (e) => {
        setCuisineType(e.target.value);
    }

    const handleMealType = (e) => {
        setMealType(e.target.value);
    }

    const handleDishType = (e) => {
        setDishType(e.target.value);
    }

    return (
        <div className="home">
            <div className="inputs">
                <div className="left">
                    <input type='text' defaultValue="Enter Dish" className="dishInput" onChange={getInputTxt} onKeyDown={handleKeyDown} onClick={inputClickHandler}/>
                    <button className="searchBtn" onClick={searchClickHandler}>Search</button>
                </div>

                <div className="right">
                    <select onChange={handleCuisineType}>
                        <option value="">Cuisine Type</option>
                        <option value="american">American</option>
                        <option value="asian">Asian</option>
                        <option value="british">British</option>
                        <option value="caribbean">Caribbean</option>
                        <option value="central europe">Central Europe</option>
                        <option value="chinese">Chinese</option>
                        <option value="eastern europe">Eastern Europe</option>
                        <option value="french">French</option>
                        <option value="indian">Indian</option>
                        <option value="italian">Italian</option>
                        <option value="japanese">Japanese</option>
                        <option value="kosher">Kosher</option>
                        <option value="mediterranean">Mediterranean</option>
                        <option value="mexican">Mexican</option>
                        <option value="middle eastern">Middle Eastern</option>
                        <option value="nordic">Nordic</option>
                        <option value="south american">South American</option>
                        <option value="south east asian">South East Asian</option>
                    </select>
                    
                    <select onChange={handleMealType}>
                        <option value="">Meal Type</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                        <option value="teatime">Teatime</option>
                    </select>

                    <select onChange={handleDishType}>
                        <option value="">Dish Type</option>
                        <option value="pancake">Pancake</option>
                        <option value="desserts">Desserts</option>
                        <option value="drinks">Drinks</option>
                        <option value="starter">Starter</option>
                        <option value="main course">Main Course</option>
                        <option value="cereals">Cereals</option>
                        <option value="bread">Bread</option>
                        <option value="condiments and sauces">Sauces</option>
                        <option value="biscuits and cookies">Cookies</option>
                        <option value="preps">Preps</option>
                        <option value="preserve">Preserve</option>
                        <option value="salad">Salad</option>
                        <option value="sandwiches">Sandwiches</option>
                        <option value="side dish">Side Dish</option>
                        <option value="soup">Soup</option>
                    </select>
                </div>
            </div>

            <Dishes search={search} cuisineType={cuisineType} mealType={mealType} dishType={dishType} />
        </div>
    );
}

export default Home;
