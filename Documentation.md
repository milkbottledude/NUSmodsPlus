![image](progress_pics/baismods_banner.jpg)

Feel free to skip ⏭️ to any chapters or versions that interest you 😊.

## Table of Content 📖
Chapter 1: Syncing with NUSmods
- 1.1: [Getting to know the API](#11-getting-to-know-the-api) 
- 1.2: [Modules for 6 Pillars](#12-modules-for-6-pillars) 
- 1.3: [](#13-) 
- 1.4: [](#14-)


Chapter 2: Common Curriculum
- 2.1: [](#21-)
- 2.2: [](#22-)
- 2.3: [](#23-)

Chapter 3: Programme Electives
- 3.1: [](#31-)

Chapter 4: Unrestricted Electives
- 4.1: [](#41-)



## 📚 Documentation

## Chapter 1 - Syncing with NUSmods

### 1.1: Getting to know the API

First, we need to figure out how the NUSmods API functions, and how we can use it for our purposes. There are 2 main ways we can use it:

1) Calling individual modules
    - While this method is limited as you can only call modules one at a time, it gives you a more detailed description of the module. It gives information such as its pre-requisites, workload, module credits, and many more.

    ```
    API link: 'https://api.nusmods.com/v2/2025-2026/modules/CS2030.json'

    Output:
    
    {
    "acadYear": "2025/2026",
    "preclusion": "If undertaking an Undergraduate DegreeTHEN( must not ...
    "preclusionRule": "PROGRAM_TYPES IF_IN Undergraduate Degree THEN (COURSES (1)...
    "description": "This course is a follow up to CS1010. It explores two modern programming...
    "title": "Programming Methodology II",
    "additionalInformation": "",
    "department": "Computer Science",
    "faculty": "Computing",
    "workload": [
        2,
        1,
        2,
        3,
        2
    ],
    "gradingBasisDescription": "Graded",
    "prerequisite": "If undertaking an Undergraduate DegreeTHEN( must have completed 1 of CS1010...
    "prerequisiteRule": "PROGRAM_TYPES IF_IN Undergraduate Degree THEN (COURSES (1) CS1010:D...
    "moduleCredit": "4",
    "moduleCode": "CS2030",
    "attributes": {
        "mpes1": true,
        "mpes2": true
    },
    "semesterData": [
        {
        "semester": 1,
        "timetable": [
            {
            "classNo": "10A",
            "startTime": "1000",
            "endTime": "1200",
            "weeks": [
                3,
                4,
                5,
                6,
    
    ...1134 more lines
    ```
    
    As you can see, its a lot of information. Much more than what this project requires, so we will only be taking what we need.

2) Calling all modules in a specified academic year
    - Like mentioned above, it provides an array containing every single module available for that year. However, it does not provide as much detailed information as the first method, just a brief lowdown.

    ```
    API link: 'https://api.nusmods.com/v2/2025-2026/moduleList.json'

    Output:

    [
    {
        "moduleCode": "ABM5001",
        "title": "Leadership in Biomedicine",
        "semesters": [
        3
        ]
    },
    {
        "moduleCode": "ABM5002",
        "title": "Advanced Biostatistics for Research",
        "semesters": [
        2
        ]
    },
    {
        "moduleCode": "ABM5004",
    
    ...51,354 more lines
    ```

    The information provided for each module is much less, but the json contains the entirety of NUS's module list for the 2025/2026 academic year.

Common API etiquette is not overloading the API link with many requests at a time. To prevent this, I'll be storing the 2025/26 year's module list into a JSON file. 

I'll also store a sample module's (CS2030) information, so I know what information I get when I call the NUSmods API using the first method.

First, lets create a function that can call the API, convert the response to JSON data, and save that data in a JSON file.

```
def from_api(api_link, save_json=False, json_filepath = 'testAPI.json'):
    response = requests.get(api_link)
    data = response.json()

    if save_json:
        with open(json_filepath, 'w') as f:
            json.dump(data, f, indent=2)
            print('saved to json')
```

Great, now we can store the data retrieved from the API calls.

```
from_api(api_link='https://api.nusmods.com/v2/2025-2026/modules/CS2030.json', save_json=True)

from_api(api_link='https://api.nusmods.com/v2/2025-2026/moduleList.json', save_json=True, json_filepath='all_mods.json')
```

Now that we are acquainted with the API, we can start diving deeper into the modules, starting with those in the 6 pillars. 

### Chapter 1.2: Modules for 6 Pillars

One thing all NUS students have to do, regardless of degree, is fulfill the 6 University pillars. To fulfill a pillar, you have to do at least 1 module from that pillar. 

For BAIS students, the 'Digital Literacy' and 'Computing Ethics' pillar is fulfilled from doing *CS1010A* and *IS1108* respectively. For the other 4 pillars, they are free to choose from the wide selection of modules the pillar offers.

To sift the unique pillars out, we can check their prefixes and assign them to their parent pillar. 

```
all_mods_list = read_json('all_mods.json')

pillar_mods = {
    'GEX': [],
    'GEC': [],
    'GES': [],
    'GEN': [],
}
```

We begin with getting the entire module list from the JSON file we saved in the previous commit. I also define a dictionary to organise the pillar modules.

```
for mod in all_mods_list:
    modCode = mod['moduleCode']
    prefix = modCode[:3]
    if prefix in pillar_mods:
        pillar_mods[prefix].append(modCode)

pillar_mods['default'] = ['CS1010A', 'IS1108']

to_json('target_mods.json', [pillar_mods])
```

Then, I loop through all the modules in the 2025/26 year and check the first 3 characters of the module code. If it corresponds with any of the dictionary keys, I append the module to the list.

After filling the lists of the 4 non-computing pillars, I make a separate key 'default' and add the 2 default pillar modules to its list. Lastly, I save the dictionary as a JSON file. 

```
[
  {
    "GEX": [
      "GEX1000",
      "GEX1003",
      ...
    ],
    "GEC": [
      "GEC1001",
      "GEC1002",
      ...
    ],
    "GES": [
      "GES1002",
      "GES1002T",
      "GES1003",
      ...
    ],
    "GEN": [
      "GEN2000",
      "GEN2001",
      ...
    ],
    "default": [
      "CS1010A",
      "IS1108"
    ]
  }
]
```

Notice how I save it as an array. This is because we will be adding more dictionaries to the JSON file, which will take care of programme elective (PE) and unrestricted elective (UE) modules, etc.

##### shld i do nested dicts for lvl 1k and 2k pillar mods??? hmmm

### Chapter 1.3: Core and Programme Elective Modules

Next, we need to add all the BAIS core modules to the target modules JSON. Nothing too technical here, just copy pasting the module names from the NUS BAIS website curriculum.

After some thought, I've decided not to save the target modules as an array, but rather as a dictionary to make it more organised.

```
target_mods_list = read_json('target_mods.json')
target_mods_list = target_mods_list[0]
target_mods = {
    'pillar_mods': target_mods_list,
    'core_mods': ['BT2102', 'CS2030', 'CS2040', 'IS2101', 'IS2108', 'IS2109', 'IS3103', 'Ind_XP_req/CP4101', 'IS4108', 'MA1521', 'MA1522', 'ST2334']
}
to_json('target_mods.json', target_mods)
```

After calling the list of target mods, I extracted the dictionary from the array, then replaced the array with a dictionary 'target_mods'. 

I added the key 'core_mods' and its array values, then wrote the new target_mods JSON back to its file. Now we need to do the same for the PE mods, which is slightly more troublesome.

First, I copied the PE mods from the NUS website:

```
PE_string = '''
Digital Business
IS3150 Digital Media Marketing
...

Financial Technology
IS4226 Systematic Trading Strategies and Systems
...

IT Solutioning
CS2105 Introduction to Computer Networks
...

AI Solutioning
BT3017 Feature Engineering for Machine Learning
...

IT Business Innovation and Entrepreneurship
CP3100 Information Systems and Analytics Research Methodology
...

IT Security and Legal Aspects
CS2107 Introduction to Information Security
...
'''.strip()
```

The ''' is used for multi-line strings in python, and the '.strip()' at the end removes any unwanted '/n' at the start or end of the string.

```
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
```

PE_groups is an array of module groups, grouped by 'Digital Business', 'Financial Technology', etc. Then, I loop through each group and split them further using split('\n').

This makes the first value in the split group list the title, and the rest of the values are the modules. To just get the module codes without the module names, I split the modules using the spacings with split(' ') and singled out the first value, which would be the module code.

I attach the list of module codes as the value to the group title key in the dictionary 'PE_mods'. When I'm done doing this for all the groups, I add the dictionary to 'target_mods' and save it back to the JSON file.

### Chapter 1.4: Unrestricted Modules




