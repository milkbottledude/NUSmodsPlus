const core_mods = [
    "CS1010A",
    "IS1108",
    "BT1101",
    "BT2102",
    "CS2030",
    "CS2040",
    "IS2101",
    "IS2108",
    "IS2109",
    "IS3103",
    // "Ind_XP_req/CP4101",
    "IS4108",
    "MA1521",
    "MA1522",
    "ST2334"
]

localStorage.setItem('core_mods', JSON.stringify(core_mods))

const DigBiz_button = document.querySelector('#dropButDigBiz')
const DigBiz_list = document.querySelector('#dropDigBiz')

DigBiz_button.addEventListener('click', function() {
    if (DigBiz_list.style.display === 'flex') {
        DigBiz_list.style.display = 'none'
    } else {
        DigBiz_list.style.display = 'flex'
    }
})

const FinTec_button = document.querySelector('#dropButFinTec')
const FinTec_list = document.querySelector('#dropFinTec')

FinTec_button.addEventListener('click', function() {
    if (FinTec_list.style.display === 'flex') {
        FinTec_list.style.display = 'none'
    } else {
        FinTec_list.style.display = 'flex'
    }
})

const ITSol_button = document.querySelector('#dropButITSol')
const ITSol_list = document.querySelector('#dropITSol')

ITSol_button.addEventListener('click', function() {
    if (ITSol_list.style.display === 'flex') {
        ITSol_list.style.display = 'none'
    } else {
        ITSol_list.style.display = 'flex'
    }
})

const AISol_button = document.querySelector('#dropButAISol')
const AISol_list = document.querySelector('#dropAISol')

AISol_button.addEventListener('click', function() {
    if (AISol_list.style.display === 'flex') {
        AISol_list.style.display = 'none'
    } else {
        AISol_list.style.display = 'flex'
    }
})

const ITBiz_button = document.querySelector('#dropButITBiz')
const ITBiz_list = document.querySelector('#dropITBiz')

ITBiz_button.addEventListener('click', function() {
    if (ITBiz_list.style.display === 'flex') {
        ITBiz_list.style.display = 'none'
    } else {
        ITBiz_list.style.display = 'flex'
    }
})

const ITSec_button = document.querySelector('#dropButITSec')
const ITSec_list = document.querySelector('#dropITSec')

ITSec_button.addEventListener('click', function() {
    if (ITSec_list.style.display === 'flex') {
        ITSec_list.style.display = 'none'
    } else {
        ITSec_list.style.display = 'flex'
    }
})

// dynamically adding pre-reqs to html from all_mods.json
let all_mods_dict;
const all_mods_pr = {}
const all_mods_rf = {}
let IDCD_mods;
localStorage.setItem('pe_mods', JSON.stringify({}))
const selected_mods = new Set(JSON.parse(localStorage.getItem('core_mods')))
console.log(selected_mods)
const all_mod_buttons = document.querySelectorAll('.select_mod')
const all_pe_mods = new Set()


const pullMods = async () => {
    const raw = await fetch('/jsons/all_mods.json')
    all_mods_dict = await raw.json()
    const raw2 = await fetch('/jsons/target_mods.json')
    const target_mods = await raw2.json()
    IDCD_mods = target_mods['IDCD_mods']
}

pullMods().then(() => {
    all_mod_buttons.forEach(mod_button => {
        const mod_code = mod_button.textContent
        all_pe_mods.add(mod_code)
        // pre_req
        pre_req_array = all_mods_dict[mod_code]['pre_reqs']
        all_mods_pr[mod_code] = {'%': []}
        let x = 0
        for (const str of pre_req_array) {
            if (str[0] === '!') {
                const mods = str.split(' ').slice(1)
                x += mods.length
                all_of_dict = {}
                mods.forEach(mod => {
                    all_of_dict[mod] = false
                })
                all_mods_pr[mod_code]['!'] = all_of_dict
            } else {
                x++
                if (str[0] === '%') {
                    const mods = str.split(' ').slice(1, -1)
                    one_of_dict = {}
                    mods.forEach(mod => one_of_dict[mod] = false)
                    all_mods_pr[mod_code]['%'].push(one_of_dict)
                } else if (str[0] === '?') {
                    const ting = str.slice(2)
                    all_mods_pr[mod_code]['?'] = {ting: false}
                    x = '?'
                }
            }
        }
        // dynamically changing x here
        const mod_dict = all_mods_pr[mod_code]
        let remove = 0
        for ([key, value] of Object.entries(mod_dict)) {
            if (key === '!') {
                Object.keys(value).forEach(mod1 => {
                    if (selected_mods.has(mod1)) {
                        value[mod1] = true
                        remove++
                    }
                })
            } else if (key === '%') {
                value.forEach(childDict => {
                    let case_remove = false
                    Object.keys(childDict).forEach(mod2 => {
                        if (selected_mods.has(mod2)) {
                            childDict[mod2] = true
                            case_remove = true
                        }
                    })
                    if (case_remove) {
                        remove++
                    }
                })
            }
        }
        if (x !== '?') {
            x -= remove
        }
        const pr_NA = document.querySelector(`#pr_${mod_code}`)
        pr_NA.textContent = `prereqs left: ${x}`
        if (x === 1) {
            pr_NA.style.backgroundColor = 'yellow'
            pr_NA.style.color = 'black'
        } else if (x === 2) {
            pr_NA.style.backgroundColor = 'rgba(245, 51, 34, 1)'
            pr_NA.style.color = 'aliceblue'
        } else if (x > 2) {
            pr_NA.style.backgroundColor = 'red'
            pr_NA.style.color = 'aliceblue'
        } else if (x === 0) {
            pr_NA.style.backgroundColor = 'rgb(36, 137, 20)'
            pr_NA.style.color = 'aliceblue'          
        } else if (x === 0) {
            pr_NA.style.backgroundColor = 'black'
            pr_NA.style.color = 'aliceblue'          
        }
        // all_mods_pr[mod_code] = pre_req_array
        // req_for
        req_for_arr = all_mods_dict[mod_code]['req_for']
        all_mods_rf[mod_code] = req_for_arr
    })
}).then(console.log(all_mods_pr))


// for green circle status + counting no. of mods and no. of 4ks
const notice_div = document.querySelector('.not_done_notice')
let total_chosen = []
let chosen_4ks = 0
all_mod_buttons.forEach(mod_button => {
    mod_button.addEventListener('click', function() {
        const mod_code = mod_button.textContent
        const mod_status = document.querySelector(`#${mod_code}_status`)
        const unfilt_req_fors = all_mods_rf[mod_code]
        const req_fors = unfilt_req_fors.filter(val => all_pe_mods.has(val))
        if (mod_status.style.display === '') {
            if (total_chosen.length === 5) {
                notice_div.textContent = 'You have already selected 5 mods'
                notice_div.style.display = 'flex'
                setTimeout(() => {
                    notice_div.style.display = 'none'
                }, 1900)
            } else {
                console.log(`${mod_code} selected`)
                mod_status.style.display = 'flex'
                total_chosen.push(mod_code)
                if (mod_button.classList[1] === 'lvl_4k') {
                    chosen_4ks++
                    console.log('4K ADDEDDDDDDDDDDD')
                }
                // now time to update localStorage and 'x'
                console.log(req_fors)
                req_fors.forEach(parentMod => {
                    let x;
                    let pr_tag = document.querySelector(`#pr_${parentMod}`)
                    for (let [key, val] of Object.entries(all_mods_pr[parentMod])) {
                        if (key === '!') {
                            if (Object.keys(val).includes(mod_code)) {
                                x = Number(pr_tag.textContent.slice(-1)) - 1
                                pr_tag.textContent = `prereqs left: ${x}`
                                val[mod_code] = true
                            }
                        } else if (key === '%') {                           
                            val.forEach(childDict => {
                                if (Object.keys(childDict).includes(mod_code)) {
                                    if (!Object.values(childDict).some(Boolean)) {
                                        console.log(parentMod)
                                        x = Number(pr_tag.textContent.slice(-1)) - 1   
                                        pr_tag.textContent = `prereqs left: ${x}`
                                    }
                                    childDict[mod_code] = true
                                }                                
                            })
                        }
                    }
                    if (x === 1) {
                        pr_tag.style.backgroundColor = 'yellow'
                        pr_tag.style.color = 'black'
                    } else if (x === 2) {
                        pr_tag.style.backgroundColor = 'rgba(245, 51, 34, 1)'
                        pr_tag.style.color = 'aliceblue'
                    } else if (x > 2) {
                        pr_tag.style.backgroundColor = 'red'
                        pr_tag.style.color = 'aliceblue'
                    } else if (x === 0) {
                        pr_tag.style.backgroundColor = 'rgb(36, 137, 20)'
                        pr_tag.style.color = 'aliceblue'          
                    } else if (x === 0) {
                        pr_tag.style.backgroundColor = 'black'
                        pr_tag.style.color = 'aliceblue'          
                    }
                })
            }
        } else {
            mod_status.style.display = ''
            total_chosen = total_chosen.filter(mod => mod !== mod_code)
            req_fors.forEach(parentMod => {
                let pr_tag = document.querySelector(`#pr_${parentMod}`)
                let x;
                for (let [key, val] of Object.entries(all_mods_pr[parentMod])) {
                    if (key === '!') {
                        if (Object.keys(val).includes(mod_code)) {
                            x = Number(pr_tag.textContent.slice(-1)) + 1
                            pr_tag.textContent = `prereqs left: ${x}`
                            val[mod_code] = false
                        }
                    } else if (key === '%') {                           
                        val.forEach(childDict => {
                            if (Object.keys(childDict).includes(mod_code)) {
                                childDict[mod_code] = false
                                if (!Object.values(childDict).some(Boolean)) {
                                    x = Number(pr_tag.textContent.slice(-1)) + 1   
                                    pr_tag.textContent = `prereqs left: ${x}`
                                }
                            }                                
                        })
                    }
                }
                if (x === 1) {
                    pr_tag.style.backgroundColor = 'yellow'
                    pr_tag.style.color = 'black'
                } else if (x === 2) {
                    pr_tag.style.backgroundColor = 'rgba(245, 51, 34, 1)'
                    pr_tag.style.color = 'aliceblue'
                } else if (x > 2) {
                    pr_tag.style.backgroundColor = 'red'
                    pr_tag.style.color = 'aliceblue'
                } else if (x === 0) {
                    pr_tag.style.backgroundColor = 'rgb(36, 137, 20)'
                    pr_tag.style.color = 'aliceblue'          
                }
            })
            if (mod_button.classList[1] === 'lvl_4k') {
                chosen_4ks--
                console.log('4K REMOVEDDDDD')
            }
        }
    })    
})


// showing pre-reqs left when clicking the button
const pr_window = document.querySelector('.pr_window')
const pr_text = document.querySelector('.prs_left')
const open_prs = document.querySelectorAll('.pre_reqs')
const got_it = document.querySelector('.got_it')
console.log(Object.keys(all_mods_pr))

open_prs.forEach(open_pr => {
    open_pr.addEventListener('click', () => {
        const mod_code = open_pr.id.slice(3)
        const pre_reqs = all_mods_pr[mod_code]
        let pr_string = ''
        for (let [key, value] of Object.entries(pre_reqs)) {
            console.log(key, value)
            if (key === '!') {
                pr_string += '<div>All of: '
                Object.keys(value).forEach(pr => {
                    if (value[pr] === true) {
                        pr_string += `<span class="${pr}_window green_fn">${pr}</span> `
                    } else {
                        if (all_pe_mods.has(pr)) {
                            pr_string += `<span class="${pr}_window purple">${pr}</span> `
                        } else {
                            pr_string += `<span class="${pr}_window">${pr}</span> `
                        }
                    }
                })
                pr_string += '</div>'
            } else if (key === '%') {
                for (const dict of value) {
                    pr_string += `<div class="not_claimed ${mod_code}">One of: `
                    Object.keys(dict).forEach(pr => {
                        if (dict[pr] === true) {
                            // update true/false status here
                            pr_string += `<span class="${pr}_window green_fn">${pr} </span> `
                        } else {
                            if (all_pe_mods.has(pr)) {
                                pr_string += `<span class="${pr}_window purple">${pr} </span> `
                            } else {
                                pr_string += `<span class="${pr}_window">${pr} </span> `
                            }
                        }
                    })
                    pr_string += '</div>'              
                }
            } else if (key === '?') {
                let shld_hav = ''
                if (str.includes('MA1301')) {
                    shld_hav = "H2 Math"
                } else if (str.includes('CM1417')) {
                    shld_hav = "H2 Chemistry"
                } else if (str.includes('LSM1301')) {
                    shld_hav = "H2 Biology"
                }
                pr_string += `Have you taken ${shld_hav}? If not, \n One of ${str.slice(2)}`
            }
        }
        pr_text.innerHTML = pr_string
        pr_text.appendChild(got_it)
        pr_window.style.display = 'flex'
    })      
})

got_it.addEventListener('click', () => {
    pr_window.style.display = 'none'
})


// back button
const back_button = document.querySelector('.back_button')
const incomplete_prs = {}

back_button.addEventListener('click', () => {
    if (total_chosen.length !== 5) {
        notice_div.textContent = 'You have not selected 5 mods'
        notice_div.style.display = 'flex'
        setTimeout(() => {
            notice_div.style.display = 'none'
        }, 1900)
    } else if (chosen_4ks < 3) {
        notice_div.textContent = 'You need at least 3 courses at Level-4000'
        notice_div.style.display = 'flex'
        setTimeout(() => {
            notice_div.style.display = 'none'
        }, 1900)
    } else {
        localStorage.setItem('pe_mods', JSON.stringify(total_chosen))
        const selected_pe_mods = {}
        total_chosen.forEach(mod => {
            selected_pe_mods[mod] = all_mods_pr[mod]
        })
        localStorage.setItem('PE_mods', JSON.stringify(selected_pe_mods))
        for (let [key, value] of Object.entries(selected_pe_mods)) {
            for (let [sign, subVal] of Object.entries(value)) {
                if (sign === '!') {
                    for (let [mod, bool] of Object.entries(subVal)) {
                        if (bool === false) {
                            if (incomplete_prs[key]) {
                                incomplete_prs[key].push(mod)
                            } else {
                                incomplete_prs[key] = [mod]
                            }
                        }
                    }
                } else if (sign === '%') {
                    let to_add = []
                    subVal.forEach(childDict => {
                        if (!Object.values(childDict).some(Boolean)) {
                            let found = false
                            for (const pot of Object.keys(childDict)) {
                                if (IDCD_mods['ID_mods'].includes(pot) || IDCD_mods['CD_mods'].includes(pot)) {
                                    found = true
                                    to_add.push(pot)
                                    break
                                }
                            }
                            if (!found) {
                                to_add.push(Object.keys(childDict)[0])
                            }
                        }
                    })
                    if (incomplete_prs[key]) {
                        to_add.forEach(mod_add => incomplete_prs[key].push(mod_add))
                    } else {
                        to_add.forEach(mod_add => incomplete_prs[key] = [mod_add])
                    }
                }
            }
        }
        if (Object.keys(incomplete_prs).length > 0) {
            const groups = {
                'ID_mods': [],
                'CD_mods': [],
                'Others': []
            }
            pr_window.style.display = 'flex'
            const legend = document.querySelector('.legend')
            legend.style.display = 'none'
            // editing window
            let notif_string = '<div class="dont_worry" id="the_following">The following mods do not have their pre-reqs met:</div>'
            for (let [key, val] of Object.entries(incomplete_prs)) {
                notif_string += `<div>${key}:`
                val.forEach(pr => {
                    notif_string += `<span class="red"> ${pr}</span>`
                    let oth = 0
                    for (let [type, arr] of Object.entries(IDCD_mods)) {
                        if (arr.includes(pr)) {
                            groups[type].push(pr)
                        } else {
                            oth++
                        }
                    }
                    if (oth == 2) {
                        groups['Others'].push(pr)
                    }
                })
            }
            let grp = []
            for (let [type2, arr2] of Object.entries(groups)) {
                if (arr2.length > 0) {
                    grp.push(type2)
                }
            }
            grp = grp.join(' and ')
            notif_string += `<div class="dont_worry">We will add them to your selected modules as <span class="purple">${grp}</span> mods</div>`
            const got_it = document.querySelector('.got_it')
            pr_text.innerHTML = notif_string
            for (let [title, arr3] of Object.entries(groups)) {
                localStorage.setItem(title, JSON.stringify(arr3))
                console.log(title, arr3)
            }
            // changing got_it
            pr_text.appendChild(got_it)
            got_it.addEventListener('click', () => {
                window.location.href = "/" 
            })
        } else {
                window.location.href = "/"        
        }

    }
})