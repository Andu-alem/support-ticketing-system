import { render, screen } from "@testing-library/react"
import { test, expect, describe } from "vitest"
import Button from "../components/Button"

describe('Testing Button component', () => {
    test('renders correctly with title', () => {
        render(<Button title="button"/>)
        expect(screen.getByText('button')).toBeInTheDocument()
    })

    test('animates button', () => {
        render(<Button title="button" animate={ true } />)
        expect(screen.getByText('button')).toHaveClass('animate-pulse')
    })
})