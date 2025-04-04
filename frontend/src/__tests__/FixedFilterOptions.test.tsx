import { render, screen, fireEvent } from '@testing-library/react'
import { vi, it, describe, expect } from 'vitest'
import FixedFilterOptions from '../components/FixedFilterOptions'

describe('FixedFilterOptions Component', () => {
  
  it('should render filter options correctly', () => {
    render(<FixedFilterOptions setFilterValue={vi.fn()} />)
    
    // Check if the filter options are rendered correctly
    expect(screen.getByText(/Filter by status/i)).toBeInTheDocument()
    expect(screen.getByText(/All/i)).toBeInTheDocument()
    expect(screen.getByText(/Open/i)).toBeInTheDocument()
    expect(screen.getByText(/InProgress/i)).toBeInTheDocument()
    expect(screen.getByText(/Closed/i)).toBeInTheDocument()
  })

  it('should call setFilterValue with the correct argument when an option is clicked', () => {
    const setFilterValueMock = vi.fn()
    render(<FixedFilterOptions setFilterValue={setFilterValueMock} />)
    
    // Click on "Open" option
    fireEvent.click(screen.getByText(/Open/i))
    expect(setFilterValueMock).toHaveBeenCalledWith('Open')
    
    // Click on "InProgress" option
    fireEvent.click(screen.getByText(/InProgress/i))
    expect(setFilterValueMock).toHaveBeenCalledWith('InProgress')
    
    // Click on "Closed" option
    fireEvent.click(screen.getByText(/Closed/i))
    expect(setFilterValueMock).toHaveBeenCalledWith('Closed')
    
    // Click on "All" option
    fireEvent.click(screen.getByText(/All/i))
    expect(setFilterValueMock).toHaveBeenCalledWith('')
  })
})