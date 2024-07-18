import React from "react";

function Table({Countries,renderAdditionalColumns}) {
  return (
    <>
    {Countries.length > 0 ?   <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Country Name
              </th>
              <th scope="col" className="px-6 py-3">
                Code
              </th>
              <th scope="col" className="px-6 py-3">
                Currency
              </th>
              <th scope="col" className="px-6 py-3">
                Capital
              </th>
              <th scope="col" className="px-6 py-3">
                Flag
              </th>
              {renderAdditionalColumns && renderAdditionalColumns.header}
            </tr>
          </thead>
          <tbody>
			{Countries?.map((country,i)=>(
				  <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
				  <th
					scope="row"
					className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
				  >
					{country?.name?.common}
				  </th>
				  <td className="px-6 py-4">{country?.cca3}</td>
				  <td className="px-6 py-4">{country?.currencies && Object.keys(country.currencies)[0]}</td>
				  <td className="px-6 py-4">{country?.capital?.[0]}</td>
				  <td className="px-6 py-4">
					<img width='35px' src={country?.flags?.png} alt={country?.flags?.alt} />
				  </td>
                  {renderAdditionalColumns && renderAdditionalColumns.body(country)}
				</tr>
			))}
          </tbody>
        </table> :  
        <div className="">
            <div className="w-full md:w-7/12 pt-5 px-4 mb-8 mx-auto text-center">
            <div className="text-lg text-gray-700 py-1">
                No Data to show!
            </div>
        </div>
        </div> }
  
        </>
  )
}

export default Table