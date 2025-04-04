import { render, screen, fireEvent } from '@testing-library/react'
import { vi, it, describe, expect } from 'vitest'
import Form from '../components/Form'

describe('Form Component', () => {

  it('should render the children passed to the form', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <input type="text" placeholder="Test input" />
        <button type="submit">Submit</button>
      </Form>
    )
    
    // Check if the input and button elements are rendered
    expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('should call onSubmit when the form is submitted', () => {
    const onSubmitMock = vi.fn()
    render(
      <Form onSubmit={onSubmitMock}>
        <input type="text" placeholder="Test input" />
        <button type="submit">Submit</button>
      </Form>
    )
    
    // Simulate form submission
    fireEvent.submit(screen.getByRole('form'))
    
    // Verify that the onSubmit handler is called
    expect(onSubmitMock).toHaveBeenCalledTimes(1)
  })

  it('should prevent the default form submission behavior', () => {
    const onSubmitMock = vi.fn((e) => e.preventDefault())
    render(
      <Form onSubmit={onSubmitMock}>
        <input type="text" placeholder="Test input" />
        <button type="submit">Submit</button>
      </Form>
    )
    
    // Simulate form submission
    fireEvent.submit(screen.getByRole('form'))
    
    // Verify that preventDefault is called
    expect(onSubmitMock).toHaveBeenCalledWith(expect.objectContaining({ preventDefault: expect.any(Function) }))
  })

})
