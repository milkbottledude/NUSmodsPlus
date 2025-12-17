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
        to_json(data, json_filepath)

# step 1: getting all the courses that fulfill the 4+2 pillars 

pillar_mods = {
    'GEX': [],
    'GEC': [],
    'GES': [],
    'GEN': [],
}

# saving all courses so I don't have to call everytime and overload the api
# from_api(api_link='https://api.nusmods.com/v2/2025-2026/moduleList.json', save_json=True, json_filepath='all_mods.json')
from_api(api_link='https://api.nusmods.com/v2/2025-2026/modules/IS3103.json', save_json=True, json_filepath='testAPI.json')



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

# step 5: moving info in minors.txt to target_mods.json

def step5():
    minor_mods = {}
    with open('minors.txt', 'r') as f:
        paragraphs = f.read().split('\n\n')
        for para in paragraphs:
            lines = para.split('\n')
            minor = lines.pop(0)[2:]
            print(minor)
            minor_mods[minor] = lines

    target_json = read_json('target_mods.json')
    target_json['minor_mods'] = minor_mods
    to_json(target_json)

# step 6: Configuring the 'pre_reqs'(pt2) and 'req_fors'(pt1) for each mod

def step6pt1():
    all_mods = read_json('all_mods.json')
    for dict in all_mods:
        dict['req_for'] = []
    for mod1 in all_mods:
        code = mod1['moduleCode']
        for mod2 in all_mods:
            if 'prerequisite' in mod2:
                pre_req_str = mod2['prerequisite']
                if code in pre_req_str:
                    mod1['req_for'].append(mod2['moduleCode'])


def step6pt2():
    prereq_dict = {}
    all_mods = read_json('all_mods.json')
    for obj in all_mods:
        req_for = obj['req_for']
        for mod_str in req_for:
            if mod_str in prereq_dict:
                prereq_dict[mod_str].append(obj['moduleCode'])
            else:
                prereq_dict[mod_str] = [obj['moduleCode']]

    for obj in all_mods:
        modCode = obj['moduleCode']
        if modCode in prereq_dict:
            prereq = prereq_dict[modCode]
            obj['pre_reqs'] = prereq
        else:
            obj['pre_reqs'] = []
    to_json(all_mods, 'all_mods.json')




