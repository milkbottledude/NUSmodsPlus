const languages_dict = JSON.parse(localStorage.getItem('languages'))
const lang_tile = document.querySelector('#languages_tile')
if (languages_dict) {
    if (Object.keys(languages_dict).length > 0) {
        lang_tile.classList.add('green_bg')
    }    
}

const remaining_crs_span = document.querySelector('#remaining_crs')
if (languages_dict) {
    for (let lvl of Object.values(languages_dict)) {
        let new_crs = Number(remaining_crs_span.textContent) - 4*lvl
        if (new_crs < 0) {
            remaining_crs_span.classList.add('red')
        }
        remaining_crs_span.textContent = new_crs
    }     
}

const minors = JSON.parse(localStorage.getItem('minors'))
const minors_tile = document.querySelector('#minors_tile')

if (minors) {
    if (Object.keys(minors).length > 0) {
        minors_tile.classList.add('green_bg')
    }  
    let minor_mods = 0
    for (let deets of Object.values(minors)) {
        for (let [symbol, arr] of Object.entries(deets)) {
            if (symbol === '!') {
                minor_mods += arr.length
            } else {
                minor_mods += Number(arr[0])
            }
        }
    }
    console.log(minor_mods)
    if (minor_mods > 0) {
        let crs3 = Number(remaining_crs_span.textContent) - (minor_mods*4)
        remaining_crs_span.textContent = crs3
        console.log(crs3)
    }      
}


const ID_mods = JSON.parse(localStorage.getItem('ID_mods'))
const CD_mods = JSON.parse(localStorage.getItem('CD_mods'))

const ID_mods2 = JSON.parse(localStorage.getItem('ID_mods2'))
const CD_mods2 = JSON.parse(localStorage.getItem('CD_mods2'))

let counted_ID = []
let counted_CD = []

let crs2 = 0
if (ID_mods2) {
    if (counted_ID && ID_mods2.length > ID_mods.length) {
        while (counted_ID.length < 3 && ID_mods2.length != 0) {
            counted_ID.push(ID_mods2.pop())
            if (!ID_mods.includes(counted_ID.at(-1))) {
                crs2 += 4
            }
        }

        if (counted_ID.length < 3 && counted_CD.length === 0 && CD_mods2.length != 0) {
            counted_CD.push(CD_mods2.pop())
            if (!ID_mods.includes(counted_ID.at(-1))) {
                crs2 += 4
            }
        }    
    } else {
        counted_ID = ID_mods
        counted_CD = CD_mods
    }    
}



crs2 += Number(remaining_crs_span.textContent)
if (crs2 < 0) {
    remaining_crs_span.classList.add('red')
}
remaining_crs_span.textContent = crs2

let ril_others = []
if (JSON.parse(localStorage.getItem('Others2'))) {
    ril_others = JSON.parse(localStorage.getItem('Others2'))
} else if (JSON.parse(localStorage.getItem('Others'))){
    ril_others = JSON.parse(localStorage.getItem('Others'))
    console.log('hello')
}

ril_others.forEach(_ => {
    let crs3 = Number(remaining_crs_span.textContent) - 4
    console.log('removed other')
    console.log(crs3)
    remaining_crs_span.textContent = crs3
})

if (Number((remaining_crs_span.textContent)) < 0) {
    remaining_crs_span.style.color = 'rgb(168, 5, 5)'
    console.log('REDDDDDDDD NIGGGASSSSSSSSS')
}

localStorage.setItem('ID_mods3', JSON.stringify(counted_ID))
localStorage.setItem('CD_mods3', JSON.stringify(counted_CD))
localStorage.setItem('UE_crs_left', JSON.stringify(remaining_crs_span.textContent))

if (!localStorage.getItem('ID_mods2')) {
    localStorage.setItem('ID_mods2', JSON.stringify([]))
    localStorage.setItem('CD_mods2', JSON.stringify([]))
}