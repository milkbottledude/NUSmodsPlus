# CS1010A [Group: BAIS]
# BT1101  [Group: BAIS]
# GEX1000 [Group: MISC]
# GEC1017 [Group: MISC]
# GES1005 [Group: MISC]
# GEN2000 [Group: MISC]
# IS1108 [Group: BAIS]

# ID / CD Courses (12)
# ID2116 [Group: MISC]
# ID2122 [Group: MISC]
# IS2218 [Group: BAIS]

# BAIS CORE MODULES (60 units) [Group: BAIS]
# BT2102 [Group: BAIS]
# CS2030 [Group: BAIS]
# CS2040 [Group: BAIS]
# IS2101 [Group: BAIS]
# IS2108 [Group: BAIS]
# IS2109 [Group: BAIS]
# IS3103 [Group: BAIS]
# MA1521 [Group: BAIS]
# MA1522 [Group: BAIS]
# ST2334 [Group: BAIS]
# Industry Experience Requirement (Internship / ATAP) [Group: BAIS]
# IS4108 AI Solutioning Capstone Project [Group: BAIS]

# BAIS PROGRAMME ELECTIVES (20 units)
# IS2102 [Group: BAIS]
# IS3109 [Group: BAIS]
# IS4234 [Group: BAIS]
# IS4236 [Group: BAIS]
# IS4233 [Group: BAIS]

# BAIS UEs for Minor in Statistics
# ST1131 [Group: MISC]
# ST2137 [Group: MISC]
# ST3131 [Group: MISC]

# (Extra 2 UEs)
# BT3103 [Group: BAIS]
# SH5104 [Group: MISC]

from fetch import read_json, to_json

all_mods = read_json('all_mods.json')

# new_allmods = {}
# for obj in all_mods:
#     key = obj['moduleCode']
#     new_allmods[key] = obj

# to_json(new_allmods, 'all_mods.json')

MISC_grp = ['GEX1000', 'GEC1017', 'GES1005', 'GEN2000', 'ID2116', 'ID2122', 'ST1131', 'ST2137', 'ST3131', 'SH5104']
reqfor_count = {}
for mod in MISC_grp:
    reqfor_count[mod] = []
    for check in all_mods[mod]['req_for']:
        if check in MISC_grp:
            reqfor_count[mod].append(check)

for key, array in reqfor_count.items():
    print(key, array)