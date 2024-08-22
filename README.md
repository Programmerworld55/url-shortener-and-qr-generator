# URL Shortener and QR Code Generator

This project is a web application that allows users to shorten URLs and generate QR codes for those shortened URLs. The frontend is built using React, and the backend is developed with Node.js, Express, and MongoDB.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Shorten long URLs into compact, easily shareable links.
- Generate QR codes for the shortened URLs.
- Track the number of times a shortened URL has been accessed.
- Responsive design for optimal viewing on different devices.

## Tech Stack

### Frontend

- **React**: Utilized for building the user interface.
  - **useState**: Manage component states.
  - **React Router**: Handle navigation between different pages.
  - **Context API**: Manage global state for sharing data between components.
  - **Fetch API**: Interact with the backend services.

### Backend

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for Node.js to build the API.
- **MongoDB (Cloud)**: Database to store URLs and related data.
- **Mongoose**: ORM for MongoDB to interact with the database.
- **QR Code**: Generate QR codes based on the shortened URLs.



## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Programmerworld55/url-shortener-and-qr-generator.git
   cd url-shortener-and-qr-generator
   
2. **Install backend dependencies:**
   ```bash
   cd Backend
   npm install
   
3. **Install frontend dependencies:**
   ```bash
   cd ../Frontend/vite-project
   npm install

## Usage
1. **Run the backend server:**
   ```bash
   cd Backend
   npm start


2. **Run the frontend:**
   ```bash
   cd ../Frontend/vite-project
   npm run dev
   
## Access the application:

1. Open your browser and go to [http://localhost:3000](http://localhost:3000).

2. Use the form on the homepage to enter a long URL and click the "Generate short URL" button. The application will display a shortened URL.

3. Click on "QR Code Generator" and then click on "Generate QR Code." A QR code will be generated, which you can use and download.

## Contributing
  Feel free to submit issues or pull requests if you find any bugs or want to add features.

