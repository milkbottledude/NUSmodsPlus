(async () => {
    // gotta load these brats first
    const target_mods = await fetch('/jsons/target_mods.json').then(r => r.json())
    const all_mods_dict = await fetch('/jsons/all_mods.json').then(r => r.json())

const mod_req_buttons = document.querySelectorAll('.mod_req')
const pr_window = document.querySelector('.pr_window')
const got_it = document.querySelector('.got_it')
const mrs_left = document.querySelector('.prs_left')

mod_req_buttons.forEach(mod_req_button => {
    mod_req_button.addEventListener('click', () => {
        let minor_key = mod_req_button.id.split('_')[0]
        let mrs_left_string = ''
        let alr_done = '' // temp, to see completed mod_reqs
        for (const req_str of target_mods['minor_mods'][minor_key]) {
            // checking for alr done mod_reqs
            for (const str_piece of req_str.split(' ')) {
                if (JSON.parse(localStorage.getItem('CD_mods')).includes(str_piece) || 
                    JSON.parse(localStorage.getItem('ID_mods')).includes(str_piece) || 
                    JSON.parse(localStorage.getItem('Others')).includes(str_piece) ||
                    JSON.parse(localStorage.getItem('pe_mods')).includes(str_piece) ||
                    JSON.parse(localStorage.getItem('core_mods')).includes(str_piece) ||
                    Object.values(JSON.parse(localStorage.getItem('pillar_mods'))).includes(str_piece)
                ) {
                    alr_done += str_piece
                }
            }
            mrs_left_string += `<span>${req_str}</span>`
        }
        mrs_left.innerHTML = mrs_left_string
        mrs_left.appendChild(got_it)
        if (alr_done === '') {
            console.log('nigga')
        } else {
            console.log(alr_done)
        }
        pr_window.style.display = 'flex'
    })
})

got_it.addEventListener('click', () => {
    pr_window.style.display = 'none'
})




})();

