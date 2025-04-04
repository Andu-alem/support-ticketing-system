import { render, screen } from "@testing-library/react"
import { test, expect } from "vitest"
import LoadingModal from "../components/LodingModal"

test("should render modal with a message", () => {
    render(<LoadingModal showModal={ true } message="loading" />)
    
    // check if the modal is renderd
    expect(screen.getByText(/loading/i)).not.toHaveClass('hidden')

    // check if it renders message
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
})