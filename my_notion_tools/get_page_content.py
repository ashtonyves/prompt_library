#!/usr/bin/env python3
"""
Get page content from Notion
"""

import sys
from notion_client import NotionClient

def extract_text_from_block(block):
    """Extract plain text from a block"""
    block_type = block['type']

    if block_type in ['paragraph', 'heading_1', 'heading_2', 'heading_3']:
        rich_text = block[block_type].get('rich_text', [])
        return ''.join([text['plain_text'] for text in rich_text])
    elif block_type == 'bulleted_list_item':
        rich_text = block[block_type].get('rich_text', [])
        return '• ' + ''.join([text['plain_text'] for text in rich_text])
    elif block_type == 'numbered_list_item':
        rich_text = block[block_type].get('rich_text', [])
        return ''.join([text['plain_text'] for text in rich_text])

    return ''

def get_page_content(page_id):
    """Get all content blocks from a page"""
    client = NotionClient()

    try:
        result = client.get_block_children(page_id)
        blocks = result.get('results', [])

        print(f"\nPage Content ({len(blocks)} blocks):")
        print("="*60)

        full_text = []
        for block in blocks:
            text = extract_text_from_block(block)
            if text:
                print(text)
                full_text.append(text)

        print("="*60)

        # Find the SIZING marker
        full_content = '\n'.join(full_text)
        if '📐 SIZING:' in full_content:
            parts = full_content.split('📐 SIZING:', 1)
            print("\n\nContent BEFORE '📐 SIZING:':")
            print("-"*60)
            print(parts[0].strip())
            print("-"*60)

        return blocks

    except Exception as e:
        print(f"Error: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 get_page_content.py <page_id>")
        sys.exit(1)

    page_id = sys.argv[1]
    get_page_content(page_id)
