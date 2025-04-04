import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest';
import TogglePassword from '../components/TooglePassword'

describe('TogglePassword Component', () => {

  // Test 1: Ensure the checkbox and label render correctly
  it('should render the checkbox and label correctly', () => {
    const mockTogglePassword = vi.fn();
    
    render(<TogglePassword togglePassword={mockTogglePassword} />);
    
    // Check if the checkbox and label are rendered
    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByLabelText('Show Password');
    
    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  // Test 2: Ensure that togglePassword is called when the checkbox is clicked
  it('should call togglePassword when the checkbox is toggled', () => {
    const mockTogglePassword = vi.fn();
    
    render(<TogglePassword togglePassword={mockTogglePassword} />);
    
    // Get the checkbox element
    const checkbox = screen.getByRole('checkbox');
    
    // Simulate the checkbox being checked
    fireEvent.click(checkbox);
    
    // Check if togglePassword is called
    expect(mockTogglePassword).toHaveBeenCalled();
    
    // Simulate the checkbox being unchecked
    fireEvent.click(checkbox);
    
    // Check if togglePassword is called again
    expect(mockTogglePassword).toHaveBeenCalledTimes(2);
  });

});