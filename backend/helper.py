import json
## load sample data
def get_sample():
    with open('./data/sample.json', 'r') as file:
        return json.load(file)

## Calculate total value of an account
def calculate_account_value(account):
    total = 0
    for holding in account['holdings']:
        total += holding['units'] * holding['unitPrice']
    return round(total, 2)

## Calculate asset summary for an advisor
def calculate_advisor_assets(advisor_id):
    data = get_sample()
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