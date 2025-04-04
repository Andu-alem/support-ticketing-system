import { render, fireEvent, screen } from '@testing-library/react'
import { vi, describe, it, beforeEach, expect } from 'vitest'
import AdminFloatingButton from '../components/AdminFloatingButton'

describe('AdminFloatingButton Component', () => {
  const mockToggleFixedFilter = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the floating button', () => {
    render(<AdminFloatingButton toggleFixedFilter={mockToggleFixedFilter} />)

    // Check if the button with PlusIcon is rendered
    const icon = screen.getByRole('action-button')
    expect(icon).toBeInTheDocument()
  })

  it('should call toggleFixedFilter when the button is clicked', () => {
    render(<AdminFloatingButton data-testid="button" toggleFixedFilter={mockToggleFixedFilter} />)

    // Find the button and simulate a click event
    const button = screen.getByTestId('button')
    fireEvent.click(button)

    // Assert that the mock function was called
    expect(mockToggleFixedFilter).toHaveBeenCalledTimes(1)
  })
})
