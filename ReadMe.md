# Firm Advisor Dashboard

A Flask-React application to visualize advisor data, accounts, and holdings.

## Overview
Option B - Frontend emphasis
Hierarchical view of:
- Financial advisors and their total assets
- Accounts managed by each advisor
- Holdings within each account

The system uses a Flask backend API to serve data and a React frontend with MaterialReactTable, Reactstrap, Highcharts, Bootstrap.

## Project Structure

```
compound-dashboard/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── data/
│       └── sample.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── AccountsModal.jsx
│   │   │   └── AdvisorTable.jsx
│   │   │   └── AppNavbar.jsx
│   │   │   └── Chart.jsx
│   │   │   └── Dashboard.jsx
│   │   │   └── DonutChart.jsx
│   │   │   └── Footer.jsx
│   │   │   └── Holdings.jsx
│   │   │   └── PieChart.jsx
│   │   ├── services/
│   │   │   └── AdvisorService.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   │   └── index.js
│   │   └── main.jsx
│   │   └── styles.css
│   ├── package.json
│   └── README.md
│   └── vite.config.js
└── ReadMe.md
```

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn 

## Installation

### Backend Setup

1. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Run the Flask application:
```bash
python app.py
```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Advisors
- `GET /api/advisors` - Get all advisors with summary
- `GET /api/advisors/<advisor_id>/accounts` - Get accounts managed by an advisor

### Accounts
- `GET /api/accounts/<account_number>/holdings` - Get holdings for a specific account

## Frontend Components

### AdvisorDashboard

- Responsive layout using Reactstrap
- Sortable columns
- Currency formatting
- Loading states
- Error handling
- Nested table views


## Data Structure

### Advisor Object
```json
{
  "id": "string",
  "name": "string",
  "custodians": [
    {
      "name": "string",
      "repId": "string"
    }
  ],
  "accounts": ["string"]
}
```

### Account Object
```json
{
  "name": "string",
  "number": "string",
  "repId": "string",
  "custodian": "string",
  "holdings": [
    {
      "ticker": "string",
      "units": number,
      "unitPrice": number
    }
  ]
}
```

### Security Object
```json
{
  "id": "string",
  "ticker": "string",
  "name": "string",
  "dateAdded": "string"
}
```

## Development

### Backend
- Built with Flask
- Uses sample data
- Includes dynamic value calculations
- Returns JSON Response

### Frontend
- Built with React
- Uses MaterialReactTable for tabular data
- Included search, sort on advisor table
- Uses Reactstrap for layout, design
- Uses Bootstrap for styling
- Uses Highcharts for charts

### Future Enhancements

- Add authentication and authorization
- Add data export functionality
- Add database storage
- Add update, delete operations

## Author
- Sarah Ashraf Solkar
- email: ssolkar@gmu.edu
