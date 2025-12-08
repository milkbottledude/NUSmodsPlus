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

