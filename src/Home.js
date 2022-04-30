import { useState, useEffect } from 'react';
import Dishes from './Components/Dishes';
import './Home.css'

function Home() {
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

    return (
        <div className="home">

            {/*to do: add drop downs for cuisineType, mealType, and dishType, navbar that doesnt move*/}

            <div className="inputs">
                <input type='text' defaultValue="Enter Dish" className="dishInput" onChange={getInputTxt} onKeyDown={handleKeyDown} onClick={inputClickHandler}/>
                <button className="searchBtn" onClick={searchClickHandler}>Search</button>
            </div>
            <Dishes search={search} cuisineType="" mealType="" dishType="" />
        </div>
    );
}

export default Home;
