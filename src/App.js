import React, { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Select from "./components/Select";
import Table from "./components/Table";
import DATA from "./data.js";

const App = () => {
  const [airline, setAirline] = useState("all");
  const [airport, setAirport] = useState("all");

  const formatValue = (property, value) => {
    if (property === "airline") {
      return DATA.getAirlineById(value).name;
    } else {
      return DATA.getAirportByCode(value).name;
    }
  };

  const airlineSelected = (value) => {
    if (value !== "all") {
      value = parseInt(value, 10);
    }
    setAirline(value);
  };

  const airportSelected = (value) => {
    setAirport(value);
  };

  const clearFilters = () => {
    setAirline("all");
    setAirport("all");
  };

  const columns = [
    { name: "Airline", property: "airline" },
    { name: "Source Airport", property: "src" },
    { name: "Destination Airport", property: "dest" },
  ];

  const filteredRoutes = DATA.routes.filter((route) => {
    return (
      (route.airline === airline || airline === "all") &&
      (route.src === airport || route.dest === airport || airport === "all")
    );
  });

  const filteredAirlines = DATA.airlines.map((airline) => {
    const active = !!filteredRoutes.find(
      (route) => route.airline === airline.id
    );
    return Object.assign({}, airline, { active });
  });

  const filteredAirports = DATA.airports.map((airport) => {
    const active = !!filteredRoutes.find(
      (route) => route.src === airport.code || route.dest === airport.code
    );
    return Object.assign({}, airport, { active });
  });

  const defaultsSelected = airline === "all" && airport === "all";

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Airline Routes</h1>
      </header>
      <section>
        <Map routes={filteredRoutes} />
        <p>
          Show routes on
          <Select
            options={filteredAirlines}
            valueKey="id"
            titleKey="name"
            enabledKey="active"
            allTitle="All Airlines"
            value={airline}
            onSelect={airlineSelected}
          />
          flying in or out of
          <Select
            options={filteredAirports}
            valueKey="code"
            titleKey="name"
            enabledKey="active"
            allTitle="All Airports"
            value={airport}
            onSelect={airportSelected}
          />
          <button onClick={clearFilters} disabled={defaultsSelected}>
            Show All Routes
          </button>
        </p>

        <Table
          className="routes-table"
          columns={columns}
          rows={filteredRoutes}
          format={formatValue}
        />
      </section>
    </div>
  );
};

export default App;
