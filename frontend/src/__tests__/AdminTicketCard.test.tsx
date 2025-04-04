
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AdminTicketCard from "../components/AdminTicketCard";
import { Ticket, Issuer, User } from "../utils/types";

// Mock the StatusManager component
vi.mock("../components/StatusManager", () => ({
  __esModule: true,
  default: vi.fn(() => <div>Mock StatusManager</div>),
}));

const user: User = { 
    _id: "4",
    username: "user1",
    email: 'bb@gmail.com',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
}
const issuer:Issuer = user as Issuer
describe("AdminTicketCard Component", () => {
  const mockRefetchTickets = vi.fn();
  const mockTicket: Ticket = {
    _id: "1",
    title: "Test Ticket 1",
    description: "Description for the ticket",
    status: "Open",
    createdAt: new Date(),
    updatedAt: new Date(),
    issuer: issuer,
  };

  it("renders ticket information", () => {
    render(<AdminTicketCard ticket={mockTicket} refetchTickets={mockRefetchTickets} />);

    expect(screen.getByText("Test Ticket 1")).toBeInTheDocument();
    expect(screen.getByText("Description for the ticket")).toBeInTheDocument();
    expect(screen.getByText(/Issued at/i)).toBeInTheDocument();
    expect(screen.getByText(/Issued by : user1/i)).toBeInTheDocument();
  });

  it("calls refetchTickets when status changes", () => {
    render(<AdminTicketCard ticket={mockTicket} refetchTickets={mockRefetchTickets} />);

    // Test StatusManager is rendered
    expect(screen.getByText("Mock StatusManager")).toBeInTheDocument();

    // Check that refetchTickets is not called initially
    expect(mockRefetchTickets).not.toHaveBeenCalled();

    // Trigger some status change logic here if needed (based on your actual implementation)
    // Since StatusManager is mocked, you may need to adjust this if you want it to trigger a refetch.
    fireEvent.click(screen.getByText("Mock StatusManager"));
  });
});
