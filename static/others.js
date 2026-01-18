const searchMod = document.querySelector('#search_mod')
let target_mods;
let all_mods_dict;

async function loadData() {
    target_mods = await fetch('/jsons/target_mods.json').then(r => r.json())
    all_mods_dict = await fetch('/jsons/all_mods.json').then(r => r.json())
}

loadData()

const base_tiles = document.querySelector('.base_tiles')
let chosen_others = []

searchMod.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        console.log('pressed')
        base_tiles.innerHTML = ''
        const to_show = {}
        Object.keys(all_mods_dict).forEach(key => {
            if (key.includes(e.target.value.toUpperCase()) && e.target.value != '') {
                if (!JSON.parse(localStorage.getItem('Others')).includes(key) &&
                    !JSON.parse(localStorage.getItem('ID_mods2')).includes(key) &&
                    !JSON.parse(localStorage.getItem('CD_mods2')).includes(key) &&
                    !JSON.parse(localStorage.getItem('pe_mods')).includes(key) &&
                    !JSON.parse(localStorage.getItem('core_mods')).includes(key) &&
                    !Object.values(JSON.parse(localStorage.getItem('pillar_mods'))).includes(key)
                ) {
                    to_show[key] = all_mods_dict[key]["title"]
                }
            }
        })
        for (let [code, title] of Object.entries(to_show)) {
            console.log(code)
            console.log(title)
            let add_html;
            if (chosen_others.includes(code)) {
                add_html = `<div class="tile button otherModTile green_bg" id="${code}tile">`
            } else {
                add_html = `<div class="tile button otherModTile" id="${code}tile">`
            }
            add_html += `<div class="otherModCode" id="${code}code">${code}</div>`
            add_html += `<div class="otherModTitle" id="${code}title">${title}</div></div>`
            base_tiles.insertAdjacentHTML('beforeend', add_html);
        }
        if (Object.keys(to_show).length === 0) {
            base_tiles.innerHTML = '<div style="font-size: 160%; color: aliceblue;">No modules found, adjust your search</div>'
        }
    }
});

base_tiles.addEventListener('click', (e) => {
    if (e.target.classList.contains('otherModTile')) {
        let modTile = e.target
        let modCode = modTile.id.slice(0, -4)
        if (modTile.classList.contains('green_bg')) {
            chosen_others = chosen_others.filter(mod => mod != modCode)
        } else {
            chosen_others.push(modCode)
        }
        modTile.classList.toggle('green_bg')
    }
})

const back_to_ue = document.querySelector('.back_button') 

back_to_ue.addEventListener('click', () => {
    let current_others = JSON.parse(localStorage.getItem('Others2'))
    current_others.push(...chosen_others)
    localStorage.setItem('Others2', JSON.stringify(current_others))
    window.location.href = '/ue_mods'
})