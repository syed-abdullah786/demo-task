import React from "react";
import { useSelector } from 'react-redux';
import Table from "../../components/Table";

function Fav() {
    const favorites = useSelector((state) => state.favorites);
    const countries = useSelector((state) => state.countries);
    const favoriteCountries = countries.filter(country => favorites.includes(country?.cca3));
  return (
    <div className="pb-8">
      <p className="md:mx-20 text-3xl mt-2 mb-2">Favorite Countries</p>
    <div className="w-100 md:mx-20">
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table Countries={favoriteCountries}/>
    </div>
  </div>
  </div>
  )
}

export default Fav