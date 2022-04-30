import { useState } from 'react';
import './App.css';
import Dishes from './Components/Dishes';

function Home() {
    const [search, setSearch] = useState('popular');
    const [inputTxt, setInputTxt] = useState(null);

    const getInputTxt = (val) => {
        setInputTxt(val.target.value);
    }

    return (
        <div className="home">

            {/*to do: add drop downs for cuisineType, mealType, and dishType*/}

            <input type='text' defaultValue="Enter Dish" onChange={getInputTxt} />
            <button onClick={()=>setSearch(inputTxt)}>Search</button>
            <Dishes search={search} cuisineType="" mealType="" dishType="" />
        </div>
    );
}

export default Home;
