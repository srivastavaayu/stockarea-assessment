import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../assets/BackButton.svg";
import "../styles/ShowWarehouseDetails.css";

export default function ShowAllWarehouses(props) {
  let params = useParams();
  const navigate = useNavigate();
  const [warehousesData, setWarehousesData] = useState(props.warehousesData);

  const [warehouseData, setWarehouseData] = useState(
    warehousesData.filter((node) => node.code === params.warehouseId)
  );
  const [editWarehouseDetails, setEditWarehouseDetails] = useState(false);
  const [warehouseName, setWarehouseName] = useState(warehouseData[0].name);
  const [warehouseCode, setWarehouseCode] = useState(warehouseData[0].code);
  const [warehouseCity, setWarehouseCity] = useState(warehouseData[0].city);
  const [warehouseType, setWarehouseType] = useState(warehouseData[0].type);
  const [warehouseCluster, setWarehouseCluster] = useState(
    warehouseData[0].cluster
  );
  const [warehouseSpaceAvailable, setWarehouseSpaceAvailable] = useState(
    warehouseData[0].space_available
  );
  const [warehouseRegisteredStatus, setWarehouseRegisteredStatus] = useState(
    warehouseData[0].is_registered
  );
  const [warehouseLiveStatus, setWarehouseLiveStatus] = useState(
    warehouseData[0].is_live
  );

  const changeEditWarehouseDetails = () => {
    if (editWarehouseDetails === false) {
      setEditWarehouseDetails(!editWarehouseDetails);
    } else {
      setEditWarehouseDetails(!editWarehouseDetails);
      props.changeWarehouseDetails({
        name: warehouseName,
        code: warehouseCode,
        id: warehouseData[0].id,
        city: warehouseCity,
        space_available: warehouseSpaceAvailable,
        type: warehouseType,
        cluster: warehouseCluster,
        is_registered: warehouseRegisteredStatus,
        is_live: warehouseLiveStatus,
      });
    }
  };

  console.log(warehouseData);
  return (
    <div className="showWarehouseDetailsContainer">
      <div className="showWarehouseDetailsHeader">
        <div className="showWarehouseDetailsHeaderLeft">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={BackButton} />
          </button>
          <h2 className="showWarehouseDetailsHeading">
            Warehouse {params.warehouseId}
          </h2>
        </div>
        <button
          type="button"
          onClick={() => {
            changeEditWarehouseDetails();
          }}
        >
          {editWarehouseDetails
            ? "Save Warehouse Details"
            : "Edit Warehouse Details"}
        </button>
      </div>
      <hr />
      <div className="warehouseDetailsContainer">
        <div className="warehouseDetailsDataContainer">
          <div>Warehouse Name:</div>
          {editWarehouseDetails ? (
            <input
              type="text"
              value={warehouseName}
              onChange={(event) => setWarehouseName(event.target.value)}
            />
          ) : (
            <span className="warehouseDetailsData">{warehouseName}</span>
          )}
        </div>
        <div className="warehouseDetailsDataContainer">
          <div>Warehouse Code:</div>
          {editWarehouseDetails ? (
            <input
              type="text"
              value={warehouseCode}
              onChange={(event) => setWarehouseCode(event.target.value)}
            />
          ) : (
            <span className="warehouseDetailsData">{warehouseCode}</span>
          )}
        </div>
        <div className="warehouseDetailsDataContainer">
          <div>Warehouse City:</div>
          {editWarehouseDetails ? (
            <input
              type="text"
              value={warehouseCity}
              onChange={(event) => setWarehouseCity(event.target.value)}
            />
          ) : (
            <span className="warehouseDetailsData">{warehouseCity}</span>
          )}
        </div>
        <div className="warehouseDetailsDataContainer">
          <div>Warehouse Cluster:</div>
          {editWarehouseDetails ? (
            <input
              type="text"
              value={warehouseCluster}
              onChange={(event) => setWarehouseCluster(event.target.value)}
            />
          ) : (
            <span className="warehouseDetailsData">{warehouseCluster}</span>
          )}
        </div>
        <div className="warehouseDetailsDataContainer">
          <div>Warehouse Type:</div>
          {editWarehouseDetails ? (
            <input
              type="text"
              value={warehouseType}
              onChange={(event) => setWarehouseType(event.target.value)}
            />
          ) : (
            <span className="warehouseDetailsData">{warehouseType}</span>
          )}
        </div>
        <div className="warehouseDetailsDataContainer">
          <div>Space Available:</div>
          {editWarehouseDetails ? (
            <input
              type="text"
              value={warehouseSpaceAvailable}
              onChange={(event) =>
                setWarehouseSpaceAvailable(event.target.value)
              }
            />
          ) : (
            <span className="warehouseDetailsData">
              {warehouseSpaceAvailable}
            </span>
          )}
        </div>
        <div className="warehouseDetailsDataContainer warehouseDetailsDataStatusContainer">
          <div>Registration Status:</div>
          {editWarehouseDetails ? (
            <>
              <button
                type="button"
                onClick={() => setWarehouseRegisteredStatus(true)}
                className="warehouseDetailsDataStatusActiveContainer"
              >
                Registered
              </button>
              <button
                type="button"
                onClick={() => setWarehouseRegisteredStatus(false)}
                className="warehouseDetailsDataStatusNotActiveContainer"
              >
                Not Registered
              </button>
            </>
          ) : (
            <span className="warehouseDetailsData">
              {warehouseRegisteredStatus ? "Registered" : "Not Registered"}
            </span>
          )}
        </div>
        <div className="warehouseDetailsDataContainer warehouseDetailsDataStatusContainer">
          <div>Live Status:</div>
          {editWarehouseDetails ? (
            <>
              <button
                type="button"
                onClick={() => setWarehouseLiveStatus(true)}
                className="warehouseDetailsDataStatusActiveContainer"
              >
                Live
              </button>
              <button
                type="button"
                onClick={() => setWarehouseLiveStatus(false)}
                className="warehouseDetailsDataStatusNotActiveContainer"
              >
                Not Live
              </button>
            </>
          ) : (
            <span className="warehouseDetailsData">
              {warehouseLiveStatus ? "Live" : "Not Live"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
