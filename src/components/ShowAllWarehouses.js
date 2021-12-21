import React from "react";
import { Link } from "react-router-dom";
import "../styles/ShowAllWarehouses.css";

export default class ShowAllWarehouses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      warehouses: this.props.warehousesData.sort((a, b) => {
        return parseInt(a.code.split("-")[1]) - parseInt(b.code.split("-")[1]);
      }),
      filterByCity: "",
      filterByType: "",
      filterByRegistrationStatus: "",
      filterByLiveStatus: "",
      sortBy: "asc",
      cities: [
        ...new Set(
          this.props.warehousesData.map((node) => {
            return node.city;
          })
        ),
      ],
      types: [
        ...new Set(
          this.props.warehousesData.map((node) => {
            return node.type;
          })
        ),
      ],
    };
    this.changeSort = this.changeSort.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }

  changeSort() {
    if (this.state.sortBy === "asc") {
      this.setState((prevState) => ({
        ...this.state,
        sortBy: "desc",
        warehouses: prevState.warehouses.sort((a, b) => {
          return (
            parseInt(b.code.split("-")[1]) - parseInt(a.code.split("-")[1])
          );
        }),
      }));
    } else {
      this.setState((prevState) => ({
        ...this.state,
        sortBy: "asc",
        warehouses: prevState.warehouses.sort((a, b) => {
          return (
            parseInt(a.code.split("-")[1]) - parseInt(b.code.split("-")[1])
          );
        }),
      }));
    }
  }

  changeFilter(event) {
    this.setState(
      {
        ...this.state,
        [event.target.name]: event.target.value,
      },
      () => {
        console.log(this.state);
        this.setState(
          { ...this.state, warehouses: this.props.warehousesData },
          () => {
            if (this.state.filterByCity !== "") {
              this.setState((prevState) => ({
                ...this.state,
                warehouses: prevState.warehouses
                  .filter((node) => node.city === this.state.filterByCity)
                  .sort((a, b) => {
                    return (
                      parseInt(a.code.split("-")[1]) -
                      parseInt(b.code.split("-")[1])
                    );
                  }),
              }));
            }
            if (this.state.filterByType !== "") {
              this.setState((prevState) => ({
                ...this.state,
                warehouses: prevState.warehouses
                  .filter((node) => node.type === this.state.filterByType)
                  .sort((a, b) => {
                    return (
                      parseInt(a.code.split("-")[1]) -
                      parseInt(b.code.split("-")[1])
                    );
                  }),
              }));
            }
            if (this.state.filterByRegistrationStatus !== "") {
              this.setState((prevState) => ({
                ...this.state,
                warehouses: prevState.warehouses
                  .filter(
                    (node) =>
                      node.is_registered.toString() ===
                      this.state.filterByRegistrationStatus
                  )
                  .sort((a, b) => {
                    return (
                      parseInt(a.code.split("-")[1]) -
                      parseInt(b.code.split("-")[1])
                    );
                  }),
              }));
            }
            if (this.state.filterByLiveStatus !== "") {
              this.setState((prevState) => ({
                ...this.state,
                warehouses: prevState.warehouses
                  .filter(
                    (node) =>
                      node.is_live.toString() === this.state.filterByLiveStatus
                  )
                  .sort((a, b) => {
                    return (
                      parseInt(a.code.split("-")[1]) -
                      parseInt(b.code.split("-")[1])
                    );
                  }),
              }));
            }
          }
        );

        console.log(this.state);
      }
    );
  }

  render() {
    return (
      <div className="allWarehousesContainer">
        {console.log(this.state)}
        <h2 className="allWarehousesHeading">Warehouses</h2>
        <hr />
        <div className="allWarehousesFilter">
          <div>
            <span className="filterLabel">Filter by:</span>
            <select
              onChange={this.changeFilter}
              className="filterSelect"
              name="filterByCity"
              defaultValue=""
            >
              <option disabled value="">
                Select City
              </option>
              {this.state.cities &&
                this.state.cities.map((node) => {
                  return <option value={node}>{node}</option>;
                })}
            </select>
            <select
              onChange={this.changeFilter}
              className="filterSelect"
              name="filterByType"
              defaultValue=""
            >
              <option disabled value="">
                Select Type
              </option>
              {this.state.cities &&
                this.state.types.map((node) => {
                  return <option value={node}>{node}</option>;
                })}
            </select>
            <select
              onChange={this.changeFilter}
              className="filterSelect"
              name="filterByRegistrationStatus"
              defaultValue=""
            >
              <option disabled value="">
                Select Registration Status
              </option>
              <option value={true}>Registered</option>
              <option value={false}>Not Registered</option>
            </select>
            <select
              onChange={this.changeFilter}
              className="filterSelect"
              name="filterByLiveStatus"
              defaultValue=""
            >
              <option disabled value="">
                Select Live Status
              </option>
              <option value={true}>Live</option>
              <option value={false}>Not Live</option>
            </select>
            <button
              type="button"
              onClick={(event) => {
                this.setState(
                  {
                    ...this.state,
                    filterByCity: "",
                    filterByType: "",
                    filterByRegistrationStatus: "",
                    filterByLiveStatus: "",
                  },
                  () => {
                    for (
                      let i = 0;
                      i <
                      document.getElementsByClassName("filterSelect").length;
                      i++
                    ) {
                      document.getElementsByClassName("filterSelect")[
                        i
                      ].selectedIndex = 0;
                    }
                    this.changeFilter(event);
                  }
                );
              }}
            >
              Clear Filters
            </button>
          </div>
          <div>
            <span className="sortLabel">Sort by:</span>
            <select onChange={this.changeSort} className="sortSelect">
              <option selected value="asc">
                Ascending
              </option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="warehousesContainer">
          {this.state.warehouses.map((node) => {
            return (
              <Link
                style={{ textDecoration: "none", color: "#000" }}
                to={`/warehouse/${node.code}`}
                key={node.id}
              >
                <div className="warehouseContainer" key={node.id}>
                  <div className="warehouseDetailsData">
                    <div>
                      <span className="warehouseName">{node.name}</span>
                      <span className="warehouseCode">{node.code}</span>
                    </div>
                    <div>
                      Type: <span className="warehouseData">{node.type}</span>
                      <br />
                      Cluster:{" "}
                      <span className="warehouseData">{node.cluster}</span>
                      <br />
                      City: <span className="warehouseData">{node.city}</span>
                    </div>
                  </div>
                  <div className="warehouseStatusData">
                    {node.is_registered ? (
                      <div className="warehouseStatus warehouseRegistrationRegisteredStatus">
                        Registered
                      </div>
                    ) : (
                      <div className="warehouseStatus warehouseRegistrationNotRegisteredStatus">
                        Not Registered
                      </div>
                    )}
                    {node.is_live ? (
                      <div className="warehouseStatus warehouseLiveLiveStatus">
                        Live
                      </div>
                    ) : (
                      <div className="warehouseStatus warehouseLiveNotLiveStatus">
                        Not Live
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}
