import { render, screen, fireEvent } from '@testing-library/react'
import { vi, it, describe, expect } from 'vitest'
import PasswordInput from '../components/PasswordInput'


describe('PasswordInput', () => {
  it('should render input with label', () => {
    render(<PasswordInput label="Password" type="password" setPassword={vi.fn()} />)
    
    // Check if label is rendered
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    
    // Check if input is rendered and has the correct type
    const input = screen.getByLabelText(/password/i) as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'password')
  })

  it('should update password value on user input', () => {
    const mockSetPassword = vi.fn()
    
    render(<PasswordInput label="Password" type="password" setPassword={mockSetPassword} />)
    
    const input = screen.getByLabelText(/password/i) as HTMLInputElement
    
    // Simulate typing in the password field
    fireEvent.change(input, { target: { value: 'newpassword' } })
    
    // Check if the setPassword function was called with the correct value
    expect(mockSetPassword).toHaveBeenCalledWith('newpassword')
  })
})

