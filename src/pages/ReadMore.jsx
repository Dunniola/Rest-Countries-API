import React, { useEffect, useState } from "react";
import { FaMoon } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

function ReadMore() {
  const { state } = useLocation();
  const [toggle, setToggle] = useState(true);
  const[fetchData, setFetchedData] = useState([]);
  
  const country = state?.country;

  if (!country) {
    return <p>No data available</p>;
  }

  const handleToggle = () => {
    setToggle(!toggle);
  };
  const currency = country?.currencies
    ? Object.values(country?.currencies)[0]
    : null;

  const languages = country?.languages
    ? Object.values(country.languages)
    : null;

  const borders = country?.borders ? Object.values(country.borders) : [];
  console.log(borders);

  const handleBack = () =>{
    window.history.back()
  }
  const countryDictionary = fetchData.reduce((acc, country) => {
    acc[country.cca3] = country.name.common; // Create a map of cca3 to country name
    return acc;
  }, {});
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  

  return (
    <>
      <div
        className={`grid place-content-center min-h-screen text-[1rem]  ${
          toggle ? "bg-Neutral-veryLightMode" : " bg-Neutral-veryLightGray "
        } py-16 overflow-hidden `}
        >
        <div
          className={`container ${
            toggle ? "bg-Neutral-veryDarkBlue text-Neutral-white " : "bg-Neutral-veryLightGray text-Neutral-darkBlue font-semibold "
          }`}
        >
          <div
            className={`flex justify-between items-center px-5 py-4  ${
              toggle
                ? "bg-Neutral-darkBlue"
                : "bg-Neutral-veryLightGray  font-bold shadow-md"
            }`}
          >
            <h1 className={` ${toggle ? "text-Neutral-white"  :"text-Neutral-darkBlue"}`}>Where in the world?</h1>
            <div className={`flex ${toggle ? "text-Neutral-white" : "text-Neutral-darkBlue"} items-center gap-2`}>
              <FaMoon onClick={handleToggle} className={` text-[${toggle ? "" : "blue"}] `} />
              <span>Dark Mode</span>
            </div>
          </div>

          <div className="flex items-center w-0 mt-10 shadow-lg">
            <button className={`flex flex-row-reverse  ${toggle ? "bg-Neutral-darkBlue shadow-custom-dark" : "bg-Neutral-veryLightGray shadow-top-bottom"} items-center float-right gap-3 px-5 py-1 mx-5  outline-none `}>
              Back
              <FaArrowLeft onClick = {handleBack}
                className={`text-[${toggle ? 'white' : 'darkblue'}] ${toggle ? 'text-Neutral-white ' : 'text-Neutral-darkBlue'}`}
              />

            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-[2rem] md:gap-[2rem] px-5 max-md:px-4  max-md:mt-10 items-center md:py-10">
  {/* Flag Section */}
  <div className="h-[20rem] md:h-[25rem] lg:h-[20rem]">
    <img
      src={country.flags.png}
      alt={`${country.name.common} Flag`}
      className="object-cover w-full h-full"
    />
  </div>

  {/* Details and Border Countries Section */}
  <div className="flex flex-col gap-6">
    {/* Country Details */}
    <div>
      <h2
        className={`${
          toggle ? "text-Neutral-white" : "text-Neutral-darkBlue"
        } text-[1.5rem] font-bold py-4`}
      >
        {country?.name.common}
      </h2>
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p>
            <strong>Native Name:</strong>{" "}
            {country?.name.nativeName
              ? Object.values(country.name.nativeName)[0]?.common
              : "N/A"}
          </p>
          <p>
            <strong>Population:</strong> {country?.population?.toLocaleString() || "N/A"}
          </p>
          <p>
            <strong>Region:</strong> {country?.region}
          </p>
          <p>
            <strong>Sub Region:</strong> {country?.subregion}
          </p>
          <p>
            <strong>Capital:</strong> {country?.capital}
          </p>
        </div>
        <div>
          <p>
            <strong>Top Level Domain:</strong> {country?.tld}
          </p>
          <p>
            <strong>Currencies:</strong> {currency ? `${currency.name}` : "N/A"}
          </p>
          <p>
            <strong>Languages:</strong> {languages?.join(", ") || "N/A"}
          </p>
        </div>
      </div>
    </div>

    {/* Border Countries */}
    <div className="items-start py-[3rem] gap-3">
      <h3 className="mb-4 text-lg font-bold ">Border Countries:</h3>
      <div className="flex flex-wrap gap-2">
        {borders.length > 0 ? (
          borders.map((borderCode, index) => (
            <span
              key={index}
              className={`${
                toggle
                  ? "bg-Neutral-darkBlue text-Neutral-white"
                  : "text-Neutral-darkBlue bg-Neutral-veryLightGray border-2"
              } px-4 py-2 rounded-md shadow-lg text-[0.8rem]`}
            >
              {countryDictionary[borderCode] || borderCode}
            </span>
          ))
        ) : (
          <p className="text-Neutral-darkGray">None</p>
        )}
      </div>
    </div>
  </div>
</div>


          
              
         
          
         
          
              
        </div>
      </div>
    </>
  );
}

export default ReadMore;
