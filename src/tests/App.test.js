import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente <App.js />', () => {
  test('Testando se o topo contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const navHome = screen.getByRole('link', {
      name: /home/i,
    });
    const navAbout = screen.getByRole('link', {
      name: /about/i,
    });
    const navFavPoke = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(navHome).toBeInTheDocument();
    expect(navAbout).toBeInTheDocument();
    expect(navFavPoke).toBeInTheDocument();
  });

  test('Testando se a aplicação é redirecionada para o home ao clicar', () => {
    const { history } = renderWithRouter(<App />);
    const navHome = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(navHome);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    const headingHome = screen.getByRole('heading',
      { name: /encountered pokémons/i, level: 2 });
    expect(headingHome).toBeInTheDocument();
  });

  test('Testando se a aplicação é redirecionada para o about ao clicar', () => {
    const { history } = renderWithRouter(<App />);
    const navAbout = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(navAbout);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
    const headingAbout = screen.getByRole('heading',
      { name: /about pokédex/i, level: 2 });
    expect(headingAbout).toBeInTheDocument();
  });

  test('Testando se a aplicação é redirecionada para o favorites ao clicar', () => {
    const { history } = renderWithRouter(<App />);
    const navFavPoke = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(navFavPoke);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
    const headingFavPoke = screen.getByRole('heading',
      { name: /favorite pokémons/i, level: 2 });
    expect(headingFavPoke).toBeInTheDocument();
  });

  test('Testando se a aplicação redireciona para a página Not Found se errar url', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-desconhecida');
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pagina-desconhecida');
    const headingNotFound = screen.findByRole('heading',
      { name: /page requested not foundcrying emoji/i, level: 2 });
    expect(headingNotFound).toBeDefined();
  });
});
