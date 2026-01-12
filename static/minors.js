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
        let x = 0
        for (const req_str of target_mods['minor_mods'][minor_key]) {
            const str_array = req_str.split(' ')
            const symbol = str_array.shift()
            if (symbol === '!') {
                x += str_array.length
                // checking for alr done mod_reqs
                for (const str_piece of str_array) {
                    if (JSON.parse(localStorage.getItem('CD_mods')).includes(str_piece) || 
                        JSON.parse(localStorage.getItem('ID_mods')).includes(str_piece) || 
                        JSON.parse(localStorage.getItem('Others')).includes(str_piece) ||
                        JSON.parse(localStorage.getItem('pe_mods')).includes(str_piece) ||
                        JSON.parse(localStorage.getItem('core_mods')).includes(str_piece) ||
                        Object.values(JSON.parse(localStorage.getItem('pillar_mods'))).includes(str_piece)
                    ) {
                        alr_done += str_piece
                        x--
                    }
                }
                mrs_left_string += `<span>${req_str}</span>`
            } else if (symbol === '%' || symbol === '<') {
                let amt_left = Number(str_array.pop())
                for (const str_piece of str_array) {
                    if (JSON.parse(localStorage.getItem('CD_mods')).includes(str_piece) || 
                        JSON.parse(localStorage.getItem('ID_mods')).includes(str_piece) || 
                        JSON.parse(localStorage.getItem('Others')).includes(str_piece) ||
                        JSON.parse(localStorage.getItem('pe_mods')).includes(str_piece) ||
                        JSON.parse(localStorage.getItem('core_mods')).includes(str_piece) ||
                        Object.values(JSON.parse(localStorage.getItem('pillar_mods'))).includes(str_piece)
                    ) {
                        alr_done += str_piece
                        if (amt_left > 0) {
                            amt_left--
                        }
                    }
                }
                x += amt_left
                mrs_left_string += `<span>${req_str}</span>`
            }
        }
        mrs_left.innerHTML = mrs_left_string
        mrs_left.appendChild(got_it)
        if (alr_done === '') {
            console.log('nigga')
        } else {
            console.log(alr_done) // temp, to see completed mod_reqs
            console.log(x)
        }
        pr_window.style.display = 'flex'
    })
})

got_it.addEventListener('click', () => {
    pr_window.style.display = 'none'
})




})();

