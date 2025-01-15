# JourneyJOT - Trip Journaling and Exporting Tool

JourneyJOT is a web-based platform designed to help users journal their trips and adventures. With JourneyJOT, users can document their journeys, capture memories, and export them into beautiful PDFs or flipbooks for easy sharing and keeping. Built using **React** for the frontend, and **C#/.NET** for the backend, JourneyJOT offers a seamless experience for users to record and showcase their travels.

---

## Features

- **Journal Trips**:  
  Capture details about your trips, including destination, activities, photos, and personal reflections.

- **Create Memories**:  
  Add text, images, and notes to your journal entries to remember the moments that matter most.

- **Export to PDF**:  
  Export your journey as a professionally formatted PDF for easy printing and sharing.

- **Flipbook Export**:  
  Generate a digital flipbook version of your journal entries, perfect for an interactive, online sharing experience.

- **User Authentication**:  
  Secure user accounts for personalized journaling, with the option to save and revisit previous trips.

---

## Tech Stack

- **Frontend**:  
  - **React.js** – For building dynamic, responsive user interfaces.  
  - **CSS** – Custom styling for a beautiful, user-friendly design.

- **Backend**:  
  - **C#** – Backend logic for handling journal entries, data storage, and user management.  
  - **.NET** – Web API framework to handle requests and manage the journey data.  
  - **SQL Server** – For storing user data and journal entries.

- **Exporting Tools**:  
  - **PDF Libraries** – Used to generate formatted PDF versions of journals.  
  - **Flipbook Library** – For creating interactive flipbook versions of the journals.

---

## Getting Started

### Prerequisites

- **Node.js** – For running the frontend React app.  
- **.NET SDK** – For running the backend API.  
- **SQL Server** – For storing your journal data.

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/journeyjot.git
cd journeyjot

2. **Install Frontend Dependencies:** 
```bash
cd client
npm install

3. **Set Up Backend:**
Open the JourneyJOT solution in Visual Studio or your preferred IDE.
Configure the database connection in the appsettings.json file.

3. **Run the Backend:**
cd server
dotnet run
3. **Run the Frontend:**
cd client
npm start
The frontend will be available at http://localhost:3000.

## Usage

### Create an Account
- Register or log in to start journaling your trips.

### Add a New Journey
- Click on "New Journey" to start documenting your adventure. Fill in the details such as trip name, destination, dates, and activities.

### Add Media
- You can upload photos, add text, and make each entry unique by customizing it.

### Export
- Once you've completed your journey, you can export your trip to a PDF or a digital flipbook for sharing or saving.

