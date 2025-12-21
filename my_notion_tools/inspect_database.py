#!/usr/bin/env python3
"""
Inspect database structure and a specific item
"""

import sys
import json
from notion_client import NotionClient

def inspect_item(sku: str):
    """Inspect all properties of an item"""
    client = NotionClient()

    # Database ID for Subtle Parts Inventory
    database_id = "b605305c-3300-4c3e-8731-92ee11805f19"

    # Query with SKU filter
    filter_params = {
        "property": "SKU",
        "rich_text": {
            "equals": sku
        }
    }

    try:
        results = client.query_database(database_id, filter_params)

        if not results.get('results'):
            print(f"No item found with SKU: {sku}")
            return

        item = results['results'][0]
        properties = item['properties']

        print(f"\n{'='*60}")
        print(f"All Properties for SKU: {sku}")
        print(f"{'='*60}\n")

        for prop_name, prop_data in properties.items():
            prop_type = prop_data['type']
            value = extract_value(prop_data)
            print(f"{prop_name} ({prop_type}):")
            print(f"  {value}")
            print()

    except Exception as e:
        print(f"Error: {e}")

def extract_value(prop_data):
    """Extract value from property based on type"""
    prop_type = prop_data['type']

    if prop_type == 'title':
        if prop_data['title']:
            return prop_data['title'][0]['plain_text']
    elif prop_type == 'rich_text':
        if prop_data['rich_text']:
            return prop_data['rich_text'][0]['plain_text']
    elif prop_type == 'number':
        return prop_data['number']
    elif prop_type == 'select':
        return prop_data['select']['name'] if prop_data['select'] else None
    elif prop_type == 'multi_select':
        return [item['name'] for item in prop_data['multi_select']]
    elif prop_type == 'date':
        return prop_data['date']
    elif prop_type == 'checkbox':
        return prop_data['checkbox']
    elif prop_type == 'url':
        return prop_data['url']
    elif prop_type == 'files':
        return [f['name'] for f in prop_data['files']]

    return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 inspect_database.py <SKU>")
        sys.exit(1)

    sku = sys.argv[1]
    inspect_item(sku)
