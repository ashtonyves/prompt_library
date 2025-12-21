#!/usr/bin/env python3
"""
Update product listing in Notion Subtle Parts Inventory
"""

import sys
from notion_client import NotionClient

def update_product(page_id: str, shopify_title: str, etsy_title: str, keywords: str):
    """Update product properties in Notion"""
    client = NotionClient()

    properties = {
        "Shopify SEO Title": {
            "rich_text": [{"text": {"content": shopify_title}}]
        },
        "Etsy Listing Title": {
            "rich_text": [{"text": {"content": etsy_title}}]
        },
        "SEO keywords": {
            "rich_text": [{"text": {"content": keywords}}]
        },
        "Optimized": {
            "status": {"name": "Optimized"}
        }
    }

    try:
        result = client.update_page(page_id, properties)
        print(f"✓ Successfully updated page!")
        print(f"  Page ID: {page_id}")
        return result
    except Exception as e:
        print(f"✗ Error updating page: {e}")
        return None

def get_page_content_blocks(page_id: str):
    """Get the content blocks of a page"""
    client = NotionClient()
    try:
        blocks = client.get_block_children(page_id)
        return blocks
    except Exception as e:
        print(f"✗ Error getting page content: {e}")
        return None

def append_product_description(page_id: str, description: str):
    """Append product description to page content"""
    client = NotionClient()

    # Create paragraph block with description
    children = [
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [{"type": "text", "text": {"content": "Product Description"}}]
            }
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [{"type": "text", "text": {"content": description}}]
            }
        }
    ]

    try:
        result = client.append_block_children(page_id, children)
        print(f"✓ Successfully added description to page content")
        return result
    except Exception as e:
        print(f"✗ Error appending description: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Usage: python3 update_notion_product.py <page_id> <shopify_title> <etsy_title> <keywords> [description]")
        print("\nExample:")
        print('  python3 update_notion_product.py "page-id" "Shopify Title" "Etsy Title" "keyword1\\nkeyword2" "Optional description"')
        sys.exit(1)

    page_id = sys.argv[1]
    shopify_title = sys.argv[2]
    etsy_title = sys.argv[3]
    keywords = sys.argv[4]
    description = sys.argv[5] if len(sys.argv) > 5 else None

    print("Updating product in Notion...")
    print(f"Page ID: {page_id}")
    print()

    # Update properties
    update_product(page_id, shopify_title, etsy_title, keywords)

    # Add description to page content if provided
    if description:
        print("\nAdding description to page content...")
        append_product_description(page_id, description)
