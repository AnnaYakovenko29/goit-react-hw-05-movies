import React from 'react';
import AppBar from '../AppBar/AppBar';
import { Outlet } from 'react-router-dom';
import { Container } from './Layout.styled';

function Layout() {
  return (
    <>
      <AppBar />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
}

export default Layout;
