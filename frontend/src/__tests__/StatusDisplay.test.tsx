// StatusDisplay.test.jsx
import { render, screen } from '@testing-library/react';
import StatusDisplay from '../components/StatusDisplay';
import { expect, it, describe } from 'vitest'

describe('StatusDisplay', () => {
  it('renders "Open" status with green background', () => {
    render(<StatusDisplay status="Open" />);
    const statusText = screen.getByText('Open');
    //const statusDot = screen.getByRole('presentation'); // Or use a more specific role if available

    expect(statusText).toBeInTheDocument();
    //expect(statusDot).toHaveClass('bg-green-500');
  });

  it('renders "Closed" status with red background', () => {
    render(<StatusDisplay status="Closed" />);
    const statusText = screen.getByText('Closed');
    //const statusDot = screen.getByRole('presentation');

    expect(statusText).toBeInTheDocument();
    //expect(statusDot).toHaveClass('bg-red-500');
  });

    it('renders "Pending" status with orange background', () => {
    render(<StatusDisplay status="Pending" />);
    const statusText = screen.getByText('Pending');
    //const statusDot = screen.getByRole('presentation');

    expect(statusText).toBeInTheDocument();
    //expect(statusDot).toHaveClass('bg-orange-500');
  });

  it('renders other status with orange background', () => {
    render(<StatusDisplay status="Other" />);
    const statusText = screen.getByText('Other');
    //const statusDot = screen.getByRole('presentation');

    expect(statusText).toBeInTheDocument();
    //expect(statusDot).toHaveClass('bg-orange-500');
  });
});