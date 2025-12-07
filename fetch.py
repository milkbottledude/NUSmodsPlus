import requests
import json

api_link = 'https://api.nusmods.com/v2/2025-2026/modules/CS2030.json'

response = requests.get(api_link)
data = response.json()

with open('testAPI.json', 'w') as f:
    json.dump(data, f, indent=2)