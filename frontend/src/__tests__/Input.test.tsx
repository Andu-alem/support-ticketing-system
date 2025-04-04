import { render, screen, fireEvent } from "@testing-library/react"
import { vi, test, describe, expect } from "vitest"

import Input from "../components/Input"

const mockChanngeHandler = vi.fn()

describe("Testing Input component", () => {

    test("should render with proper label", () => {
        render(<Input data-testid="input" type="text" label="username" setValue={ mockChanngeHandler } />)
        const label = screen.getByLabelText(/username/i) as HTMLElement
        expect(label).toBeInTheDocument()
        // check if the input renders with provided type
        const input = screen.getByLabelText(/username/i) as HTMLInputElement
        expect(input).toHaveAttribute('type', 'text')
    })

    test("should update input value on user input", () => {
        render(<Input type="text" label="username" setValue={ mockChanngeHandler } />)
        const input = screen.getByLabelText(/username/i)
        fireEvent.change(input, { target: {  value: 'john doe' } })
        expect(mockChanngeHandler).toHaveBeenCalledWith('john doe')
    })
})