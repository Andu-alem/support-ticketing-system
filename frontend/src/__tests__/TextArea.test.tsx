import { render, screen, fireEvent } from '@testing-library/react'
import { vi, it, describe, expect, beforeEach } from 'vitest'
import TextArea from '../components/TextArea'

describe('TextArea Component', () => {
  const mockSetValue = vi.fn()
  
  beforeEach(() => {
    mockSetValue.mockClear()
  })

  // Test 1: Ensure the label and textarea render correctly
  it('should render label and textarea', () => {
    render(<TextArea label="Description" setValue={mockSetValue} />)

    // Check if the label is rendered
    expect(screen.getByText('Description')).toBeInTheDocument()
    
    // Check if the textarea is rendered
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute('id', 'Description')
    expect(textarea).toHaveAttribute('name', 'description')
  })

  // Test 2: Ensure the textarea calls setValue on change
  it('should call setValue when the textarea value changes', () => {
    render(<TextArea label="Description" setValue={mockSetValue} />)

    const textarea = screen.getByRole('textbox')
    
    // Simulate a change in the textarea
    fireEvent.change(textarea, { target: { value: 'New description' } })

    // Ensure setValue was called with the new value
    expect(mockSetValue).toHaveBeenCalledWith('New description')
  })

})
