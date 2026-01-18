const languages_dict = JSON.parse(localStorage.getItem('languages'))
const remaining_crs_span = document.querySelector('#remaining_crs')
for (let lvl of Object.values(languages_dict)) {
    let new_crs = Number(remaining_crs_span.textContent) - 4*lvl
    if (new_crs < 0) {
        remaining_crs_span.classList.add('red')
    }
    remaining_crs_span.textContent = new_crs
} 

const minors = JSON.parse(localStorage.getItem('minors'))
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
}


const ID_mods2 = JSON.parse(localStorage.getItem('ID_mods2'))
const CD_mods2 = JSON.parse(localStorage.getItem('CD_mods2'))

const counted_ID = JSON.parse(localStorage.getItem('ID_mods'))
const counted_CD = JSON.parse(localStorage.getItem('CD_mods'))

let crs2 = 0
while (counted_ID.length < 3 && ID_mods2.length != 0) {
    counted_ID.push(ID_mods2.pop())
    crs2 += 4
}

if (counted_ID.length < 3 && counted_CD.length === 0 && CD_mods2.length != 0) {
    counted_CD.push(CD_mods2.pop())
    crs2 += 4
}

crs2 += Number(remaining_crs_span.textContent)
if (crs2 < 0) {
    remaining_crs_span.classList.add('red')
}
remaining_crs_span.textContent = crs2

let ril_others;
if (JSON.parse(localStorage.getItem('Others2'))) {
    ril_others = JSON.parse(localStorage.getItem('Others2'))
} else {
    ril_others = JSON.parse(localStorage.getItem('Others'))
}

ril_others.forEach(_ => {
    let crs3 = Number(remaining_crs_span.textContent) - 4
    if (crs3 < 0) {
        remaining_crs_span.classList.add('red')
    }
    console.log('removed other')
    remaining_crs_span.textContent = crs3
})

localStorage.setItem('ID_mods3', JSON.stringify(counted_ID))
localStorage.setItem('CD_mods3', JSON.stringify(counted_CD))
localStorage.setItem('UE_crs_left', JSON.stringify(remaining_crs_span.textContent))