import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Header = styled.header`
  background-color: #e6e6e6;
  box-shadow: -2px -2px 5px #ffffff, 3px 3px 5px rgba(0, 0, 0, 0.1);
`;

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 15px;
  max-width: 1200px;
`;

export const NavList = styled.ul`
  display: flex;
  gap: 20px;
`;

export const NavItem = styled(NavLink)`
  padding: 15px 10px;
  text-decoration: none;
  font-weight: 500;
  font-size: 22px;

  border-radius: 4px;

  transition: all 200ms ease-in-out;

  color: black;
  &.active {
    color: red;
  }
  :hover,
  :focus-visible {
    color: red;
    text-decoration: underline;
  }
`;
