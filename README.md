# Employee Skill Tracker

Employee Skill Tracker is a full-stack application designed to help organizations manage employee skills and track training sessions efficiently.

## Project Overview

Employee Skill Tracker consists of two main components:

- **Backend**: A Ruby on Rails API (`employee_skill_tracker/`)
- **Frontend**: A Next.js React application (`employee-skill-frontend/`)

## Prerequisites

To run this project, you need the following installed:

- **Ruby**: Version 3.3.0 or later
- **Rails**: Version 7.2.1
- **PostgreSQL**: For the backend database
- **Node.js** and **npm**: For running the frontend (Node.js 14.x or later recommended)
- **Git**: To clone the repository
- **Visual Studio Code (VS Code)** or another text editor to edit the files

## Getting Started

Follow these steps to set up and run both the backend and frontend of the project.

### 1. Clone the Repository

1. **Open a Terminal**

   - On **Windows**: Press `Win + R`, type `cmd`, and press Enter.
   - On **macOS**: Press `Cmd + Space`, type `Terminal`, and press Enter.
   - On **Linux**: Use the shortcut `Ctrl + Alt + T`.

2. **Clone the Repository**
   ```bash
   git clone https://github.com/alexfrontendfr/project-metrics-full-stack.git
   cd project-metrics-full-stack
   ```

The repository contains two main directories:

- **`employee_skill_tracker`**: Backend directory
- **`employee-skill-frontend`**: Frontend directory

### 2. Backend Setup (Rails API)

1. **Navigate to the Backend Directory**

   ```bash
   cd employee_skill_tracker
   ```

2. **Install Dependencies**
   Install the required gems by running:

   ```bash
   bundle install
   ```

3. **Set Up the Database**
   Create and migrate the database:

   ```bash
   rails db:create
   rails db:migrate
   ```

4. **Seed the Database (Optional)**
   Seed the database with some initial data for testing purposes:

   ```bash
   rails db:seed
   ```

5. **Start the Rails Server**
   Start the backend Rails server:
   ```bash
   rails server
   ```
   The API will be available at `http://localhost:3000`.

### 3. Frontend Setup (Next.js)

1. **Open a New Terminal**

   - Open a new terminal window while keeping the backend server running.

2. **Navigate to the Frontend Directory**

   ```bash
   cd ../employee-skill-frontend
   ```

3. **Install Dependencies**
   Install the required packages:

   ```bash
   npm install
   ```

4. **Environment Configuration**
   Create a `.env.local` file in the frontend root directory with the following content to point to the backend API:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
   ```

5. **Start the Frontend Development Server**

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3001`.

6. **Open VS Code**
   - If you want to view or edit the project files, open VS Code by running:
   ```bash
   code .
   ```
   _(This command assumes VS Code is installed and added to your PATH.)_

## Accessing the Application

1. **Navigate to the Application**

   - Open `http://localhost:3001` in your web browser.

2. **Register/Login**

   - You can **register** a new account or **log in** using test credentials.
   - **For testing purposes**, you can use the following credentials to bypass the login/register process:
     - **Email**: `test@example.com`
     - **Password**: `testpassword`

3. **Features Available**
   - **Add New Metrics**: After logging in, you can add new employee metrics such as skill level.
   - **View Metrics Dashboard**: Access the metrics dashboard to see live metrics for employee skills and performance.
   - **Employee Management**: Manage employee information and training sessions.
   - **Skill Tracking**: Track employee skill levels over time.

## Adding Metrics

To add new metrics:

1. **Log in** to the application.
2. **Navigate** to the metrics section from the dashboard.
3. **Fill in** the required fields such as Employee ID, Skill Name, Level, and Value.
4. **Submit** the form to add the metric, which will be displayed in the metrics chart.

## Viewing Metrics and Other Functionalities

- The **metrics dashboard** displays all metrics data visually.
- Use the **navigation bar** to switch between different sections of the application, such as employees, metrics, or training sessions.
- You can **hover** over metrics in the dashboard to get detailed information.

## Running Tests

The application includes a test suite to verify functionality.

1. **Navigate to the Backend Directory**

   ```bash
   cd employee_skill_tracker
   ```

2. **Run the Test Suite**
   To run the backend tests:
   ```bash
   rails test
   ```

## Troubleshooting

If you encounter issues during setup or running the application, try the following:

1. **Database Issues**

   - If you run into issues with the database, try dropping and recreating it:
     ```bash
     rails db:drop db:create db:migrate db:seed
     ```

2. **Check Configuration Files**

   - Ensure the database configuration in `config/database.yml` is correct and matches your local PostgreSQL setup.

3. **Checking for Common Errors**
   - Make sure you have installed all prerequisites (Ruby, Rails, Node.js, PostgreSQL, etc.).
   - Verify that both servers (backend and frontend) are running before attempting to access the application.

## Development Notes

- **Do not run `rails db:create db:migrate db:seed` every time you start the server**. This is only required during initial setup or when new migrations are added.
- **Ensure both servers are running** (backend and frontend) to fully access the project.
- **Remove test credentials** and bypass logic before deploying to production to ensure secure authentication.

## Contributing

If you'd like to contribute:

1. **Fork the repository**.
2. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. **Commit your changes**:
   ```bash
   git commit -m 'Add new feature'
   ```
4. **Push to the branch**:
   ```bash
   git push origin feature-name
   ```
5. **Open a pull request** on GitHub.
