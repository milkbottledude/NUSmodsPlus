# Project: BAISmods

![image](progress_pics/baismods_banner.jpg)

## Overview 🔍
Welcome to Project: NUSmodsPlus!

Those who are familiar with NUSmods will know its a very useful tool for anything module related. It also lets you plan your module schedule for the whole 4 years you will spend in NUS.

However, its quite a hassle arranging the modules for the 4 years, as some modules have pre-requisite modules that you have to take prior. 

While NUSmods' planner does alert you when you try to place a module into planner without having done its pre-requisite mod, its rather buggy when BAIS modules are involved. Take a look at Figure a below:

<img src="progress_pics/Fig-a-missing_BAIS_mods_in_Planner.jpg" width="600">

Fig a: Missing module IS3109 in NUSmods planner feature

Thats because BAIS (Business Artificial Intelligence Systems) is a rather new degree, with its first batch of students entering just this year (academic year 2025/2026).

So while we will be using NUSmods' API to retrieve module details, we will be constantly referencing the official curriculum, which can be found at the [NUS BAIS website](https://www.comp.nus.edu.sg/programmes/ug/bais/curr/), and filling in any information gaps that surface.

Additionally, when wanting to take minors or majors using UEs (unrestricted electives), it would help to know which minors/majors have double-counted mods, as overlapping mods would make these minors or majors easier to complete.

Of course, it would also be helpful to see what minors and majors the user is **not** eligible to take due to **exceeding** the max number of double-count module units (8 units for minors, 16 for majors).

One more advantage BAISmods will have over NUSmods, besides the fact that we will have the most up to date information on BAIS modules, is that BAISmods is ONLY for BAIS students.

This means users dont have to look for what modules they need to take to clear their common requirements. Users don't have to surf through the BAIS curriculum to see what the degree's core modules are. Users don't have to see what mods are included in the programme elective courses.

Users don't have to do unnecessary searching, users save time. Users happy :)

**In summary**, what BAISmods can do (that NUSmods can't) is:

1) Tell user what mods they have to take to clear requirements (for common curriculum, core, and programme electives)
1) Tell user if they have not completed the pre-requisite of the BAIS module they wish to take
2) Tell user which majors/minors they have partially completed based on prior completed modules
3) Tell user which majors/minors and modules they are **not** eligible for
4) Tell user if their chosen programme electives are acceptable (eg: < 3 courses above level 4k)
  - ![Fig-ITSOVER4THOUSAND](progress_pics/Fig-b-programme_elective_req.jpg)

5) (potential) arrange mods for u over 4 years, with criteria like:
  - how many core mods does user want to do per sem
  - how many pillar mods does user want to do per sem
