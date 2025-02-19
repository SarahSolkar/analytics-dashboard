from flask import Flask, jsonify, request
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data = {
    "advisors": [
        {
            "id": "4",
            "name": "Randall",
            "custodians": [
                {"name": "Schwab", "repId": "1271"},
                {"name": "Fidelity", "repId": "8996"}
            ],
            "accounts": ["21889645", "21889646", "21889647"]
        },
        {
            "id": "5",
            "name": "Sarah",
            "custodians": [
                {"name": "Schwab", "repId": "1272"},
                {"name": "Vanguard", "repId": "5432"}
            ],
            "accounts": ["31889645", "31889646"]
        }
    ],
    "accounts": [
        {
            "name": "Bradley Green 401k",
            "number": "21889645",
            "repId": "9883",
            "custodian": "Schwab",
            "holdings": [
                {"ticker": "HEMCX", "units": 77, "unitPrice": 398.63}
            ]
        },
        {
            "name": "Bradley Green IRA",
            "number": "21889646",
            "repId": "9883",
            "custodian": "Schwab",
            "holdings": [
                {"ticker": "ICKAX", "units": 100, "unitPrice": 45.25},
                {"ticker": "VFIAX", "units": 50, "unitPrice": 120.75}
            ]
        },
        {
            "name": "John Smith 401k",
            "number": "21889647",
            "repId": "1271",
            "custodian": "Schwab",
            "holdings": [
                {"ticker": "VTI", "units": 200, "unitPrice": 220.50}
            ]
        },
        {
            "name": "Alice Johnson 401k",
            "number": "31889645",
            "repId": "1272",
            "custodian": "Schwab",
            "holdings": [
                {"ticker": "QQQ", "units": 150, "unitPrice": 350.25}
            ]
        },
        {
            "name": "Bob Williams IRA",
            "number": "31889646",
            "repId": "5432",
            "custodian": "Vanguard",
            "holdings": [
                {"ticker": "SPY", "units": 100, "unitPrice": 420.75}
            ]
        }
    ],
    "securities": [
        {
            "id": "2e5012db-3a39415d-93b48b1e3b453c6c",
            "ticker": "ICKAX",
            "name": "Delaware Ivy Crossover Credit Fund Class A",
            "dateAdded": "2001-06-07T11:12:56.205Z"
        },
        {
            "id": "3f6123ec-4b40526e-04c59c2f4c564d7d",
            "ticker": "HEMCX",
            "name": "American Funds SMALLCAP World Fund Class C",
            "dateAdded": "2010-03-15T09:45:32.120Z"
        },
        {
            "id": "4g7234fd-5c51637f-15d60d3g5d675e8e",
            "ticker": "VFIAX",
            "name": "Vanguard 500 Index Fund Admiral Shares",
            "dateAdded": "2005-11-23T14:32:18.350Z"
        },
        {
            "id": "5h8345ge-6d62748g-26e71e4h6e786f9f",
            "ticker": "VTI",
            "name": "Vanguard Total Stock Market ETF",
            "dateAdded": "2008-07-12T10:18:45.720Z"
        },
        {
            "id": "6i9456hf-7e73859h-37f82f5i7f897g0g",
            "ticker": "QQQ",
            "name": "Invesco QQQ Trust Series 1",
            "dateAdded": "2007-09-17T15:23:12.430Z"
        },
        {
            "id": "7j0567ig-8f84960i-48g93g6j8g908h1h",
            "ticker": "SPY",
            "name": "SPDR S&P 500 ETF Trust",
            "dateAdded": "2006-05-30T12:34:56.890Z"
        }
    ]
}

# Helper function to calculate total value of an account
def calculate_account_value(account):
    total = 0
    for holding in account['holdings']:
        total += holding['units'] * holding['unitPrice']
    return round(total, 2)

# Helper function to calculate asset summary for an advisor
def calculate_advisor_assets(advisor_id):
    accounts_managed = next((a['accounts'] for a in data['advisors'] if a['id'] == advisor_id), [])
    total_assets = 0
    account_count = len(accounts_managed)
    
    for account_number in accounts_managed:
        account = next((acc for acc in data['accounts'] if acc['number'] == account_number), None)
        if account:
            total_assets += calculate_account_value(account)
    
    return {
        'account_count': account_count,
        'total_assets': round(total_assets, 2)
    }


# Get all advisors
@app.route('/api/advisors', methods=['GET'])
def get_advisors():
    """Get all advisors with asset summaries."""
    result = []
    for advisor in data['advisors']:
        assets_summary = calculate_advisor_assets(advisor['id'])
        result.append({
            'id': advisor['id'],
            'name': advisor['name'],
            'custodians': advisor['custodians'],
            'account_count': assets_summary['account_count'],
            'total_assets': assets_summary['total_assets']
        })
    return jsonify(result)

# Advisor summary
@app.route('/api/advisor/<advisor_id>', methods=['GET'])
def get_advisor(advisor_id):
    advisor = next((a for a in data['advisors'] if a['id'] == advisor_id), None)
    if not advisor:
        return jsonify({'error': 'Advisor not found'}), 404
    
    assets_summary = calculate_advisor_assets(advisor_id)
    result = {
        'id': advisor['id'],
        'name': advisor['name'],
        'custodians': advisor['custodians'],
        'account_count': assets_summary['account_count'],
        'total_assets': assets_summary['total_assets']
    }
    return jsonify(result)

# Advisor Account Information
@app.route('/api/advisor/<advisor_id>/accounts', methods=['GET'])
def get_advisor_accounts(advisor_id):
    advisor = next((a for a in data['advisors'] if a['id'] == advisor_id), None)
    if not advisor:
        return jsonify({'error': 'Advisor not found'}), 404
    
    accounts_managed = advisor['accounts']
    result = []
    for account_number in accounts_managed:
        account = next((acc for acc in data['accounts'] if acc['number'] == account_number), None)
        if account:
            account_value = calculate_account_value(account)
            result.append({
                'name': account['name'],
                'number': account['number'],
                'repId': account['repId'],
                'custodian': account['custodian'],
                'totalValue': account_value,
                'holdings_count': len(account['holdings'])
            })
    
    return jsonify(result)

# Account Information
@app.route('/api/accounts/<account_number>', methods=['GET'])
def get_account(account_number):
    account = next((acc for acc in data['accounts'] if acc['number'] == account_number), None)
    if not account:
        return jsonify({'error': 'Account not found'}), 404
    
    # Create a copy to add calculated total value
    account_with_total = account.copy()
    account_with_total['totalValue'] = calculate_account_value(account)
    
    return jsonify(account_with_total)

# Holdings for an account number
@app.route('/api/accounts/<account_number>/holdings', methods=['GET'])
def get_account_holdings(account_number):
    account = next((acc for acc in data['accounts'] if acc['number'] == account_number), None)
    if not account:
        return jsonify({'error': 'Account not found'}), 404
    
    enhanced_holdings = []
    for holding in account['holdings']:
        security = next((sec for sec in data['securities'] if sec['ticker'] == holding['ticker']), None)
        if security:
            # Calculate value for this holding
            holding_value = holding['units'] * holding['unitPrice']
            
            enhanced_holding = holding.copy()
            enhanced_holding.update({
                'name': security['name'],
                'value': round(holding_value, 2),
                'security_id': security['id'],
                'dateAdded': security['dateAdded']
            })
            enhanced_holdings.append(enhanced_holding)
    
    return jsonify(enhanced_holdings)

if __name__ == '__main__':
    app.run(debug=True)