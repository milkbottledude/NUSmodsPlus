import requests
import json

def from_api(api_link='https://api.nusmods.com/v2/2025-2026/modules/CS2030.json', save_json=False, json_filepath = 'testAPI.json'):
    response = requests.get(api_link)
    data = response.json()

    if save_json:
        with open(json_filepath, 'w') as f:
            json.dump(data, f, indent=2)
            print('saved to json')

# step 1: getting all the courses that fulfill the 4+2 pillars 

pillar_mods = {
    'GEX': [],
    'GEC': [],
    'GES': [],
    'GEN': []
}

# saving all courses so I don't have to call everytime and overload the api
from_api(api_link='https://api.nusmods.com/v2/2025-2026/moduleList.json', save_json=True, json_filepath='all_mods.json')

def read_json(filepath):
    with open('all_mods.json', 'r') as f:
        res = json.load(f)
        return res
    
all_mods_list = read_json('all_mods.json')
print(all_mods_list)

