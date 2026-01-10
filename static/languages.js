const language_tiles = document.querySelectorAll('.language_tile')
const notice = document.querySelector('.not_done_notice')
let langs_chosen = new Set() // CHANGE TO DICT, ND TO INCLUDE LEVELz!!

language_tiles.forEach(tile => {
    tile.addEventListener('click', () => {
        if (tile.classList.contains('green_bg')) {
            tile.classList.remove('green_bg')
            langs_chosen.delete(tile.textContent)
        } else {
            if (langs_chosen.size == 2) {
                notice.style.display = 'flex'
                setTimeout(() => {
                    notice.style.display = 'none'
                }, 1900)
            } else {
                tile.classList.add('green_bg')
                langs_chosen.add(tile.textContent)
            }
        }
    })
})

const back = document.querySelector('back_button')
back.addEventListener('click', () => {
    localStorage.setItem('languages', JSON.stringify(langs_chosen))
    window.location.href = '/ue_mods'
})