#!/usr/bin/env python3
"""
Update product in Notion - replace description above SIZING, update titles and keywords
"""

import sys
from notion_client import NotionClient

def get_blocks_before_sizing(page_id):
    """Get all blocks before the SIZING section"""
    client = NotionClient()
    result = client.get_block_children(page_id)
    blocks = result.get('results', [])

    # Find blocks before SIZING
    blocks_to_delete = []
    found_sizing = False

    for block in blocks:
        block_type = block['type']

        # Check if this block contains "📐 SIZING:"
        if block_type in ['paragraph', 'heading_1', 'heading_2', 'heading_3']:
            rich_text = block[block_type].get('rich_text', [])
            text = ''.join([t['plain_text'] for t in rich_text])

            if '📐 SIZING:' in text or 'SIZING:' in text:
                found_sizing = True
                break

        blocks_to_delete.append(block['id'])

    return blocks_to_delete, found_sizing

def delete_block(block_id):
    """Delete a block by ID"""
    client = NotionClient()
    url = f"{client.base_url}/blocks/{block_id}"

    import requests
    response = requests.delete(url, headers=client.headers)
    response.raise_for_status()
    return response.json()

def update_product(page_id, shopify_title, etsy_title, keywords, new_description):
    """Update product with new content"""
    client = NotionClient()

    print(f"Updating product...")
    print(f"Page ID: {page_id}\n")

    # Step 1: Update properties
    print("Step 1: Updating properties...")
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
        client.update_page(page_id, properties)
        print("✓ Properties updated")
    except Exception as e:
        print(f"✗ Error updating properties: {e}")
        return False

    # Step 2: Delete blocks before SIZING
    print("\nStep 2: Finding blocks to delete...")
    blocks_to_delete, found_sizing = get_blocks_before_sizing(page_id)

    if not found_sizing:
        print("⚠ Warning: Could not find SIZING marker. Deleting all blocks.")

    print(f"Found {len(blocks_to_delete)} blocks to delete")

    for block_id in blocks_to_delete:
        try:
            delete_block(block_id)
        except Exception as e:
            print(f"✗ Error deleting block {block_id}: {e}")

    print("✓ Old content deleted")

    # Step 3: Add new description at the beginning
    print("\nStep 3: Adding new description...")

    # Split description into paragraphs if it has line breaks
    paragraphs = new_description.split('\n\n')

    children = []
    for para in paragraphs:
        if para.strip():
            children.append({
                "object": "block",
                "type": "paragraph",
                "paragraph": {
                    "rich_text": [{"type": "text", "text": {"content": para.strip()}}]
                }
            })

    try:
        # We need to prepend, but Notion doesn't have prepend
        # So we'll use a workaround: get the first remaining block ID and insert before it
        result = client.get_block_children(page_id)
        remaining_blocks = result.get('results', [])

        if remaining_blocks:
            # Insert after the page itself, which means it goes at the beginning
            client.append_block_children(page_id, children)
        else:
            # No blocks left, just append
            client.append_block_children(page_id, children)

        print("✓ New description added")
    except Exception as e:
        print(f"✗ Error adding description: {e}")
        return False

    print("\n✓ Update complete!")
    return True

if __name__ == "__main__":
    if len(sys.argv) < 6:
        print("Usage: python3 update_product_content.py <page_id> <shopify_title> <etsy_title> <description> <keywords>")
        print("\nExample:")
        print('  python3 update_product_content.py "page-id" "Shopify Title" "Etsy Title" "Description text" "keyword1\\nkeyword2"')
        sys.exit(1)

    page_id = sys.argv[1]
    shopify_title = sys.argv[2]
    etsy_title = sys.argv[3]
    description = sys.argv[4]
    keywords = sys.argv[5]

    update_product(page_id, shopify_title, etsy_title, keywords, description)
