# Project: BAISmods

![image](progress_pics/baismods_banner.jpg)

- [Overview](#overview-)
- [How to Use](#how-to-use-)

## Overview 🔍
Welcome to Project: NUSmodsPlus!

Those who are familiar with NUSmods will know its a very useful tool for anything module related. It also lets you plan your module schedule for the whole 4 years you will spend in NUS.

However, its quite a hassle arranging the modules for the 4 years, as some modules have pre-requisite modules that you have to take prior. 

While NUSmods' planner does alert you when you try to place a module into planner without having done its pre-requisite mod, its rather buggy when BAIS modules are involved. Take a look at Figure a below:

<img src="progress_pics/Fig-a-missing_BAIS_mods_in_Planner.jpg" width="600">

**Fig a**: Missing module IS3109 in NUSmods planner feature

Thats because BAIS (Business Artificial Intelligence Systems) is a rather new degree, with its first batch of students entering just this year (academic year 2025/2026).

So while we will be using NUSmods' API to retrieve module details, we will be constantly referencing the official curriculum, which can be found at the [NUS BAIS website](https://www.comp.nus.edu.sg/programmes/ug/bais/curr/), and filling in any information gaps that surface.

Additionally, when wanting to take minors or majors using UEs (unrestricted electives), it would help to know which minors/majors have double-counted mods, as overlapping mods would make these minors or majors easier to complete.

Of course, it would also be helpful to see what minors and majors the user is **not** eligible to take due to **exceeding** the max number of double-count module units (8 units for minors, 16 for majors).

One more advantage BAISmods will have over NUSmods, besides the fact that we will have the most up to date information on BAIS modules, is that BAISmods is ONLY for BAIS students.

This means users dont have to look for what modules they need to take to clear their common requirements. Users don't have to surf through the BAIS curriculum to see what the degree's core modules are. Users don't have to see what mods are included in the programme elective courses.

Users don't have to do unnecessary searching, users save time. Users happy :)

**In summary**, what BAISmods can do (that NUSmods can't) is:

1) Tell user what mods they have to take to clear requirements (for pillar modules and programme electives)
1) Tell user if they have not completed the pre-requisite of the BAIS module they wish to take
2) Tell user which majors/minors they have partially completed based on prior completed modules
3) Tell user if their chosen programme electives are acceptable (eg: < 3 courses above level 4k)
  - ![Fig-ITSOVER4THOUSAND](progress_pics/Fig-b-programme_elective_req.jpg)

4) Arrange mods for the user over their 4 years, with features such as:
  - letting user choose which semesters they want to overload (except Y1S1, Y4S1 & Y4S2)
  - Automatically arranges user's mods in the sems based on whether their pre-requisites are completed
  - Also puts higher priority mods in earlier sems

## How to Use 🤔

The BAISmods webapp has 5 stages:

![Fig-c](progress_pics/Fig-c-5_stages_base.jpg)

**Fig c**: 5 stages of the BAISmods webapp experience

#### 1) Pillar Mods

- Fairly straightforward, just go inside and pick one GE mod of your liking from each GE category. Once done, you can press the back button on the top left.

![Fig-d](progress_pics/Fig-d-stage1_pillar_mods.gif)

- When you go back, you will notice some changes. The 'selected mods' bar in the top left is a quarter green, and the 'pillar mods' tile is fully green. Thats because you have completed Stage 1.

![Fig-e](progress_pics/Fig-e-green_fn.jpg)

- You can also click into the 'selected mods' bar to see what modules you have selected so far. When done, just click the 'ok' button.

![Fig-f](progress_pics/Fig-f-checking_selected_mods.jpg)


#### 2) Programme Electives

- When you enter the PE mods tile, you can choose up to 5 mods. The webapp will prevent you from exiting if you 1. have not chosen 5 mods, or 2. have not chosen 3 mods of at least level 4000.

![Fig-g](progress_pics/Fig-g-PE_restrictions.gif)

- Some of the mods also serve as pre-requisites to others. This updates in real time, as you can see below: When I select IS2102, which is a pre-requisite to IS4100 and IS4234, their pre-requisite number decreases.

![Fig-h](progress_pics/Fig-h-PE_pr_req_decrease.gif)

- After selecting your 5 PE mods and clicking 'back', the webapp will alert you to any undone pre-requisites and auto add them to your module selection as *unrestricted elective* mods.

![Fig-i](progress_pics/Fig-i-back_and_auto.gif)

- **Additionally**, if any of the pre-requisites are *IDCD* mods, they will be added under that category instead of as a UE mod, saving your UE credits and filling up the IDCD requirement.

![Fig-j](progress_pics/Fig-j-IS1128_as_ID.gif)

#### 3) Unrestricted Electives

![Fig-k](progress_pics/Fig-k-ue_page.jpg)

- The UE mods tile allows you to choose what UE mods to fill up your 40 credits, be it minors or languages, or just individual mods (Others). Majors are still currently in the works, hence why its greyed out.

- You can also see how many more credits you have left until you fulfill the BAIS UE mods minimum requirements at the bottom of the screen. If you recall, one of the PE mods had a pre-requisite which was assigned as a UE mod under 'Others', hence the number is *36* and not 40.

**Part 1: Languages**

![Fig-l](progress_pics/Fig-l-languages.gif)

- Here you can choose from 12 languages of varying levels. Most languages offer 6 levels but there are exceptions, with Korean offering up to 8 levels and Tamil offering a measly 2 levels.

- You can choose a maximum of 2 languages. For this webapp demonstration, I'll just be going with 1 language, Spanish level 5, as an example.

![Fig-m](progress_pics/Fig-m-after_languages.jpg)

- Upon exiting, you can see that the UE credits remaining has decreased.

**Part 2: Minors**

![Fig-n]

- In the Minors page, the number of mods required for each minor is displayed on the right of each minor tile, some with smaller mod requirements than others which could be due to double counting. 

- For example, since Interactive Media Development (IMD) requires a CS1010 variant, and BAIS curriculum already has CS1010A as a core module, it can be double counted, reducing what was initially 4 modules to complete for the IMD minor, to now 3.

![Fig-o]

- Inside each tile, the requirements for each minor is shown in greater detail. Pressing the 'All of' tiles will drop down an array of mods, all of which you are required to take to fulfill the minor. As for the '*x* of' tiles, where *x* is a number, you need only select *x* number of mods from the dropdown window.

- Similar to the PE mods page, the number of pre-requisites for each mod is also shown below it. The undone pre-requisites will also be flashed to you prior to exiting the page, and will be auto added to your module selection as either 'IDCD' mods or 'Others' mods.

- For this demonstration, I will be choosing the 'Psychology' minor.


#### 4) IDCD modules (if IDCD requirement has not been fulfilled)



#### 5) Mod to Sem Timetable Generator



