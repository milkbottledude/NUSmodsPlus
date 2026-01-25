const to_add_x = JSON.parse(localStorage.getItem('sems_add_x'))
if (!to_add_x) {
    console.log('nigga')
    const loadings = document.querySelectorAll('.green_bg')
    loadings.forEach(load => {
        if (load.textContent === 'loading..') {
            load.textContent = 'ERROR'
            load.classList.remove('green_bg')
            load.classList.add('orangered_bg')
            
        }
    })
}

const reset_button = document.querySelector('.back_button')
reset_button.addEventListener('click', () => {
    localStorage.clear()
    window.location.href = '/'
})

const sems_x = {
    'sem_1': 5,
    'sem_2': 5 + to_add_x['2'],
    'sem_3': 5 + to_add_x['3'],
    'sem_4': 5 + to_add_x['4'],
    'sem_5': 5 + to_add_x['5'],
    'sem_6': 5 + to_add_x['6'],
    'sem_7': 2,
    'sem_8': 3
}

// const misc_x = {
//     'sem_1': 
// }

const all_sem_titles = document.querySelectorAll('.sem_title')
all_sem_titles.forEach(sem_title => {
    let x_span = sem_title.firstElementChild
    x_span.textContent = sems_x[sem_title.id]
    if (sems_x[sem_title.id] === 6) {
        x_span.classList.add('yellow_bg')
    } else if (sems_x[sem_title.id] >= 7) {
        x_span.classList.add('orangered_bg')
    }
})


// Time to start allocating mods
const mod_to_sem = {
    'sem_1': ['CS1010A', 'IS1108', 'MA1521', 'BT1101'],
    'sem_2': ['BT2102', 'CS2030', 'CS2040'],
    'sem_3': ['IS2101', 'MA1522'],
    'sem_4': ['IS3103', 'ST2334'],
    'sem_5': ['IS2109', 'IS2108'],
    'sem_6': [], 
    'sem_7': [], // IER/CP4101
    'sem_8': [] // IS4108
}

// sort out Pillars first
const pillar_arr = Object.values(JSON.parse(localStorage.getItem('pillar_mods')))
mod_to_sem['sem_2'].unshift(pillar_arr.shift())
mod_to_sem['sem_3'].unshift(pillar_arr.shift())
mod_to_sem['sem_4'].unshift(pillar_arr.shift())
mod_to_sem['sem_5'].unshift(pillar_arr.shift())

// sort out LAN
const LAN_dict = JSON.parse(localStorage.getItem('languages'))

if (LAN_dict) {
    (async () => {
        const target_mods = await fetch('/jsons/target_mods.json').then(r => r.json())
        for (let [lan, lvl] of Object.entries(LAN_dict)) {
            for (let i = 0; i < lvl; i++) {
                mod_to_sem[`sem_${i+1}`].unshift(target_mods['language_mods'][lan][i])
            }
        }
    })()
}


// MISC and its pre_reqs and req_fors
let pre_reqs = {}
let req_fors = {}

const Others1 = JSON.parse(localStorage.getItem('Others'))
const ID_mods2 = JSON.parse(localStorage.getItem('ID_mods2'))
const CD_mods2 = JSON.parse(localStorage.getItem('CD_mods2'))
const PE_mods = Object.keys(JSON.parse(localStorage.getItem('PE_mods')))
const minors = Object.values(JSON.parse(localStorage.getItem('minors')))
let minor_mods = []
minors.forEach(dict => {
    Object.values(dict).forEach(arr => {
        arr.forEach(pot => {
            if (pot.length > 1) {
                minor_mods.push(pot)
            }
        })
    })
})
const Others2 = JSON.parse(localStorage.getItem('Others2')).filter(mod => !Others1.includes(mod) && !minor_mods.includes(mod))
const ID_mods3 = JSON.parse(localStorage.getItem('ID_mods3')).filter(mod => !ID_mods2.includes(mod))
const CD_mods3 = JSON.parse(localStorage.getItem('CD_mods3')).filter(mod => !CD_mods2.includes(mod))

let MISCs = [...Others1, ...ID_mods2, ...CD_mods2, ...PE_mods, ...Others2, ...minor_mods, ...ID_mods3, ...CD_mods3]

for (const mod_name of MISCs) {
    pre_reqs[mod_name] = null
    req_fors[mod_name] = null
}

(async () => {
    const all_mods_dict = await fetch('/jsons/all_mods.json').then(r => r.json())
    Object.keys(pre_reqs).forEach(mod_name => {
        pre_reqs[mod_name] = all_mods_dict[mod_name]['pre_reqs']
        req_fors[mod_name] = all_mods_dict[mod_name]['req_for'].filter(mod => MISCs.includes(mod))
    })
})()


//  function for checking pre_reqs
const checkprs = (pr_str) => {
    for (let sem_arr of Object.values(mod_to_sem)) {
        for (let mod of sem_arr) {
            if (pr_str.includes(mod)) {
                if (pr_str[0] === '!') {
                    pr_str = pr_str.replaceAll(mod, '')
                } else if (pr_str[0] === '%') {
                    pr_str = pr_str.replaceAll(mod, '')
                    let num = Number(pr_str.slice(-1)) - 1
                    if (num === 0) {
                        return null
                    } else {
                        pr_str = pr_str.slice(0, -1) + num
                    }
                }
            }
        }
    }
    if (pr_str[0] === '!') {
        if (pr_str.length <= 2) {
            return null
        }
    }
    return pr_str
}

setTimeout(() => {
    req_fors = Object.fromEntries(
        Object.entries(req_fors).sort(([, arrA], [, arrB]) => arrB.length - arrA.length)
    )
}, 1000)

// function for choosing MISCs each sem
const eachSem = (sem_key) => {
    let add_misc = sems_x[sem_key] - mod_to_sem[sem_key].length
    for (let [key, val] of Object.entries(pre_reqs)) {
        let new_val = []
        val.forEach(pr_str => {
            let to_add = checkprs(pr_str)
            if (to_add) {
                if (to_add.trim().length > 1) {
                    new_val.push(to_add)
                }
            }
        })
        pre_reqs[key] = new_val
    }
    let more_mods = []
    for (const mod_code of Object.keys(req_fors)) {
        if (add_misc > 0) {
            if (pre_reqs[mod_code].length === 0) {
                more_mods.push(mod_code)
                add_misc--
            }
        } else {
            break
        }
    }
    more_mods.forEach(mod_name => delete req_fors[mod_name])
    mod_to_sem[sem_key] = [...mod_to_sem[sem_key], ...more_mods]
}

setTimeout(() => {
    mod_to_sem['sem_7'].push('IER/CP4101')
    mod_to_sem['sem_8'].push('IS4108 CAP')    
    Object.keys(mod_to_sem).forEach(sem_key => {
        console.log(sem_key)
        eachSem(sem_key)
        const sem_container = document.querySelector(`#${sem_key}_container`)
        let mod_html = ''
        mod_to_sem[sem_key].forEach(mod => mod_html += `<div class="mod_in_sem">${mod}</div>`)
        sem_container.innerHTML = mod_html
    })
}, 1000)







