# SIT313 P5 – DEV@Deakin Newsletter Integration

## Project Overview

This project extends the DEV@Deakin web application by integrating a newsletter subscription feature with a Node.js and Express backend. Users can enter their email address through the website and receive a welcome email using the SendGrid email service.

The project reuses the existing React frontend and the Express backend developed for an earlier task.

## Features

- Newsletter subscription form integrated into the website footer.
- React state management using the `useState` hook.
- Client-side email format validation.
- HTTP POST requests from the frontend to the backend using `fetch()`.
- Express API endpoint at `/subscribe`.
- SendGrid integration for sending welcome emails.
- Server-side validation of email input.
- Error handling using `try-catch`.
- HTTP response handling and user feedback.
- Separate frontend and backend folders.

## Technologies Used

- React
- JavaScript
- Node.js
- Express.js
- SendGrid Mail API
- Vite
- HTML and CSS
- Git and GitHub

## Project Structure

```text
SIT313-P5/
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   └── Header.jsx
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

*Note: The structure above is a guide. Adjust it to match the actual files in the repository.*

## Setup Instructions

### Prerequisites

Install Node.js and npm before running the project.

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd "SIT313 P5"
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the actual repository URL.

### 2. Configure the backend

```bash
cd Backend
npm install
```

Create a local `.env` file in the Backend folder and configure the SendGrid API key:

```env
SENDGRID_API_KEY=your_sendgrid_api_key
```

Use your own valid SendGrid API key. Never commit the `.env` file or share the API key publicly.

### 3. Start the backend

```bash
npm start
```

The Express server runs at:

`http://localhost:3000`

### 4. Configure and start the frontend

Open a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173`.

## How to Use

1. Open the DEV@Deakin website.
2. Scroll to the newsletter section at the bottom of the page.
3. Enter a valid email address.
4. Click **Subscribe**.
5. The frontend sends the email address to the backend using a POST request.
6. The backend validates the email and requests a welcome email through SendGrid.
7. The website displays a success or error message based on the response.

## API Endpoint

**Endpoint:** `POST /subscribe`

**Request body:**

```json
{
  "email": "subscriber@example.com"
}
```

The backend validates the submitted email and attempts to send a welcome email through SendGrid.

- `200 OK`: The Express endpoint reports that the email request was accepted by SendGrid.
- `400 Bad Request`: The submitted email address is missing or invalid.
- `500 Internal Server Error`: The email could not be sent due to a server or email-service error.

SendGrid normally returns `202 Accepted` when it accepts an email for processing. This is separate from the `200 OK` response returned by the Express endpoint.

## Testing

The following scenarios can be used to test the implementation:

- Submit a valid email address.
- Submit an invalid email address.
- Check the frontend success message.
- Check the browser Network tab for the `/subscribe` response.
- Verify the SendGrid API response in the backend terminal.
- Check SendGrid Email Activity for delivery events.
- Stop the backend temporarily and verify that the frontend displays a connection error.

## Security

- Keep API keys in environment variables.
- Do not commit `.env` files or `node_modules`.
- Do not expose SendGrid credentials in frontend code.
- Use `.gitignore` to exclude sensitive configuration files.

## Learning Outcomes

This task helped me understand how a React frontend communicates with an Express backend using HTTP requests. I also gained practical experience with email API integration, input validation, asynchronous operations, error handling and environment variables.
