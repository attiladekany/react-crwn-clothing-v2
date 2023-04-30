import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AvatarContainer = styled.div`
  display: inline-block;
`

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;
export const LogoContainer = styled(Link)`
  position: relative;
  height: 100%;
  width: 70px;
  padding: 25px;
  .logo {
    position: absolute;
    left: 5px;
    top: 13px;
  }
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  padding: 10px 15px;
  text-align: center;
  min-width: 90px;
  cursor: pointer;
`;

export default NavigationContainer;
