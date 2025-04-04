# Support Ticketing System

A modern support ticket management platform designed to streamline customer service operations by enabling users to create tickets and administrators to manage them efficiently.

## Features

### User Features

-   **Authentication:** Secure login system using JWT for token-based authentication.
-   **Ticket Creation:** Users can create support tickets with detailed descriptions.
-   **Ticket Tracking:** View the status of submitted tickets (e.g., "Open," "In Progress," "Resolved").

### Admin Features

-   **Ticket Management:** Admins can update ticket statuses and oversee the entire ticket lifecycle.
-   **Dashboard:** A comprehensive view of all tickets for efficient workflow management.

### Performance Features

-   Responsive design for seamless usability on desktop and mobile devices.
-   Lightweight and scalable backend architecture.

## Tech Stack

### Frontend

-   **React:** Dynamic and interactive user interface.
-   **React Router:** Smooth navigation between pages.
-   **TailwindCSS:** Responsive, modern, utility-first styling framework.
-   **React Context API:** Efficient state management.

### Backend

-   **Node.js:** Scalable backend runtime environment.
-   **Express.js:** RESTful APIs for ticket management and authentication.
-   **MongoDB:** Flexible NoSQL database for storing users and tickets.
-   **Mongoose:** ORM for schema validation and interaction with MongoDB.
-   **JWT:** Token-based authentication for secure access.

## Installation

Follow these steps to set up the project locally:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/support-ticketing-system.git](https://github.com/your-username/support-ticketing-system.git)
    cd support-ticketing-system
    ```

2.  **Install dependencies:**

    -   For the frontend:

        ```bash
        cd frontend
        npm install
        ```

    -   For the backend:

        ```bash
        cd backend
        npm install
        ```

3.  **Set up environment variables:**

    -   Create a `.env` file in the `backend` directory.
    -   Add the following variables:

        ```
        MONGO_URI=<Your MongoDB Connection String>
        JWT_SECRET=<Your JWT Secret Key>
        PORT=5000
        ```

4.  **Run the application:**

    -   Start the backend server:

        ```bash
        cd backend
        npm run start
        ```

    -   Start the frontend development server:

        ```bash
        cd ../frontend
        npm run start
        ```

5.  **Access the application:**

    -   Frontend: `http://localhost:3000`
    -   Backend API: `http://localhost:5000`

![Support Ticket](./screenshoot/support2.png)

## Contributing

Contributions are welcome! If you'd like to contribute:

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature-name`).
3.  Submit a pull request.

## License

This project is licensed under the MIT License ([https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)).
