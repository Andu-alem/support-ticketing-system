import { render, screen, fireEvent } from '@testing-library/react'
import { vi, it, describe, expect } from 'vitest'
import FilterOptions from '../components/FilterOptions'

describe('FilterOptions', () => {
  const setFilterValue = vi.fn()

  it('should render the filter options correctly', () => {
    render(<FilterOptions setFilterValue={ setFilterValue } />)

    // Check if all filter options are rendered
    expect(screen.getByText(/All/i)).toBeInTheDocument()
    expect(screen.getByText(/Open/i)).toBeInTheDocument()
    expect(screen.getByText(/InProgress/i)).toBeInTheDocument()
    expect(screen.getByText(/Closed/i)).toBeInTheDocument()
  })

  it('should call setFilterValue with the correct argument when a filter is clicked', () => {
    render(<FilterOptions setFilterValue={ setFilterValue } />)

    // Click the 'Open' filter option
    fireEvent.click(screen.getByText(/Open/i))
    expect(setFilterValue).toHaveBeenCalledWith('Open')

    // Click the 'InProgress' filter option
    fireEvent.click(screen.getByText(/InProgress/i))
    expect(setFilterValue).toHaveBeenCalledWith('InProgress')

    // Click the 'Closed' filter option
    fireEvent.click(screen.getByText(/Closed/i))
    expect(setFilterValue).toHaveBeenCalledWith('Closed')

    // Click the 'All' filter option
    fireEvent.click(screen.getByText(/All/i))
    expect(setFilterValue).toHaveBeenCalledWith('')
  })

  it('should be hidden on small screens and visible on larger screens', () => {
    const { container } = render(<FilterOptions setFilterValue={ setFilterValue } />)

    // Check if the component is hidden on small screens (using sm:block class)
    expect(container.firstChild).toHaveClass('hidden')

    // Change the screen size to a larger one (e.g., sm breakpoint)
    window.innerWidth = 640
    fireEvent.resize(window)

    // Now it should be visible
    expect(container.firstChild).toHaveClass('sm:block')
  })
})
