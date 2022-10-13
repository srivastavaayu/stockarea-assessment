import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ShowAllWarehouses from "./components/ShowAllWarehouses.js";
import ShowWarehouseDetails from "./components/ShowWarehouseDetails.js";
import warehousesData from "./data/warehouse.json";
import "./App.css";

function App() {
  const [fetchedWarehousesData, setFetchedWarehousesData] =
    useState(warehousesData);

  const changeWarehouseDetails = (newData) => {
    let newWarehouseData = fetchedWarehousesData.filter(
      (node) => node.id !== newData.id
    );
    newWarehouseData.push({
      name: newData.name,
      code: newData.code,
      id: newData.id,
      city: newData.city,
      space_available: newData.space_available,
      type: newData.type,
      cluster: newData.cluster,
      is_registered: newData.is_registered,
      is_live: newData.is_live,
    });
    setFetchedWarehousesData(newWarehouseData);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={<ShowAllWarehouses warehousesData={fetchedWarehousesData} />}
        />
        <Route
          exact
          path="/warehouse/:warehouseId"
          element={
            <ShowWarehouseDetails
              warehousesData={fetchedWarehousesData}
              changeWarehouseDetails={changeWarehouseDetails}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
