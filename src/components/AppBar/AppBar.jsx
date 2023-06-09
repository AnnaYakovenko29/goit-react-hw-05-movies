
import { NavItem, NavList, Container, Header } from './AppBar.styled';

const navItems = [
  { href: '/', title: 'Home' },
  { href: '/movies', title: 'Movies' },
];


function AppBar() {
  return (
    <Header>
      <Container>
          <NavList>
            {navItems.map(({ href, title }) => (
              <NavItem to={href} key={href}>
                {title}
              </NavItem>
            ))}
          </NavList>
      </Container>
    </Header>
  );
}

export default AppBar;
