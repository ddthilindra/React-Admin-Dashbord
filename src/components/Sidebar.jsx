import React, { useState } from "react";
import styled from "styled-components";
import { MdSpaceDashboard } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import { GiTwirlCenter } from "react-icons/gi";
import { BsFillChatTextFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { AiFillCalendar } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";

export default function Sidebar() {
  const history = useHistory();
  const [currentLink, setCurrentLink] = useState(1);
  const [navbarState, setNavbarState] = useState(false);
  const html = document.querySelector("html");
  html.addEventListener("click", () => setNavbarState(false));
  function handleLogout() {
    localStorage.clear();
    window.location.href = "/";
  }
  return (
    <>
      <Section>
        <div className="top">
          <div className="brand">
            <h1>EMPsys</h1>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
              />
            )}
          </div>
          <div className="links">
            <ul>
              <li
                className={currentLink === 1 ? "active" : "none"}
                onClick={() => setCurrentLink(1)}
              >
                <Link to="/home">
                  <MdSpaceDashboard />
                  <span> Dashboard</span>
                </Link>
              </li>
              <li
                className={currentLink === 2 ? "active" : "none"}
                onClick={() => setCurrentLink(2)}
              >
                <Link to="/employee">
                  <FaAddressCard />
                  <span> Employee</span>
                </Link>
              </li>
              <li
                className={currentLink === 3 ? "active" : "none"}
                onClick={() => setCurrentLink(3)}
              >
                <Link to="leave">
                  <AiFillCalendar />
                  <span> Calender</span>
                </Link>
              </li>
              <li
                className={currentLink === 4 ? "active" : "none"}
                onClick={() => setCurrentLink(4)}
              >
                {/* <Link to="#">
                  <RiDashboard2Fill />
                  <span> Riders</span>
                </Link> */}
              </li>
              <li
                className={currentLink === 5 ? "active" : "none"}
                onClick={() => setCurrentLink(5)}
              >
                {/* <Link to="#">
                  <BsFillChatTextFill />
                  <span> FAQs</span>
                </Link> */}
              </li>
              <li
                className={currentLink === 6 ? "active" : "none"}
                onClick={() => setCurrentLink(6)}
              >
                {/* <Link to="#">
                  <IoSettings />
                  <span> Settings</span>
                </Link> */}
              </li>
            </ul>
          </div>
        </div>
        <div className="logout">
          <Link onClick={handleLogout}>
            <FiLogOut />
            <span className="logout">Logout</span>
          </Link>
        </div>
      </Section>
      <ResponsiveNav state={navbarState} className={navbarState ? "show" : ""}>
        <div className="responsive__links">
          <ul>
            <li
              className={currentLink === 1 ? "active" : "none"}
              onClick={() => setCurrentLink(1)}
            >
              <Link to="/">
                <MdSpaceDashboard />
                <span> Dashboard</span>
              </Link>
            </li>
            <li
              className={currentLink === 2 ? "active" : "none"}
              onClick={() => setCurrentLink(2)}
            >
              <Link to="#">
                <RiDashboard2Fill />
                <span> Riders</span>
              </Link>
            </li>
            <li
              className={currentLink === 3 ? "active" : "none"}
              onClick={() => setCurrentLink(3)}
            >
              <Link to="/employee">
                <FaAddressCard />
                <span> Employee</span>
              </Link>
            </li>
            <li
              className={currentLink === 4 ? "active" : "none"}
              onClick={() => setCurrentLink(4)}
            >
              <Link to="#">
                <GiTwirlCenter />
                <span> Learning Center</span>
              </Link>
            </li>
            <li
              className={currentLink === 5 ? "active" : "none"}
              onClick={() => setCurrentLink(5)}
            >
              <Link to="#">
                <BsFillChatTextFill />
                <span> FAQs</span>
              </Link>
            </li>
            <li
              className={currentLink === 6 ? "active" : "none"}
              onClick={() => setCurrentLink(6)}
            >
              <Link to="#">
                <IoSettings />
                <span> Settings</span>
              </Link>
            </li>
          </ul>
        </div>
      </ResponsiveNav>
    </>
  );
}
const Section = styled.section`
  position: fixed;
  left: 0;
  background-color: #ffff;
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;

    .toggle {
      display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      svg {
        color: #2065d1; //logo
        font-size: 2rem;
      }
      h1 {
        font-size: 1.75rem;
        color: #2065d1;
        font-family: "Montserrat", sans-serif;
      }
    }
    .links {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          &:hover {
            background-color: #f0f2f4;
            a {
              color: #2065d1;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: #637381;
          }
        }
        .active {
          background-color: #f0f2f4;
          a {
            color: #2065d1;
          }
        }
      }
    }
  }

  .logout {
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    background-color: #9dbae6;
    &:hover {
      background-color: #da0037;
    }
    a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: #2065d1;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  position: fixed;
  right: -10vw;
  top: 0;
  z-index: 10;
  background-color: #f3f2ef;
  height: 100vh;
  width: ${({ state }) => (state ? "60%" : "0%")};
  transition: 0.4s ease-in-out;
  display: flex;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  .responsive__links {
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 3rem;
      li {
        padding: 0.6rem 6rem 0.6rem 0.6rem;
        border-radius: 0.6rem;
        &:hover {
          background-color: #2065d1;
          a {
            color: white;
          }
        }
        a {
          text-decoration: none;
          display: flex;
          gap: 1rem;
          color: #2065d1;
        }
      }
      .active {
        background-color: #2065d1;
        a {
          color: white;
        }
      }
    }
  }
`;
