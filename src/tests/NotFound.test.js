import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente <NotFound.js />', () => {
  test('Teste se a página contém um h2 com o text Page request not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-desconhecida/');
    const notFound = screen.getByRole('heading',
      { name: /page requested not found/i, level: 2 });
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-desconhecida/');
    const notFoundIMG = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(notFoundIMG).toBeInTheDocument();
    expect(notFoundIMG).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
