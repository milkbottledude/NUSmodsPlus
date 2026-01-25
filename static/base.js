// localStorage.clear()
const ue_tile = document.querySelector('#UE_tile')
const selected_mods_window = document.querySelector('#selected_mods_container')
const progress_bar = document.querySelector('.current_stack')
progress_bar.addEventListener('click', () => {
    selected_mods_window.style.display = 'flex'
})
let progress_amt = 0

const got_it = document.querySelector('.got_it')
got_it.addEventListener('click', () => {
    selected_mods_window.style.display = 'none'
})

const to_window = (type, pt2=false) => {
    const tile = document.querySelector(`#${type}_tile`)
    if (tile) {
        tile.style.backgroundColor = 'rgb(23, 196, 23)'
        progress_amt += 25
        progress_bar.style.background = `linear-gradient(to right, rgb(23, 196, 23) ${progress_amt}%, white ${progress_amt}%)`
    }
    const window = document.querySelector(`.window_${type}`)
    // window.style.display = 'flex'
    let string;
    if (type === 'pillar') {
        string = `<span class="mod_title">Pillars</span>`
        Object.values(JSON.parse(localStorage.getItem(`${type}_mods`))).forEach(mod => {
            console.log(mod)
            string += `<span>${mod}</span>`
        })
    } else if (type === 'Others') {
        string = `<span class="mod_title">${type}</span>`
        if (pt2) {
            Object.values(JSON.parse(localStorage.getItem(`${type}2`))).forEach(mod => {
                string += `<span>${mod}</span>`
            })
        } else {
            Object.values(JSON.parse(localStorage.getItem(`${type}`))).forEach(mod => {
                string += `<span>${mod}</span>`
            })            
        }

    } else if (type === 'PE') {
        string = `<span class="mod_title">${type} Mods</span>`
        Object.keys(JSON.parse(localStorage.getItem(`${type}_mods`))).forEach(mod => {
            string += `<span>${mod}</span>`
        })
    } else if (type === 'minors') {
        string = '<span class="mod_title">Minor(s)</span>'
        Object.keys(JSON.parse(localStorage.getItem('minors'))).forEach(minor => {
            string += `<span>${minor}</span>`      
        })  
    } else if (type === 'Languages') {   
        string = '<span class="mod_title">Language(s)</span>'
        for (let [lang, lvl] of Object.entries(JSON.parse(localStorage.getItem('languages')))) {
            if (lang === 'Bahasa') {
                lang = 'Bahasa Indonesia'
            }
            string += `<span>${lang} ${lvl}</span>` 
        }
    } else {
        console.log(type)
        string = `<span class="mod_title">${type} Mods</span>`
        if (!pt2) {
            Object.values(JSON.parse(localStorage.getItem(`${type}_mods`))).forEach(mod => {
                string += `<span>${mod}</span>`     
            })       
        } else {
            Object.values(JSON.parse(localStorage.getItem(`${type}_mods3`))).forEach(mod => {
                string += `<span>${mod}</span>` 
            })
        }
    }
    window.innerHTML = string
}

if (JSON.parse(localStorage.getItem('pillar_mods')) !== null) {
    to_window('pillar')
    console.log('to_window pillar')
}

if (JSON.parse(localStorage.getItem('PE_mods')) !== null) {
    to_window('PE')
    console.log(JSON.parse(localStorage.getItem('PE_mods')))
} else {
    const UE_tile = document.querySelector('#UE_tile')
    const IDCD_tile = document.querySelector('#IDCD_tile')
    if(IDCD_tile) {
        console.log('dk why i need this')
    } // screw ts
    [UE_tile, IDCD_tile].forEach(tile => {
        tile.classList.add('greyed')
        tile.removeAttribute('href')
    })
}
const ID_mods3 = JSON.parse(localStorage.getItem('ID_mods3'))
const CD_mods3 = JSON.parse(localStorage.getItem('CD_mods3'))
const ID_mods2 = JSON.parse(localStorage.getItem('ID_mods2'))
const CD_mods2 = JSON.parse(localStorage.getItem('CD_mods2'))
const ID_mods = JSON.parse(localStorage.getItem('ID_mods'))
const CD_mods = JSON.parse(localStorage.getItem('CD_mods'))
const Others = JSON.parse(localStorage.getItem('Others'))
const Others2 = JSON.parse(localStorage.getItem('Others2'))
let IDCD_total = 0

if (ID_mods) {
    IDCD_total = ID_mods.length + CD_mods.length
    to_window('ID')
    to_window('CD')
}

if (ID_mods2) {
    if (ID_mods2.length === 0) {
        IDCD_total = 0
        if (ID_mods !== null) {
            if (ID_mods.length) {
                to_window('ID')
                if (IDCD_total < 3) {
                    IDCD_total += ID_mods.length
                }
                console.log(IDCD_total)
                console.log(ID_mods)
            }
        }
        if (CD_mods !== null) {
            if (CD_mods.length) {
                to_window('CD')
                if (IDCD_total < 3) {
                    IDCD_total++
                }
            }
        }    
    }
}
if (ID_mods3) {
    IDCD_total = 0
    if (ID_mods3.length) {
        IDCD_total += ID_mods3.length
        to_window('ID', pt2=true)
    }
}
if (CD_mods3) {
    if (CD_mods3.length) {
        IDCD_total += CD_mods3.length
        to_window('CD', pt2=true)
    }
}
let to_others = []
if (ID_mods2) {
    to_others += ID_mods2.filter(mod => !ID_mods3.includes(mod))
    to_others += CD_mods2.filter(mod => !CD_mods3.includes(mod))        
}
if (Others) {
    Others.push(...to_others)
}





if (Others !== null) {
    if (Others.length) {
        to_window('Others')
    }
}

if (Others2 !== null) {
    if (Others2.length) {
        to_window('Others', pt2=true)
    }
}

if (IDCD_total === 1) {
    IDCD_tile.style.background = 'linear-gradient(to right, rgb(23, 196, 23) 30%, aqua 30%)'
    progress_amt += 8
} else if (IDCD_total === 2) {
    IDCD_tile.style.background = 'linear-gradient(to right, rgb(23, 196, 23) 60%, aqua 60%)'  
    progress_amt += 16
} else if (IDCD_total === 3) {
    IDCD_tile.style.background = 'rgb(23, 196, 23)'
    progress_amt += 25
}

let minor_dict = localStorage.getItem('minors')
if (minor_dict != null) {
    minor_dict = JSON.parse(minor_dict)
}
if (ID_mods2) {
    let UE_crs_left = Number(JSON.parse(localStorage.getItem('UE_crs_left')))
    let percentage = 100 - Math.floor(UE_crs_left/40*100)
    UE_tile.style.background = `linear-gradient(to right, rgb(23, 196, 23) ${percentage}%, aqua ${percentage}%)`
    if (UE_crs_left > 0) {
        console.log(UE_crs_left)
        progress_amt += Math.floor(25 * (1-(UE_crs_left/40)))
    } else {
        progress_amt += 25
    }
    progress_bar.style.background = `linear-gradient(to right, rgb(23, 196, 23) ${progress_amt}%, white ${progress_amt}%)`
    if (minor_dict) {
        to_window('minors')
    }    
}

const languages_arr = JSON.parse(localStorage.getItem('languages'))
if (languages_arr) {
    to_window('Languages')
}



// go if ur ok with reset
const pe_tile = document.querySelector('#PE_tile')
const reset_notice = document.querySelector('#u_sure_window')
const reset_text = document.querySelector('#u_sure_text')
let go_in = document.querySelector('#go_in')
// ffs...
const new_go_in = go_in.cloneNode(true)
go_in.replaceWith(new_go_in)
go_in = new_go_in
const nuh_uh = document.querySelector('#nuh_uh')

nuh_uh.addEventListener('click', () => {
    reset_notice.style.display = 'none'
})

const goInPE = () => {window.location.href = '/pe_mods'}
const goInUE = () => {window.location.href = '/ue_mods'}
const goInIDCD = () => {window.location.href = '/idcd_mods'}

let currentHandler = null

pe_tile.addEventListener('click', () => {
    if (localStorage.getItem('pe_mods')) {  // pe_tile.style.background = 'rgb(23, 196, 23)'
        let reset_mods = '<span class="purple">PE'
        if (ue_tile.style.background === 'rgb(23, 196, 23)') {
            reset_mods += 'and UE'
        }
        if (ue_tile.style.background === 'rgb(23, 196, 23)') {
            reset_mods += 'and IDCD'
        }
        reset_mods += ' mods</span>'
        reset_text.innerHTML = `Entering this tile will reset all your ${reset_mods} Continue?`
        reset_notice.appendChild(go_in)
        if (currentHandler) {
            go_in.removeEventListener('click', currentHandler)
        }
        go_in.addEventListener('click', goInPE)
        currentHandler = goInPE
        reset_notice.appendChild(nuh_uh)
        reset_notice.style.display = 'flex'
    } else {
        window.location.href = '/pe_mods'
    }
})

ue_tile.addEventListener('click', () => {
    if (minor_dict) {
        let reset_mods = '<span class="purple">UE'
        if (pe_tile.style.background === 'rgb(23, 196, 23)') {
            reset_mods += 'and PE'
        }
        if (IDCD_tile.style.background === 'rgb(23, 196, 23)') {
            reset_mods += 'and IDCD'
        }
        reset_mods += ' mods</span>'
        reset_text.innerHTML = `Entering this tile will reset all your ${reset_mods} Continue?`
        reset_notice.appendChild(go_in)
        if (currentHandler) {
            go_in.removeEventListener('click', currentHandler)
        }
        go_in.addEventListener('click', goInUE)
        currentHandler = goInUE
        reset_notice.appendChild(nuh_uh)
        reset_notice.style.display = 'flex'
    } else {
        window.location.href = '/ue_mods'
    }
})

IDCD_tile.addEventListener('click', () => {
    // if (IDCD_tile.style.background = 'rgb(23, 196, 23)') {
    //     let reset_mods = '<span class="purple">IDCD '
    //     if (pe_tile.style.backgroundColor === 'rgb(23, 196, 23)') {
    //         reset_mods += 'and PE '
    //     }
    //     if (minor_dict) {
    //         reset_mods += 'and UE'
    //     }
    //     reset_mods += ' mods</span>'
    //     reset_text.innerHTML = `Entering this tile will reset all your ${reset_mods} Continue?`
    //     reset_notice.appendChild(go_in)
    //     if (currentHandler) {
    //         go_in.removeEventListener('click', currentHandler)
    //     }
    //     go_in.addEventListener('click', goInIDCD)
    //     currentHandler = goInIDCD
    //     reset_notice.appendChild(nuh_uh)
    //     reset_notice.style.display = 'flex'
    // } else {
        window.location.href = '/idcd_mods'
    // }
})

// to timetable generator
const timetable_tile = document.querySelector('#timetable_tile')
if (progress_bar.style.background.includes('100%')) {
    console.log('ready to generate timetable')
    timetable_tile.classList.remove('greyed')
    timetable_tile.classList.add('button')
    timetable_tile.addEventListener('click', () => window.location.href = '/overload_sem')
}