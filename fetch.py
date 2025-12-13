import requests
import json

def to_json(JSONdata, filepath='target_mods.json'):
    with open(filepath, 'w') as f:
        json.dump(JSONdata, f, indent=2)
        print('saved to json')

def read_json(filepath):
    with open(filepath, 'r') as f:
        res = json.load(f)
        return res
    
def from_api(api_link, save_json=False, json_filepath = 'NA'):
    response = requests.get(api_link)
    data = response.json()

    if save_json:
        to_json(json_filepath, data)

# step 1: getting all the courses that fulfill the 4+2 pillars 

pillar_mods = {
    'GEX': [],
    'GEC': [],
    'GES': [],
    'GEN': [],
}

# saving all courses so I don't have to call everytime and overload the api
# from_api(api_link='https://api.nusmods.com/v2/2025-2026/moduleList.json', save_json=True, json_filepath='all_mods.json')


def step1():
    all_mods_list = read_json('all_mods.json')
    for mod in all_mods_list:
        modCode = mod['moduleCode']
        prefix = modCode[:3]
        if prefix in pillar_mods:
            pillar_mods[prefix].append(modCode)

    pillar_mods['default'] = ['CS1010A', 'IS1108']

# step 2: getting all BAIS core modules

def step2():
    target_mods_list = read_json('target_mods.json')
    target_mods = {
        'pillar_mods': target_mods_list,
        'core_mods': ['BT2102', 'CS2030', 'CS2040', 'IS2101', 'IS2108', 'IS2109', 'IS3103', 'Ind_XP_req/CP4101', 'IS4108', 'MA1521', 'MA1522', 'ST2334']
    }
    to_json('target_mods.json', target_mods)


# step 3: getting all programme elective modules

def step3():
    PE_string = '''
Digital Business
IS3150 Digital Media Marketing
IS3240 Digital Platform Strategy and Architecture
IS4262 Digital Product Management

Financial Technology
IS4226 Systematic Trading Strategies and Systems
IS4228 Information Technologies in Financial Services
IS4302 Blockchain and Distributed Ledger Technologies
IS4303 IT-Mediated Financial Solutions and Platforms

IT Solutioning
CS2105 Introduction to Computer Networks
IS2102 Requirements Analysis for Business IT Systems
IS3108 Full-stack Software Engineering for AI Solutions II
IS3221 ERP Systems with Analytics Solutions
IS4100 IT Project Management
IS4234 Governance, Regulation, and Compliance Technology
IS4236 Cloud Services and Infrastructure Management
IS4243 Digital Transformation Consulting
IS4248 Digital Business and the Metaverse
IS4250 IT-enabled Healthcare Solutioning
IS4301 Agile IT with DevOps

AI Solutioning
BT3017 Feature Engineering for Machine Learning
BT4014 Analytics Driven Design of Adaptive Systems
BT4221 Advanced Analytics with Big Data Technologies
BT4301 Business Analytics Solutions and Development
IS3107 Data Engineering
IS3109 AI and Machine Learning Techniques II
IS4151 AIoT Solutions and Development
IS4246 Smart Systems and AI Governance
IS4400 Human-AI Interaction
IS4401 Generative AI and Business Applications
IS4402 Machine Learning with Unstructured Data

IT Business Innovation and Entrepreneurship
CP3100 Information Systems and Analytics Research Methodology
IS3251 Principles of Technology Entrepreneurship
IS4152 Affective Computing
IS4241 Social Media Network Analysis
IS4261 Designing AI-driven Business Innovations

IT Security and Legal Aspects
CS2107 Introduction to Information Security
IFS4101 Legal Aspects of Information Security
IS4231 Information Security Management
IS4233 Legal Aspects of Information Technology
IS4238 Strategic Cybersecurity
    '''.strip()

    PE_groups = PE_string.split('\n\n')
    PE_mods = {}
    for grp in PE_groups:
        parts = grp.split('\n')
        title = parts.pop(0)
        PE_mods[title] = [string.split(' ')[0] for string in parts]

    target_mods = read_json('target_mods.json')
    target_mods['PE_mods'] = PE_mods

    print(target_mods)
    to_json(target_mods)

def step3pt2():
    target_mods = read_json('target_mods.json')
    PE_mods = target_mods['PE_mods']

    for title, mod_list in PE_mods.items():
        new = {
            '2k': [],
            '3k': [],
            '4k': []
        }
        for mod in mod_list:
            lvl = f'{mod[-4]}k'
            new[lvl].append(mod)
        PE_mods[title] = new

    target_mods['PE_mods'] = PE_mods
    to_json(target_mods)


# step 4: Adding Interdisciplinary (ID) & Cross-Disciplinary (CD) mods

def step4pt1():
    ID_mods = []
    with open('ID_mods.txt', 'r', encoding='utf-8') as f:
        div = 0
        for line in f:
            if div % 3 == 0:
                modCode = line.split(' ')[0]
                ID_mods.append(modCode)
            div += 1

    target_mods = read_json('target_mods.json')
    IDCD_mods = {'ID_mods': ID_mods}
    target_mods['IDCD_mods'] = IDCD_mods

    print(target_mods['IDCD_mods'])
    to_json(target_mods)

def step4pt2():
    CD_mods = []
    with open('CD_mods_pt1.txt', 'r', encoding='utf-8') as f:
        div = 0
        for line in f:
            if div % 3 == 0:
                modCode = line.split(' ')[0]
                CD_mods.append(modCode)
            div += 1
            
    all_mods = read_json('all_mods.json')
    for dict in all_mods:
        modCode = dict['moduleCode']
        potential = ['PC', 'CM', 'LSM', 'ZB']
        for pot in potential:
            if pot in modCode:
                CD_mods.append(modCode)

    target_mods = read_json('target_mods.json')
    target_mods['IDCD_mods']['CD_mods'] = CD_mods

    to_json(target_mods)

# step 5:

def step5():
    pass

ms = []
all_mods = read_json('all_mods.json')
for dict in all_mods:
    modCode = dict['moduleCode']
    if modCode[:4] == 'ST32':
        if 'ST328' in modCode:
            ms.append(modCode)

print(' '.join(ms))

