import React, { useEffect, useState, useContext } from "react";
import { useSelector } from 'react-redux';
import Table from "../../components/Table";

function Visited() {
const visitedCountries = useSelector((state) => state.visitedCountries);
  const countries = useSelector((state) => state.countries);
  const [sortedVisitedCountries, setSortedVisitedCountries] = useState([]);

  useEffect(() => {
    const sorted = sortVisitedCountries();
    setSortedVisitedCountries(sorted);
  }, [visitedCountries]);

  const sortVisitedCountries = () => {
    const sortedVisitedCountries = { ...visitedCountries };
    return Object.entries(sortedVisitedCountries).sort(
      (a, b) => new Date(a[1]) - new Date(b[1])
    );
  };

  const Countries = sortedVisitedCountries
    .map(([countryCode]) => countries.find((c) => c.cca3 === countryCode))
    .filter(Boolean);

  const renderAdditionalColumns = {
    header: <th scope="col" className="px-6 py-3">Visit Date</th>,
    body: (country) => {
      const visitDate = visitedCountries[country.cca3];
      return <td className="px-6 py-4">{visitDate}</td>;
    },
  };

  return (
    <div className="pb-8">
      <p className="md:mx-20 text-3xl mt-2 mb-2">Visited Countries ({Object.entries(sortedVisitedCountries).length})</p>
      <div className="w-100 md:mx-20">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <Table
            Countries={Countries}
            renderAdditionalColumns={renderAdditionalColumns}
          />
        </div>
      </div>
    </div>
  );
}

export default Visited;
