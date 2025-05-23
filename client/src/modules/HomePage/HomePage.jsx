import { React, useState } from "react";
import NavBar from "../../components/NavBar";
import Find from "../../components/Find";
import ColoredLine from "../../components/ColoredLine";
import FilterButtons from "../../components/FilteredButtons";
import FoodOptions from "../../components/FoodOptions";
import Food from "../../components/Food";
import { Menu, Transition } from "@headlessui/react";
import Header from "../../components/Header";
import Footer from "../../components/footer/Footer";

const HomePage=()=>{
    const [location, setLocation] = useState("Mumbai");
  const [searchQuery, setQuery] = useState("");
  const [filters, setFilters] = useState({ rating: 0 });

  const onChangeFilters = (filters) => {
    setFilters(filters);
  };

  return (
    <div>
      <Header
        functions={[location, setLocation]}
        setQuery={setQuery}
        searchQuery={searchQuery}
      />
      <FoodOptions />
      <ColoredLine />
      <FilterButtons filters={filters} onChangeFilters={onChangeFilters} />
      <h1 className="mx-4 md:mx-12 lg:mx-24 xl:mx-44 pt-4 text-2xl md:text-3xl font-normal food-head text-center md:text-left" >Best Places in {location} to Visit</h1>
      <Food filters={filters} />
      <Footer/>
    </div>
  );
}

export default HomePage;