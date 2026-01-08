// for mod group dropdowns
const GEX_button = document.querySelector('#dropButGEX')
const GEX_list = document.querySelector('#dropGEX')

const GEC_button = document.querySelector('#dropButGEC')
const GEC_list = document.querySelector('#dropGEC')

const GES_button = document.querySelector('#dropButGES')
const GES_list = document.querySelector('#dropGES')

const GEN_button = document.querySelector('#dropButGEN')
const GEN_list = document.querySelector('#dropGEN')

GEX_button.addEventListener('click', function() {
    if (GEX_list.style.display === 'flex') {
        GEX_list.style.display = 'none'
    } else {
        GEX_list.style.display = 'flex'
    }
})

GEC_button.addEventListener('click', function() {
    if (GEC_list.style.display === 'flex') {
        GEC_list.style.display = 'none'
    } else {
        GEC_list.style.display = 'flex'
    }
})

GES_button.addEventListener('click', function() {
    if (GES_list.style.display === 'flex') {
        GES_list.style.display = 'none'
    } else {
        GES_list.style.display = 'flex'
    }
})

GEN_button.addEventListener('click', function() {
    if (GEN_list.style.display === 'flex') {
        GEN_list.style.display = 'none'
    } else {
        GEN_list.style.display = 'flex'
    }
})

// for selecting Pillar mods
const mods_chosen = {
    'GEX': undefined,
    'GEC': undefined,
    'GES': undefined,
    'GEN': undefined
}

const all_mod_buttons = document.querySelectorAll('.select_mod')

all_mod_buttons.forEach(mod_button => {
    mod_button.addEventListener('click', function() {
        const mod_code = mod_button.textContent
        const mod_status = document.querySelector(`#${mod_code}_status`)
        mod_status.style.display = 'flex'
        const grp = mod_code.slice(0, 3)
        if (mods_chosen[grp] !== undefined && mods_chosen[grp] !== mod_code) {
            const old_mod_code = mods_chosen[grp]
            const old_mod_status = document.querySelector(`#${old_mod_code}_status`)
            old_mod_status.style.display = 'none'
        }
        mods_chosen[grp] = mod_code
        if (grp === 'GEX') {
            GEX_button.style.backgroundColor = 'green'
        } else if (grp === 'GEC') {
            GEC_button.style.backgroundColor = 'green'
        } else if (grp === 'GES') {
            GES_button.style.backgroundColor = 'green'
        } else if (grp === 'GEN') {
            GEN_button.style.backgroundColor = 'green'
        }
    })    
})

// saving selected pillar & core mods to localStorage
const back_button = document.querySelector('.back_button')
const not_done = document.querySelector('.not_done_notice')

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

back_button.addEventListener('click', () => {
    let unfulfilled = ''
    for (const [key, value] of Object.entries(mods_chosen)) {
        if (value === undefined) {
            unfulfilled = unfulfilled + key + ' '
        }
    }
    if (unfulfilled !== '') {
        not_done.style.display = 'flex'
        not_done.textContent = 'You have not chosen mods from these group(s): \n' + unfulfilled
    } else {
        localStorage.setItem('pillar_mods', JSON.stringify(mods_chosen))
        localStorage.setItem('core_mods', JSON.stringify(core_mods))
        window.location.href = "base.html"
    }
})
