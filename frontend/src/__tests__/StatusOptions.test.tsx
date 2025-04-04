import { render, screen, fireEvent } from '@testing-library/react'
import { vi, it, describe, expect, beforeEach } from 'vitest'
import StatusOptions from '../components/StatusOptions'

describe('StatusOptions Component', () => {
  const mockUpdateStatus = vi.fn()

  beforeEach(() => {
    mockUpdateStatus.mockClear()
  })

  // Test 1: Ensure the component renders correctly
  it('should render the status options correctly', () => {
    render(<StatusOptions updateStatus={mockUpdateStatus} />)

    // Check if the Update Status header is rendered
    expect(screen.getByText('Update Status')).toBeInTheDocument()

    // Check if the status options (Open, InProgress, Closed) are rendered
    expect(screen.getByText('Open')).toBeInTheDocument()
    expect(screen.getByText('InProgress')).toBeInTheDocument()
    expect(screen.getByText('Closed')).toBeInTheDocument()
  })

  // Test 2: Ensure that clicking a status option calls updateStatus with the correct argument
  it('should call updateStatus with the correct argument when a status is clicked', () => {
    render(<StatusOptions updateStatus={mockUpdateStatus} />)

    // Click on "Open" option
    fireEvent.click(screen.getByText('Open'))
    expect(mockUpdateStatus).toHaveBeenCalledWith('Open')

    // Click on "InProgress" option
    fireEvent.click(screen.getByText('InProgress'))
    expect(mockUpdateStatus).toHaveBeenCalledWith('InProgress')

    // Click on "Closed" option
    fireEvent.click(screen.getByText('Closed'))
    expect(mockUpdateStatus).toHaveBeenCalledWith('Closed')
  })
})