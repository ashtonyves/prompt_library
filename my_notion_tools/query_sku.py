#!/usr/bin/env python3
"""
Query Subtle Parts Inventory for a specific SKU
"""

import sys
from notion_client import NotionClient

def query_by_sku(sku: str):
    """Query the Subtle Parts Inventory database for a specific SKU"""
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
            return None

        item = results['results'][0]
        properties = item['properties']

        # Extract relevant fields
        data = {
            'sku': sku,
            'title': '',
            'description': '',
            'keywords': '',
            'page_id': item['id']
        }

        # Extract Title
        if 'Title' in properties:
            title_prop = properties['Title']
            if title_prop['type'] == 'title' and title_prop['title']:
                data['title'] = title_prop['title'][0]['plain_text']

        # Extract Description
        if 'Description' in properties:
            desc_prop = properties['Description']
            if desc_prop['type'] == 'rich_text' and desc_prop['rich_text']:
                data['description'] = desc_prop['rich_text'][0]['plain_text']

        # Extract Keywords
        if 'Keywords' in properties:
            kw_prop = properties['Keywords']
            if kw_prop['type'] == 'rich_text' and kw_prop['rich_text']:
                data['keywords'] = kw_prop['rich_text'][0]['plain_text']

        # Print formatted output
        print(f"\n{'='*60}")
        print(f"SKU: {data['sku']}")
        print(f"{'='*60}")
        print(f"\nTitle:\n{data['title']}")
        print(f"\nDescription:\n{data['description']}")
        print(f"\nKeywords:\n{data['keywords']}")
        print(f"\nPage ID: {data['page_id']}")
        print(f"{'='*60}\n")

        return data

    except Exception as e:
        print(f"Error querying database: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 query_sku.py <SKU>")
        sys.exit(1)

    sku = sys.argv[1]
    query_by_sku(sku)
