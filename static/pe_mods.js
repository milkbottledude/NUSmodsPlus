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


// for green circle status + counting no. of mods and no. of 4ks

const all_mod_buttons = document.querySelectorAll('.select_mod')
const notice_div = document.querySelector('.not_done_notice')

let total_chosen = []
let chosen_4ks = 0

all_mod_buttons.forEach(mod_button => {
    mod_button.addEventListener('click', function() {
        const mod_code = mod_button.textContent
        const mod_status = document.querySelector(`#${mod_code}_status`)
        if (mod_status.style.display === '') {
            if (total_chosen.length === 5) {
                notice_div.textContent = 'You have already selected 5 mods'
                notice_div.display = 'flex'
            } else {
                mod_status.style.display = 'flex'
                total_chosen.push(mod_code)
                if (mod_button.classList[1] === 'lvl_4k') {
                    chosen_4ks++
                    console.log('4K ADDEDDDDDDDDDDD')
                }
            }
        } else {
            mod_status.style.display = ''
            total_chosen = total_chosen.filter(mod => mod !== mod_code)
            if (mod_button.classList[1] === 'lvl_4k') {
                chosen_4ks--
                console.log('4K REMOVEDDDDD')
            }
        }
    })    
})

// back button
const back_button = document.querySelector('.back_button')

back_button.addEventListener('click', () => {
    if (total_chosen.length !== 5) {
        notice_div.textContent = 'You have not selected 5 mods'
        notice_div.style.display = 'flex'
    } else if (chosen_4ks < 3) {
        notice_div.textContent = 'You need at least 3 courses at Level-4000'
        notice_div.style.display = 'flex'
    } else {
        localStorage.setItem('pe_mods', JSON.stringify(total_chosen))
        window.location.href = "base.html"        
    }
})

// dynamically adding pre-reqs to html from all_mods.json
let all_mods_dict;
const all_mods_pr = {}
const all_mods_rf = {}

const pullMods = async () => {
    const raw = await fetch('../jsons/all_mods.json')
    all_mods_dict = await raw.json()
}

pullMods().then(() => {
    all_mod_buttons.forEach(mod_button => {
        const mod_code = mod_button.textContent
        // pre_req
        pre_req_array = all_mods_dict[mod_code]['pre_reqs']
        let x = 0
        for (const str of pre_req_array) {
            if (str[0] === '!') {
                x += str.split(' ').length - 1
            } else {
                x++
            }
        }
        const pr_NA = document.querySelector(`#pr_${mod_code}`)
        pr_NA.textContent = `prereqs left: ${x}`
        if (x === 1) {
            pr_NA.style.backgroundColor = 'yellow'
            pr_NA.style.color = 'black'
        } else if (x === 2) {
            pr_NA.style.backgroundColor = 'orange'
            pr_NA.style.color = 'white'
        } else if (x > 2) {
            pr_NA.style.backgroundColor = 'red'
            pr_NA.style.color = 'white'
        }
        all_mods_pr[mod_code] = pre_req_array
        // req_for
        req_for_arr = all_mods_dict[mod_code]['req_for']
        all_mods_rf[mod_code] = req_for_arr
    })
})
.then(() => console.log(all_mods_pr))
.then(() => console.log(Object.keys(all_mods_pr).length))

// checking and changing pre_req_array at the start (for core mods) AND whenever a mod is selected
const check_prereq = (modCode) => {

}

// showing pre-reqs left when clicking the button
const pr_window = document.querySelector('.pr_window')
const pr_text = document.querySelector('.prs_left')
const open_prs = document.querySelectorAll('.pre_reqs')
const got_it = document.querySelector('.got_it')

open_prs.forEach(open_pr => {
    open_pr.addEventListener('click', () => {
        const mod_code = open_pr.id.slice(3)
        const pre_reqs = all_mods_pr[mod_code]
        let pr_string = ''
        for (let str of pre_reqs) {
            str = str.split(' ')
            if (str[0] === '!') {
                pr_string += '<div>All of: '
                while (str.length > 1) {
                    let pr = str.pop()
                    pr_string += `<span id="${pr}_window">${pr}</span> `
                }
                pr_string += '</div>'
            } else if (str[0] === '%') {
                pr_string += '<div class="not_claimed">One of: '
                str.pop()
                while (str.length > 1) {
                    let pr = str.pop()
                    pr_string += `<span id="${pr}_window">${pr} </span> `
                }
                pr_string += '</div>'
            } else if (str[0] === '?') {
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

