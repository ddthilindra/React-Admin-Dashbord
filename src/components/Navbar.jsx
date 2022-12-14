import React from "react";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
export default function Navbar(props) {
  return (
    <Nav>
      <div className="title">
        {/* <h4>Hi Kishan,</h4> */}
        <p>/{props.text}</p>
        <h1>
          <span>{props.text}</span>
        </h1>
      </div>
      {/* <div className="search">
        <BiSearch />
        <input type="text" placeholder="Search" />
      </div> */}
    </Nav>
  );
}
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  color: black;
  padding: 1rem 1rem 2rem 1rem;
  .title {
    h1 {
      span {
        margin-left: 0.5rem;
        color: black;
        font-family: "Montserrat", sans-serif;
        letter-spacing: 0.2rem;
      }
    }
    p {
      margin: 0 0 0.6rem 0.5rem;
      font-size: 0.7rem;
    }
  }
  .search {
    background-color: #212121;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 8rem 1rem 1rem;
    border-radius: 1rem;
    svg {
      color: #ffc107;
    }
    input {
      background-color: transparent;
      border: none;
      color: #ffc107;
      font-family: "Montserrat", sans-serif;
      letter-spacing: 0.3rem;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #ffc107;
        font-family: "Montserrat", sans-serif;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    flex-direction: column;
    .title {
      h1 {
        span {
          display: block;

          margin: 1rem 0;
          /* letter-spacing: 0; */
        }
      }
    }
  }
`;
