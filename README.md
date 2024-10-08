# TO DO List Application

A simple to-do list application built using **React**, **Node.js (v20)**, **TypeScript**, **Express**, **SQLite3**, and **Axios**. This app allows users to create, update, and delete tasks from a dynamic list. 

## Tech Stack

- **Frontend:** React, TailwindCSS
- **Backend:** Node.js (v20), Express
- **Language:** TypeScript
- **Database:** SQLite3
- **HTTP Client:** Axios

## Features

- Create new to-do lists.
- Add new tasks to existing to-do lists.
- Mark tasks as complete or incomplete.
- Delete tasks from the list.
- Simple and user-friendly interface.

## Prerequisites

To run this application locally, you need to have the following installed:

- **Node.js** (v20 or higher)
- **npm**

## Local Development Setup

Follow the steps below to set up the project for local development:

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/esmee-ramdien/To-do-list.git
cd To-do-list
```
### 2. Install dependencies

Install dependencies for the front- and backend by running the following commands in two different terminals
```bash
cd frontend
npm install

cd backend
npm install
```
### 3. Running the Frontend and Backend

Run the front- and backend separately by running the following commands in two different terminals
```bash
cd frontend
npm run dev

cd backend
npm run dev
```

## Design Choices

### Frontend
For the frontend, I have chosen to a lightweight CSS library, i.e., TailwindCSS, to streamline the UI development process. This enhances efficiency by eliminating the need for large stylesheets or heavy UI frameworks, allowing for faster load times and a more minimalistic design approach.

The application is built using **React.js**, a JavaScript framework that aligns with **Bizcuit's** tech stack. While I am more familiar with **Vue.js**, I chose **React** to expand my knowledge of different JS frameworks and improve my flexibility as a developer. This decision also allows for better integration with the team's existing tools and practices.

### Backend
For the backend, I selected **Express.js**, which is known as a fast and minimal API framework. It allows for easy extension with middleware, such as its Basic Auth library, which enables for basic HTTP authorization.

I chose **SQLite3** as the database due to its simplicity and great support. Given the small scope of this project, setting up a dedicated SQL server would be overkill, and **SQLite3** provides an efficient and lightweight alternative.

### Project Structure
A core design decision is the separation of the frontend and backend, which is a best practice for maintaining cleaner, more modular code. In larger projects, it would be ideal to have the frontend and backend in separate repositories, but for this project’s relatively smaller size, organizing them into two directories within the same repo is sufficient.

To avoid duplicate code, I created a `helpers.ts` file in both the frontend and backend directories. This approach centralizes reusable utility functions, keeping the code DRY (Don’t Repeat Yourself).

Additionally, I prefer working with views and breaking the view into reusable components wherever possible, ensuring maintainability and scalability.

## Improvements
Due to lack of time, I was not able to develop a fully functional application. Given below are the functionalities which I would implement, if given more time:

- Add more modular components to enhance reusability.
- Allow users to delete entire lists.
- Improve the user interface with toasts, a more intuitive design, and a refined color scheme.
- Implement local storage to enhance user experience and persistence.
- Add user authentication and login functionality.
- Allow users to share lists with others.
- Introduce collaboration features for shared editing of lists.

