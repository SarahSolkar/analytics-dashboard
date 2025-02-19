# Firm Advisor Dashboard

A Flask-React application to visualize advisor data, accounts, and holdings.

## Overview

This application provides a hierarchical view of:
- Financial advisors and their total assets under management
- Accounts managed by each advisor
- Holdings within each account

The system uses a Flask backend API to serve data and a React frontend with MaterialReactTable, Reactstrap, Highcharts, Bootstrap for visualization.

## Project Structure

```
compound-dashboard/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── data/
│       └── sample_data.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── AdvisorDashboard.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   │   └── styles.css
│   ├── package.json
│   └── README.md
└── ReadMe.md
```

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn package manager

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

1. Install Node.js dependencies:
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
- `GET /api/advisors` - List all advisors with asset summaries
- `GET /api/advisors/<advisor_id>` - Get specific advisor details
- `GET /api/advisors/<advisor_id>/accounts` - Get accounts managed by an advisor

### Accounts
- `GET /api/accounts/<account_number>` - Get account details
- `GET /api/accounts/<account_number>/holdings` - Get holdings for a specific account

## Frontend Components

### AdvisorDashboard

Main component that displays:
1. Top-level advisor information
2. Expandable rows showing account details
3. Further expandable rows showing holdings

Features:
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
- Uses in-memory data (can be extended to use a database)
- Implements RESTful API endpoints
- Includes dynamic value calculations

### Frontend
- Built with React
- Uses MaterialReactTable for tabular data display
- Uses Reactstrap for layout, design
- Implements three-level drill-down functionality
- Includes loading states and error handling
