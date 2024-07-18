import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite, setCountries, toggleVisited } from '../../utils/slice';
import records from "../../services/records";
import heart from "../../../src/assets/images/heart.png";
import fillHeart from "../../../src/assets/images/fill-heart.png";
import spinner from "../../../src/assets/images/spinner.gif";
import Table from "../../components/Table";

function Home() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const countries = useSelector((state) => state.countries);
  const visitedCountries = useSelector((state) => state.visitedCountries);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    records
      ?.getCountries()
      .then((res) => {
        dispatch(setCountries(res.data))
        setFilteredCountries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error is", err);
      });
  }, []);

  const toggleFav = (countryCode) => {
    dispatch(toggleFavorite(countryCode));
  };

  const handleSearchChange = (event) => {
    const newSearchText = event.target.value.toLowerCase();
    setSearchText(newSearchText);

    const filteredArray = countries.filter((country) => {
      const searchTextInName = country?.name?.common
        ?.toLowerCase()
        .includes(newSearchText);
      return searchTextInName;
    });
    setFilteredCountries(filteredArray);
  };

  const toggleVisit = (countryCode, visitDate) => {
    dispatch(toggleVisited({ countryCode, visitDate }));
  };

  const renderAdditionalColumns = {
    header: (
      <>
        <th scope="col" className="px-6 py-3">
          Add to Fav
        </th>
        <th scope="col" className="px-6 py-3">
          Visited
        </th>
      </>
    ),
    body: (country) => (
      <>
        <td className="px-6 py-4 text-center">
          <button
            title={
              favorites.includes(country?.cca3)
                ? "Remove from Favourite"
                : "Add to favourite"
            }
            onClick={() => toggleFav(country?.cca3)}
          >
            <img
              width="30px"
              src={favorites.includes(country?.cca3) ? fillHeart : heart}
              alt={country?.flags?.alt}
            />
          </button>
        </td>
        <td className="px-6 py-4">
          {visitedCountries[country.cca3] ? (
            <span className="bg-green-500 text-white px-2 py-1 rounded">
              Visited: {visitedCountries[country.cca3]}
            </span>
          ) : (
            <>
              <input
                max={today}
                type="date"
                onChange={(event) =>
                  toggleVisit(country.cca3, event.target.value)
                }
              />
            </>
          )}
        </td>
      </>
    ),
  };

  return (
    <>
      {loading ? (
        <div className="h-screen bg-white">
          <div className="flex justify-center items-center h-full">
            <img className="h-16 w-16" src={spinner} alt="loading" />
          </div>
        </div>
      ) : (
        <div className="pb-8">
          <p className="md:mx-20 text-3xl mt-2 mb-2">Countries Data</p>
          <div className="w-100 md:mx-20">
            <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
              <div className="p-4">
                <label className="sr-only">Search</label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    value={searchText}
                    onChange={handleSearchChange}
                    type="text"
                    id="table-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by Country Name"
                  />
                </div>
              </div>
              <Table
                Countries={filteredCountries}
                renderAdditionalColumns={renderAdditionalColumns}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
