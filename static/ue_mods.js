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


const ID_mods = JSON.parse(localStorage.getItem('ID_mods'))
const CD_mods = JSON.parse(localStorage.getItem('CD_mods'))

const counted_ID = []
const counted_CD = []

while (counted_ID.length < 3 && ID_mods.length != 0) {
    counted_ID.push(ID_mods.shift())
}

if (counted_ID.length < 3 && CD_mods.length != 0) {
    counted_CD.push(CD_mods.shift())
}

for (let x = 0; x < counted_CD.length + counted_ID.length; x++) {
    let crs2 = Number(remaining_crs_span.textContent) + 4
    if (crs2 < 0) {
        remaining_crs_span.classList.add('red')
    }
    remaining_crs_span.textContent = crs2
}

localStorage.setItem('ID_mods', JSON.stringify(counted_ID))
localStorage.setItem('CD_mods', JSON.stringify(counted_CD))
localStorage.setItem('UE_crs_left', JSON.stringify(remaining_crs_span.textContent))