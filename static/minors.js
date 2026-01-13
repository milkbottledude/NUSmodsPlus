(async () => {
    // gotta load these brats first
    const target_mods = await fetch('/jsons/target_mods.json').then(r => r.json())
    const all_mods_dict = await fetch('/jsons/all_mods.json').then(r => r.json())

const mod_req_buttons = document.querySelectorAll('.mod_req')
const pr_window = document.querySelector('.pr_window')
const got_it = document.querySelector('.got_it')
const mrs_left = document.querySelector('.prs_left')

mod_req_buttons.forEach(mod_req_button => {
    let minor_key = mod_req_button.id.split('_')[0]
    let mrs_left_string = '<div style="margin-bottom: 60px; width: 80%; display: flex; flex-direction: column; align-items: center;">'
    let alr_done = '' // temp, to see completed mod_reqs
    let x = 0
    let container_no = 1
    for (const req_str of target_mods['minor_mods'][minor_key]) {
        const str_array = req_str.split(' ')
        const symbol = str_array.shift()
        if (symbol === '!') {
            let add_to_mrs = `<div class="of_drop button_${container_no} button">All of...</div><div class="col_div container_${container_no}">`
            container_no++
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
                    add_to_mrs += `<div class="green_fn mod_button button">${str_piece}</div>`
                    x--
                } else {
                    if (target_mods['IDCD_mods']['ID_mods'].includes(str_piece)) {
                        // console.log(`IDDDDDD ${str_piece}${minor_key}`)
                        add_to_mrs += `<div class="orange mod_button button">${str_piece}</div>`
                    } else if (target_mods['IDCD_mods']['CD_mods'].includes(str_piece)) {
                        // console.log(`CDDDDD ${str_piece}${minor_key}`)
                        add_to_mrs += `<div class="yellow mod_button button">${str_piece}</div>`
                    } else {
                        add_to_mrs += `<div class="mod_button button">${str_piece}</div>`
                    }
                }
            }
            mrs_left_string += `${add_to_mrs}</div>`
        } else if (symbol === '%' || symbol === '<') {
            let amt_left = Number(str_array.pop())
            let amt_left_total = amt_left
            let add_to_mrs = ''
            container_no++
            for (const str_piece of str_array) {
                if (JSON.parse(localStorage.getItem('CD_mods')).includes(str_piece) || 
                    JSON.parse(localStorage.getItem('ID_mods')).includes(str_piece) || 
                    JSON.parse(localStorage.getItem('Others')).includes(str_piece) ||
                    JSON.parse(localStorage.getItem('pe_mods')).includes(str_piece) ||
                    JSON.parse(localStorage.getItem('core_mods')).includes(str_piece) ||
                    Object.values(JSON.parse(localStorage.getItem('pillar_mods'))).includes(str_piece)
                ) {
                    alr_done += str_piece
                    add_to_mrs += `<div class="green_fn mod_button button">${str_piece}</div>`
                    if (amt_left > 0) {
                        amt_left--
                    }
                } else {
                    if (target_mods['IDCD_mods']['ID_mods'].includes(str_piece)) {
                        // console.log(`IDDDDDD ${str_piece}${minor_key}`)
                        add_to_mrs += `<div class="orange mod_button button">${str_piece}</div>`
                    } else if (target_mods['IDCD_mods']['CD_mods'].includes(str_piece)) {
                        // console.log(`CDDDDD ${str_piece}${minor_key}`)
                        add_to_mrs += `<div class="yellow mod_button button">${str_piece}</div>`
                    } else {
                        add_to_mrs += `<div class="mod_button button">${str_piece}</div>`
                    }
                }
            }
            if (amt_left < amt_left_total) {
                let percentage = Math.floor(amt_left/amt_left_total*100)
                add_to_mrs = `<div class="of_drop button_${container_no}" style="background: linear-gradient(to right, rgb(23, 196, 23) ${percentage}%, white ${percentage}%)">${amt_left_total} of...</div><div class="col_div container_${container_no}">` + add_to_mrs
            } else if (amt_left === 0) {
                add_to_mrs = `<div class="of_drop button_${container_no} green_bg">${amt_left_total} of...</div><div class="col_div container_${container_no}">` + add_to_mrs                
            } else {
                add_to_mrs = `<div class="of_drop button_${container_no}">${amt_left_total} of...</div><div class="col_div container_${container_no}">` + add_to_mrs                
            }
            x += amt_left
            mrs_left_string += `${add_to_mrs}</div>`
        }
    }    
    mrs_left_string += '</div>'
    mod_req_button.textContent = `Mod req: ${x}`
    mod_req_button.addEventListener('click', () => {
        mrs_left.innerHTML = mrs_left_string
        let drop_em = document.querySelector(`button_${container_no}`)
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
    pr_window.style.display = ''
})

pr_window.addEventListener('click', (e) => {
    if (e.target.classList.contains('of_drop')) {
        let drop_em = e.target
        let i_drop = document.querySelector(`.container_${drop_em.classList[1].at(-1)}`)
        console.log(`container_${drop_em.classList[1].at(-1)}`)
        if (i_drop.style.display === '') {
            i_drop.style.display = 'flex'
        } else {
            i_drop.style.display = ''
        }
    }
})


})();

