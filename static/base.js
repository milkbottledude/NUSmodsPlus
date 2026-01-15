const selected_mods_window = document.querySelector('#selected_mods_container')
const progress_bar = document.querySelector('.current_stack')
progress_bar.addEventListener('click', () => {
    selected_mods_window.style.display = 'flex'
})
let progress_amt = 0

const to_window = (type) => {
    const tile = document.querySelector(`#${type}_tile`)
    if (tile) {
        tile.style.backgroundColor = 'rgb(23, 196, 23)'
        progress_amt++
        if (progress_amt === 1) {
            progress_bar.style.background = 'linear-gradient(to right, rgb(23, 196, 23) 20%, white 20%)'
        } else if (progress_amt === 2) {
            progress_bar.style.background = 'linear-gradient(to right, rgb(23, 196, 23) 40%, white 40%)'
        } else if (progress_amt === 3) {
            progress_bar.style.background = 'linear-gradient(to right, rgb(23, 196, 23) 60%, white 60%)'
        } else if (progress_amt === 4) {
            progress_bar.style.background = 'linear-gradient(to right, rgb(23, 196, 23) 80%, white 80%)'
        }
    }
    const window = document.querySelector(`.window_${type}`)
    window.style.display = 'flex'
    let string;
    if (type === 'pillar') {
        string = `<span class="mod_title">Pillars</span>`
        Object.values(JSON.parse(localStorage.getItem(`${type}_mods`))).forEach(mod => {
            string += `<span>${mod}</span>`
        })
    } else if (type === 'Others') {
        string = `<span class="mod_title">${type}</span>`
        Object.values(JSON.parse(localStorage.getItem(`${type}`))).forEach(mod => {
            string += `<span>${mod}</span>`
        })
    } else if (type === 'PE') {
        string = `<span class="mod_title">${type} Mods</span>`
        Object.keys(JSON.parse(localStorage.getItem(`${type}_mods`))).forEach(mod => {
            string += `<span>${mod}</span>`
        })
    } else {
        string = `<span class="mod_title">${type} Mods</span>`
        Object.values(JSON.parse(localStorage.getItem(`${type}_mods`))).forEach(mod => {
            string += `<span>${mod}</span>`
        })
    }
    window.innerHTML = string
}

if (JSON.parse(localStorage.getItem('pillar_mods') !== null)) {
    to_window('pillar')
}

if (JSON.parse(localStorage.getItem('PE_mods') !== null)) {
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

const ID_mods = JSON.parse(localStorage.getItem('ID_mods'))
const CD_mods = JSON.parse(localStorage.getItem('CD_mods'))
const Others = JSON.parse(localStorage.getItem('Others'))
let IDCD_total = 0

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
if (Others !== null) {
    if (Others.length) {
        to_window('Others')
    }
}

if (IDCD_total === 1) {
    IDCD_tile.style.background = 'linear-gradient(to right, rgb(23, 196, 23) 30%, aqua 30%)'
} else if (IDCD_total === 2) {
    IDCD_tile.style.background = 'linear-gradient(to right, rgb(23, 196, 23) 60%, aqua 60%)'    
} else if (IDCD_total === 3) {
    IDCD_tile.style.background = 'rgb(23, 196, 23)'
}

const got_it = document.querySelector('.got_it')
got_it.addEventListener('click', () => {
    selected_mods_window.style.display = 'none'
})

// go if ur ok with reset
const pe_tile = document.querySelector('#PE_tile')
const ue_tile = document.querySelector('#UE_tile')
const reset_notice = document.querySelector('#u_sure_window')
const reset_text = document.querySelector('#u_sure_text')
const go_in = document.querySelector('#go_in')
const nuh_uh = document.querySelector('#nuh_uh')

pe_tile.addEventListener('click', () => {
    if (pe_tile.style.background = 'rgb(23, 196, 23)') {
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
        go_in.addEventListener('click', () => {
            window.location.href = '/pe_mods'
        })
        reset_notice.appendChild(nuh_uh)
        nuh_uh.addEventListener('click', () => {
            reset_notice.style.display = 'none'
        })
        reset_notice.style.display = 'flex'
    } else {
        window.location.href = '/pe_mods'
    }
})

ue_tile.addEventListener('click', () => {
    if (ue_tile.style.background = 'rgb(23, 196, 23)') {
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
        go_in.addEventListener('click', () => {
            window.location.href = '/ue_mods'
        })
        reset_notice.appendChild(nuh_uh)
        nuh_uh.addEventListener('click', () => {
            reset_notice.style.display = 'none'
        })
        reset_notice.style.display = 'flex'
    } else {
        window.location.href = '/ue_mods'
    }
})

IDCD_tile.addEventListener('click', () => {
    if (IDCD_tile.style.background = 'rgb(23, 196, 23)') {
        let reset_mods = '<span class="purple">IDCD'
        if (PE_tile.style.background === 'rgb(23, 196, 23)') {
            reset_mods += 'and PE'
        }
        if (ue_tile.style.background === 'rgb(23, 196, 23)') {
            reset_mods += 'and UE'
        }
        reset_mods += ' mods</span>'
        reset_text.innerHTML = `Entering this tile will reset all your ${reset_mods} Continue?`
        reset_notice.appendChild(go_in)
        go_in.addEventListener('click', () => {
            window.location.href = '/idcd_mods'
        })
        reset_notice.appendChild(nuh_uh)
        nuh_uh.addEventListener('click', () => {
            reset_notice.style.display = 'none'
        })
        reset_notice.style.display = 'flex'
    } else {
        window.location.href = '/idcd_mods'
    }
})
