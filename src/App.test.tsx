import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Indsend text', () => {
  render(<App />);
  const linkElement: HTMLElement = screen.getByText(/Indsend/i);
  expect(linkElement).toBeInTheDocument();
});
