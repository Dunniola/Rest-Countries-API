import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { FaMoon } from 'react-icons/fa'
import ReadMore from './ReadMore'
import { Navigate, useNavigate } from 'react-router-dom'

function Home() {
  const[menu, setMenu] = useState(false) 
  const[fetchData, setFetchedData] = useState([]);
  const[searchQuery, setSearchQuery] = useState("")
  const[toggle, setToggle] = useState(true)
  const navigate = useNavigate();
 
  const[loading, setLoading] = useState(false)
  const[selectedContinent, setSelectedContinent] = useState("")
const handleClick = ()  =>{
  setMenu(!menu)
}



useEffect(()  => {
  const mappedData =  async () =>{
    setLoading(true)
    

    try {
      
      const response = await axios.get('https://restcountries.com/v3.1/all')
      setFetchedData(response.data)
        console.log(response.data)
        
      
    } catch (error) {
      console.log('Error fetching data:', error)
    }
    setLoading(false)
  }
    mappedData();
    console.log('Updated Selected Continent:', selectedContinent);
}, [selectedContinent])



const filteredData = fetchData.filter((country) =>{
 const matchesRegion = selectedContinent ? country.region === selectedContinent: true;

 
 


 const matchesSearch = searchQuery ? country.name.common.toLowerCase().includes(searchQuery.toLowerCase()):true
 console.log(matchesRegion)
 
 return matchesRegion && matchesSearch
})
const displayedData = filteredData.slice(0, 8);

// console.log(selectedContinent)
  const selectContinent = (continent) => {
  setSelectedContinent(continent);
  console.log("Selected Continent:", continent);
};

 const handleSearch = (e) =>{
  setSearchQuery(e.target.value)
 }

 const handleToggle = () =>{
  setToggle(!toggle)
 }

 const handleSelect = (country) =>{
  navigate("/read-more", {state: {country}});
 }

 
  return (
    <>
    <div className={`grid justify-center min-h-screen text-[1rem] ${toggle ? "bg-Neutral-veryLightMode" : " bg-Neutral-veryLightGray"} py-16 overflow-hidden `}>

      
    <div className={`container w-screen   text-Neutral-white ${toggle ? "bg-Neutral-veryDarkBlue " : "bg-Neutral-white"}`}>

      
      <div className={`flex items-center justify-between p-1 px-10 py-4  ${toggle ? "bg-Neutral-darkBlue" :"bg-Neutral-white text-Neutral-darkBlue font-bold shadow-md"}`}>
      <h1>Where in the world?</h1>
      <div className="flex items-center gap-2">
      <FaMoon onClick={handleToggle} className=''/>
      <span>Dark Mode</span>
      </div>
      
      
      </div>

      <div className='mx-5'>
        <div className={`md:flex items-center justify-between   my-5`}>
          <div>
            <BiSearch className = {`relative cursor-pointer top-7 ${toggle ? "text-Neutral-white" : "text-Neutral-darkBlue"} left-3`} />
            <InputField 
            name = "search"
            id = "search"
            toggle={toggle}
            value ={searchQuery}
            handleSearch={handleSearch}
            className =""
            placeholder = 'Search for a country...'  />
          </div>

          <div className={`flex justify-between items-center text-[0.8rem] gap-5 px-6 max-md:mb-5 py-2 max-md:w-[15rem] ${toggle ? "bg-Neutral-darkBlue" : "bg-Neutral-white shadow-md font-bold"} text-Neutral-darkGray rounded-md`}>
            <p className={`${toggle ? "text-Neutral-darkGray" : "text-Neutral-darkBlue"}`}>Filter by Region</p>

          <div className={`cursor-pointer  ${toggle ? "text-Neutral-white" : "text-Neutral-darkGray shadow-md font-bold"} `}>
          <AiOutlineDown className={`w-[1rem]  h-[0.6rem] `} onClick={handleClick}/>
          </div>
          
          </div>

          
        </div>
      </div>
    <div className='relative'>
      <ul className={`mt-4  py-2 px-[3rem]  w-[15rem] h-[12rem] absolute md:right-3 shadow-lg top-shadow-xl rounded-md  max-md:absolute max-md:left-5 md:bottom-[-10rem] max-md:bottom-[-11rem] ${menu ? "hidden" : "block"}  cursor-pointer ${toggle ? "bg-Neutral-darkBlue text-Neutral-darkGray" : "bg-Neutral-white text-Neutral-darkBlue font-semibold "}`}>
        
      {["Africa", "Americas", "Asia", "Europe", "Oceania"].map((continent) => (
  <li
    key={continent}
    className="relative mt-2 cursor-pointer right-7 "
    onClick={() => selectContinent(continent)} // Pass the continent name explicitly
  >
    {continent}
  </li>
))}

    </ul>
      </div>



{/*  mapping  */}


    <div className="grid grid-cols-1 gap-8 px-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
          <p>Loading...</p>
        ) : (
          displayedData .map((country) => (
            
            <div key={country?.cca3} className='flex justify-between mt-6 '>
              
              <div onClick ={() => handleSelect(country)}className='w-full cursor-pointer bg-Neutral-white text-Neutral-darkBlue'>
                <img src={country.flags.png} alt="" className=" w-full h-[10rem] object-cover" />
                <div className={`px-5 ${toggle ? "bg-Neutral-darkBlue text-Neutral-veryLightGray" : "bg-Neutral-white text-Neutral-darkBlue shadow-lg"}`}>
                <h2 className={` ${toggle ? "text-Neutral-white" : "text-Neutral-darkBlue"} text-[1.2rem] font-bold`}>{country?.name.common}</h2>
                <p className=''>Population: <span className='text-Neutral-darkGray'>{country?.population}</span></p>
                <p>Region: <span className='text-Neutral-darkGray'>{country?.region}</span></p>
                <p>Capital: <span className="text-Neutral-darkGray">{country?.capital}</span></p>
                </div>
                </div>
               
              </div>
           
          ))
          
        )}   
      </div>   
      
      
    </div>




      
    </div>
    
    </>
  )
}



  function InputField ({name, placeholder, id, value, handleSearch, toggle} ) {

    
    return(
      <>
      <input type="text"
      
      name={name}
      placeholder={placeholder}
      id= {id}
      value={value}
      onChange={handleSearch}
      className={`px-[3rem] rounded-md py-2 w-full text-sm outline-none active:bg-none  mb-5 ${toggle ? "bg-Neutral-darkBlue" : "bg-Neutral-white shadow-md text-Neutral-darkBlue"}  `}
      
      
      
      />
      </>
    )
  }


  
    
    
  


export default Home