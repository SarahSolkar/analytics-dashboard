## imports
from flask import Flask, jsonify, request
from flask_cors import CORS
from helper import *

app = Flask(__name__)

CORS(app)

# Get all advisors
@app.route('/api/advisors', methods=['GET'])
def get_advisors():
    result = []
    data = get_sample()
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
    if request.method == "GET":
        data = get_sample()
        advisor = get_advisor_by_id(advisor_id)
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
    if request.method == "GET":
        data = get_sample()
        advisor = get_advisor_by_id(advisor_id)
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

# Holdings for an account number
@app.route('/api/accounts/<account_number>/holdings', methods=['GET'])
def get_account_holdings(account_number):
    if request.method == "GET":
        data = get_sample()
        account = next((acc for acc in data['accounts'] if acc['number'] == account_number), None)
        if not account:
            return jsonify({'error': 'Account not found'}), 404
        
        result = []
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
                result.append(enhanced_holding)
        
        return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)