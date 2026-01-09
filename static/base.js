const selected_mods_window = document.querySelector('#selected_mods_container')
const progress_bar = document.querySelector('.current_stack')
progress_bar.addEventListener('click', () => {
    selected_mods_window.style.display = 'flex'
})

const to_window = (type) => {
    const tile = document.querySelector(`#${type}_tile`)
    tile.style.backgroundColor = 'rgb(23, 196, 23)'
    progress_bar.style.background = 'linear-gradient(to right, rgb(23, 196, 23) 20%, cornsilk 20%)'
    const window = document.querySelector(`.window_${type}`)
    window.style.display = 'flex'
    let string;
    if (type === 'pillar') {
        string = `<span class="mod_title">Pillars</span>`
        Object.values(JSON.parse(localStorage.getItem(`${type}_mods`))).forEach(mod => {
            string += `<span>${mod}</span>`
        })
    } else {
        string = `<span class="mod_title">${type} Mods</span>`
        Object.keys(JSON.parse(localStorage.getItem(`${type}_mods`))).forEach(mod => {
            string += `<span>${mod}</span>`
        })
    }
    window.innerHTML = string
}

if (localStorage.getItem('pillar_mods') !== null) {
    to_window('pillar')
}

if (localStorage.getItem('PE_mods') !== null) {
    to_window('PE')
    console.log(JSON.parse(localStorage.getItem('PE_mods')))
}

const got_it = document.querySelector('.got_it')
got_it.addEventListener('click', () => {
    selected_mods_window.style.display = 'none'
})