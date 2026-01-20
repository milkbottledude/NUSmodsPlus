const ID_tile = document.querySelector('#ID_tile')
const CD_tile = document.querySelector('#CD_tile')
const notice_window = document.querySelector('.not_done_notice')

let cur_ID = JSON.parse(localStorage.getItem('ID_mods3'))
let cur_CD = JSON.parse(localStorage.getItem('CD_mods3'))

if (cur_CD.length) {
    CD_tile.classList.add('greyed')
    CD_tile.classList.remove('button')
} else {
    CD_tile.addEventListener('click', () => {
    if (CD_dropdown.style.display === '') {
        CD_dropdown.style.display = 'flex'
    } else {
        CD_dropdown.style.display = ''
    }
    })
}

if ((cur_ID.length < 3 && cur_CD.length === 0) || (cur_ID.length < 2)) {
    ID_tile.addEventListener('click', () => {
        if (ID_dropdown.style.display === '') {
            ID_dropdown.style.display = 'flex'
        } else {
            ID_dropdown.style.display = ''
        }
    })
} else {
    ID_tile.classList.add('greyed')
    ID_tile.classList.remove('button')    
}

// adding mods
const ID_dropdown = document.querySelector('#ID_dropdown')
const CD_dropdown = document.querySelector('#CD_dropdown')

let IDCD_mods_dict;
async function atStart() {
    const target_mods = await fetch('/jsons/target_mods.json').then(r => r.json())
    IDCD_mods_dict = target_mods['IDCD_mods']
}

atStart().then(() => {
    IDCD_mods_dict['ID_mods'].forEach(mod => {
        let to_add = ''
        to_add += '<div class="dropdown-mod">'
        to_add += `<div class="select_status" id="${mod}_status"></div>`
        to_add += `<button class="select_mod">${mod}</button>`
        to_add += `<a href="https://nusmods.com/courses/${mod}" class="details_nusmods">?</a></div>`
        ID_dropdown.innerHTML += to_add
    })
    IDCD_mods_dict['CD_mods'].forEach(mod => {
        let to_add = ''
        to_add += '<div class="dropdown-mod">'
        to_add += `<div class="select_status" id="${mod}_status"></div>`
        to_add += `<button class="select_mod">${mod}</button>`
        to_add += `<a href="https://nusmods.com/courses/${mod}" class="details_nusmods">?</a></div>`
        CD_dropdown.innerHTML += to_add
    })
}).then(() => {
    const mod_buttons = document.querySelectorAll('.select_mod')
    mod_buttons.forEach(mod_button => {
        mod_button.addEventListener('click', () => {
            let mod_code = mod_button.textContent
            let dot_status = document.querySelector(`#${mod_code}_status`)
            if (dot_status.style.display === '') {
                if (IDCD_mods_dict['ID_mods'].includes(mod_code)) {
                    if ((cur_ID.length < 2) || (cur_ID.length === 2 && cur_CD.length === 0)) {
                        dot_status.style.display = 'flex'
                        cur_ID.push(mod_code)
                    } else {
                        notice_window.style.display = 'flex'
                        notice_window.textContent = 'Max IDCD mods reached'
                        setTimeout(() => {
                            notice_window.style.display = ''
                        }, 1900);
                    }
                } else if (IDCD_mods_dict['CD_mods'].includes(mod_code)) {
                    if (cur_ID.length === 3 || cur_CD.length === 1) {
                        dot_status.style.display = 'flex'
                        cur_CD.push(mod_code)
                    } else {
                        notice_window.style.display = 'flex'
                        notice_window.textContent = 'Max CD mods reached'
                        setTimeout(() => {
                            notice_window.style.display = ''
                        }, 1900);                        
                    }
                }
            } else {
                dot_status.style.display = ''
                cur_CD = cur_CD.filter(mod => mod != mod_code)
                cur_ID = cur_ID.filter(mod => mod != mod_code)
            }
        }) 
    })
})

const back_button = document.querySelector('.back_button')
back_button.addEventListener('click', () => {
    localStorage.setItem('ID_mods3', JSON.stringify(cur_ID))
    localStorage.setItem('CD_mods3', JSON.stringify(cur_CD))
    window.location.href = '/'
})




