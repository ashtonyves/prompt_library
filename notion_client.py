#!/usr/bin/env python3
"""
Notion API Client
A simple utility to interact with Notion API
"""

import os
import requests
from typing import Dict, List, Optional, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class NotionClient:
    def __init__(self, api_key: Optional[str] = None):
        """Initialize Notion client with API key"""
        self.api_key = api_key or os.getenv('NOTION_API_KEY')
        if not self.api_key:
            raise ValueError("Notion API key not found. Set NOTION_API_KEY in .env file")

        self.base_url = "https://api.notion.com/v1"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28"
        }

    def search(self, query: str = "", filter_type: Optional[str] = None) -> Dict:
        """
        Search for pages/databases in Notion

        Args:
            query: Search query string
            filter_type: "page" or "database" to filter results
        """
        url = f"{self.base_url}/search"
        payload = {}

        if query:
            payload["query"] = query

        if filter_type:
            payload["filter"] = {"property": "object", "value": filter_type}

        response = requests.post(url, json=payload, headers=self.headers)
        response.raise_for_status()
        return response.json()

    def get_page(self, page_id: str) -> Dict:
        """Get page details by ID"""
        url = f"{self.base_url}/pages/{page_id}"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()

    def get_database(self, database_id: str) -> Dict:
        """Get database details by ID"""
        url = f"{self.base_url}/databases/{database_id}"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()

    def query_database(self, database_id: str, filter_params: Optional[Dict] = None,
                       sorts: Optional[List] = None) -> Dict:
        """
        Query a database with optional filters and sorts

        Args:
            database_id: The database ID
            filter_params: Optional filter object
            sorts: Optional list of sort objects
        """
        url = f"{self.base_url}/databases/{database_id}/query"
        payload = {}

        if filter_params:
            payload["filter"] = filter_params

        if sorts:
            payload["sorts"] = sorts

        response = requests.post(url, json=payload, headers=self.headers)
        response.raise_for_status()
        return response.json()

    def create_page(self, parent_id: str, properties: Dict,
                    parent_type: str = "database_id", children: Optional[List] = None) -> Dict:
        """
        Create a new page

        Args:
            parent_id: Parent database or page ID
            properties: Page properties
            parent_type: "database_id" or "page_id"
            children: Optional list of block children
        """
        url = f"{self.base_url}/pages"
        payload = {
            "parent": {parent_type: parent_id},
            "properties": properties
        }

        if children:
            payload["children"] = children

        response = requests.post(url, json=payload, headers=self.headers)
        response.raise_for_status()
        return response.json()

    def update_page(self, page_id: str, properties: Dict) -> Dict:
        """Update page properties"""
        url = f"{self.base_url}/pages/{page_id}"
        payload = {"properties": properties}

        response = requests.patch(url, json=payload, headers=self.headers)
        response.raise_for_status()
        return response.json()

    def get_block_children(self, block_id: str) -> Dict:
        """Get all children blocks of a block/page"""
        url = f"{self.base_url}/blocks/{block_id}/children"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()

    def append_block_children(self, block_id: str, children: List[Dict]) -> Dict:
        """Append children blocks to a block/page"""
        url = f"{self.base_url}/blocks/{block_id}/children"
        payload = {"children": children}

        response = requests.patch(url, json=payload, headers=self.headers)
        response.raise_for_status()
        return response.json()


def main():
    """Test the Notion client"""
    try:
        client = NotionClient()
        print("✓ Notion client initialized successfully")

        # Test search
        print("\nSearching for pages and databases...")
        results = client.search()

        print(f"\nFound {len(results.get('results', []))} items:")
        for item in results.get('results', [])[:5]:  # Show first 5
            obj_type = item.get('object')
            title = "Untitled"

            # Extract title based on object type
            if obj_type == 'page':
                title_prop = item.get('properties', {}).get('title', {})
                if title_prop and title_prop.get('title'):
                    title = title_prop['title'][0].get('plain_text', 'Untitled')
            elif obj_type == 'database':
                if item.get('title') and len(item['title']) > 0:
                    title = item['title'][0].get('plain_text', 'Untitled')

            print(f"  - [{obj_type}] {title}")
            print(f"    ID: {item.get('id')}")

        print("\n✓ Notion API connection successful!")

    except Exception as e:
        print(f"✗ Error: {e}")
        return 1

    return 0


if __name__ == "__main__":
    exit(main())
