import React from "react";
import styled from "styled-components";
import search from "../../../assets/Search.png";
import { BiSearch } from "react-icons/bi";
const Root = styled.div`
  background-color: #fff;
  border-radius: 4px;
  padding: 0.4rem;
  .dropdown-menu {
    padding: 1rem;
    margin-top: 1rem;
    margin-left: -14.5rem;
  }
  .searchInput {
    background-color: #f0f2ff;
    border: 0px solid #f0f2ff;
    width: 14rem;
    height: 2.5rem;
    color: #a7b2c3;
    padding-right: 3rem;
  }
  .input-icon-div {
    display: flex;
  }
  .searchIcon {
    position: absolute;
    left: 13rem;
    top: 1.7rem;
    color: #2745f0;
    font-size: 1.3rem;
  }
`;
const Search = () => {
  return (
    <Root>
      <div class="dropdown">
        <img
          className="dropdown-toggle"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          src={search}
          style={{
            height: "1rem",
          }}
        ></img>
        <div
          class="dropdown-menu"
          aria-labelledby="dropdownMenuButton"
          //   style={{ right: "auto", left: "auto" }}
        >
          <div className="input-icon-div">
            <input
              type="text"
              class="form-control searchInput"
              id="exampleFormControlInput1"
              placeholder="Search here ....."
            />
            <BiSearch className="searchIcon" />
          </div>
        </div>
      </div>
    </Root>
  );
};

export default Search;
