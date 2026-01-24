const minor_mrs = {};
let selected_minors = [];
const nuh_uh = document.querySelector('.not_done_notice');
let overlap = [];
let ID_chosen = JSON.parse(localStorage.getItem('ID_mods'));
let CD_chosen = JSON.parse(localStorage.getItem('CD_mods'));

(async () => {
    // gotta load these brats first
    const target_mods = await fetch('/jsons/target_mods.json').then(r => r.json())
    const all_mods_dict = await fetch('/jsons/all_mods.json').then(r => r.json())

const mod_req_buttons = document.querySelectorAll('.mod_req')
const pr_window = document.querySelector('.pr_window')
const got_it = document.querySelector('.got_it')
const dowan = document.querySelector('.dowan')
const mrs_left = document.querySelector('.prs_left')
const undone_prs = {}

mod_req_buttons.forEach(mod_req_button => {
    let minor_key = mod_req_button.id.split('_')[0]
    let mrs_left_string = '<div class="mrs_left_string">'
    let alr_done = '' // temp, to see completed mod_reqs
    let x = 0
    let container_no = 1
    minor_mrs[minor_key] = {}
    for (const req_str of target_mods['minor_mods'][minor_key]) {
        const str_array = req_str.split(' ')
        const symbol = str_array.shift()
        if (symbol === '!') {
            minor_mrs[minor_key]['!'] = []
            let add_to_mrs = `<div class="of_drop button_${container_no} button">All of...</div><div class="col_div container_${container_no}">`
            container_no++
            x += str_array.length
            // checking for alr done mod_reqs
            for (const str_piece of str_array) {
                let undone_prs_mod = []
                let prs_arr = all_mods_dict[str_piece]['pre_reqs']
                let mod_x = 0;
                prs_arr.forEach(pr_str => {
                    console.log(pr_str)
                    let prs = pr_str.split(' ')
                    let symb = prs.shift()
                    if (symb === '!') {
                        prs.forEach(pr => {
                            if (!JSON.parse(localStorage.getItem('ID_mods')).includes(pr) &&
                                !JSON.parse(localStorage.getItem('CD_mods')).includes(pr) &&
                                !JSON.parse(localStorage.getItem('Others')).includes(pr) &&
                                !JSON.parse(localStorage.getItem('pe_mods')).includes(pr) &&
                                !JSON.parse(localStorage.getItem('core_mods')).includes(pr) &&
                                !Object.values(JSON.parse(localStorage.getItem('pillar_mods'))).includes(pr)
                            ) {
                                undone_prs_mod.push(pr)
                                mod_x++
                            }
                        })
                    } else if (symb === '<' || symb === '%') {
                        let amt = Number(prs.pop())
                        let add_to_undone = true
                        prs.forEach(pr => {                         
                            if (JSON.parse(localStorage.getItem('ID_mods')).includes(pr) ||
                                JSON.parse(localStorage.getItem('CD_mods')).includes(pr) ||
                                JSON.parse(localStorage.getItem('Others')).includes(pr) ||
                                JSON.parse(localStorage.getItem('pe_mods')).includes(pr) ||
                                JSON.parse(localStorage.getItem('core_mods')).includes(pr) ||
                                Object.values(JSON.parse(localStorage.getItem('pillar_mods'))).includes(pr)
                            ) {
                                amt--
                                if (amt === 0) {
                                    add_to_undone = false
                                }
                            }                            
                        })
                        if (add_to_undone) {
                            undone_prs_mod.push(...prs)
                        }
                    }
                })
                undone_prs[str_piece] = undone_prs_mod
                if (JSON.parse(localStorage.getItem('ID_mods')).includes(str_piece) ||
                    JSON.parse(localStorage.getItem('CD_mods')).includes(str_piece) ||
                    JSON.parse(localStorage.getItem('Others')).includes(str_piece) ||
                    JSON.parse(localStorage.getItem('pe_mods')).includes(str_piece) ||
                    JSON.parse(localStorage.getItem('core_mods')).includes(str_piece) ||
                    Object.values(JSON.parse(localStorage.getItem('pillar_mods'))).includes(str_piece)
                ) {
                    alr_done += str_piece
                    add_to_mrs += `<div class="green_fn mod_button greyed">${str_piece}</div>`
                    x--
                } else {
                    let bg_color;
                    let font_color;
                    if (mod_x === 0) {
                        bg_color = 'rgb(36, 137, 20)' 
                        font_color = 'aliceblue'
                    } else if (mod_x === 1) {
                        bg_color = 'rgb(225, 225, 64)'
                        font_color = 'black'
                    } else if (mod_x >= 2) {
                        bg_color = 'rgb(245, 51, 34)'
                        font_color = 'aliceblue'                        
                    }
                    if (target_mods['IDCD_mods']['ID_mods'].includes(str_piece)) {
                        // console.log(`IDDDDDD ${str_piece}${minor_key}`)
                        add_to_mrs += `<div class="orange mod_button default_all_of">${str_piece}<div class="pre_reqs" style="width: 80%; margin-right: auto; background-color: ${bg_color}; color: ${font_color};">prs: ${mod_x}</div></div>`
                    } else if (target_mods['IDCD_mods']['CD_mods'].includes(str_piece)) {
                        // console.log(`CDDDDD ${str_piece}${minor_key}`)
                        add_to_mrs += `<div class="yellow mod_button default_all_of">${str_piece}<div class="pre_reqs" style="width: 80%; margin-right: auto; background-color: ${bg_color}; color: ${font_color};">prs: ${mod_x}</div></div>`
                    } else {
                        add_to_mrs += `<div class="mod_button default_all_of">${str_piece}<div class="pre_reqs" style="width: 80%; margin-right: auto; background-color: ${bg_color}; color: ${font_color};">prs: ${mod_x}</div></div>`
                    }
                    minor_mrs[minor_key]['!'].push(str_piece)
                }
            }
            mrs_left_string += `${add_to_mrs}</div>`
        } else if (symbol === '%' || symbol === '<') {
            to_add_ltr = [] // minor_mrs[minor_key]['%<']
            let amt_left = Number(str_array.pop())
            to_add_ltr.push(amt_left)
            let amt_left_total = amt_left
            let add_to_mrs = ''
            container_no++
            for (const str_piece of str_array) {
                let undone_prs_mod = []
                let prs_arr = all_mods_dict[str_piece]['pre_reqs']
                let mod_x = 0;
                prs_arr.forEach(pr_str => {
                    let prs = pr_str.split(' ')
                    let symb = prs.shift()
                    if (symb === '!') {
                        prs.forEach(pr => {
                            if (!JSON.parse(localStorage.getItem('ID_mods')).includes(pr) &&
                                !JSON.parse(localStorage.getItem('CD_mods')).includes(pr) &&
                                !JSON.parse(localStorage.getItem('Others')).includes(pr) &&
                                !JSON.parse(localStorage.getItem('pe_mods')).includes(pr) &&
                                !JSON.parse(localStorage.getItem('core_mods')).includes(pr) &&
                                !Object.values(JSON.parse(localStorage.getItem('pillar_mods'))).includes(pr)
                            ) {
                                undone_prs_mod.push(pr)
                                mod_x++
                            }
                        })
                    } else if (symb === '<' || symb === '%') {
                        let amt = Number(prs.pop())
                        let add_to_undone = true
                        prs.forEach(pr => {                         
                            if (JSON.parse(localStorage.getItem('ID_mods')).includes(pr) ||
                                JSON.parse(localStorage.getItem('CD_mods')).includes(pr) ||
                                JSON.parse(localStorage.getItem('Others')).includes(pr) ||
                                JSON.parse(localStorage.getItem('pe_mods')).includes(pr) ||
                                JSON.parse(localStorage.getItem('core_mods')).includes(pr) ||
                                Object.values(JSON.parse(localStorage.getItem('pillar_mods'))).includes(pr)
                            ) {
                                amt--
                                if (amt === 0) {
                                    add_to_undone = false
                                }
                            }                            
                        })
                        if (add_to_undone) {
                            undone_prs_mod.push(...prs)
                        }
                    }
                })
                undone_prs[str_piece] = undone_prs_mod                        
                if (JSON.parse(localStorage.getItem('ID_mods')).includes(str_piece) ||
                    JSON.parse(localStorage.getItem('CD_mods')).includes(str_piece) ||
                    JSON.parse(localStorage.getItem('Others')).includes(str_piece) ||
                    JSON.parse(localStorage.getItem('pe_mods')).includes(str_piece) ||
                    JSON.parse(localStorage.getItem('core_mods')).includes(str_piece) ||
                    Object.values(JSON.parse(localStorage.getItem('pillar_mods'))).includes(str_piece)
                ) {
                    alr_done += str_piece
                    add_to_mrs += `<div class="green_fn greyed mod_button button">${str_piece}</div>`
                    overlap.push(str_piece)
                    to_add_ltr.push(str_piece)
                    if (amt_left > 0) {
                        amt_left--
                    }
                } else {
                    let bg_color;
                    let font_color;
                    if (mod_x === 0) {
                        bg_color = 'rgb(36, 137, 20)' 
                        font_color = 'aliceblue'
                    } else if (mod_x === 1) {
                        bg_color = 'rgb(225, 225, 64)'
                        font_color = 'black'
                    } else if (mod_x >= 2) {
                        bg_color = 'rgb(245, 51, 34)'
                        font_color = 'aliceblue'                        
                    }
                    if (target_mods['IDCD_mods']['ID_mods'].includes(str_piece)) {
                        // console.log(`IDDDDDD ${str_piece}${minor_key}`)
                        add_to_mrs += `<div class="orange mod_button button">${str_piece}<div class="pre_reqs" style="width: 80%; margin-right: auto; background-color: ${bg_color}; color: ${font_color};">prs: ${mod_x}</div></div>`
                    } else if (target_mods['IDCD_mods']['CD_mods'].includes(str_piece)) {
                        // console.log(`CDDDDD ${str_piece}${minor_key}`)
                        add_to_mrs += `<div class="yellow mod_button button">${str_piece}<div class="pre_reqs" style="width: 80%; margin-right: auto; background-color: ${bg_color}; color: ${font_color};">prs: ${mod_x}</div></div>`
                    } else {
                        add_to_mrs += `<div class="mod_button button">${str_piece}<div class="pre_reqs" style="width: 80%; margin-right: auto; background-color: ${bg_color}; color: ${font_color};">prs: ${mod_x}</div></div>`
                    }
                }
            }
            minor_mrs[minor_key][`${container_no}`] = to_add_ltr
            if (amt_left < amt_left_total) {
                let percentage = 100 - Math.floor(amt_left/amt_left_total*100)
                add_to_mrs = `<div class="of_drop button_${container_no}" style="background: linear-gradient(to right, rgb(23, 196, 23) ${percentage}%, white ${percentage}%)">${amt_left_total} of...</div><div class="col_div container_${container_no} ${minor_key}">` + add_to_mrs
            } else if (amt_left === 0) {
                add_to_mrs = `<div class="of_drop button_${container_no} green_bg">${amt_left_total} of...</div><div class="col_div container_${container_no} ${minor_key}">` + add_to_mrs                
            } else {
                add_to_mrs = `<div class="of_drop button_${container_no}">${amt_left_total} of...</div><div class="col_div container_${container_no} ${minor_key}">` + add_to_mrs                
            }
            x += amt_left
            mrs_left_string += `${add_to_mrs}</div>`
        }
    }    
    mrs_left_string += '</div>'
    mod_req_button.textContent = `Mod req: ${x}`
    let tile_button = document.querySelector(`#${minor_key}_tile`)
    tile_button.addEventListener('click', () => {
        mod_req_button.textContent = `Mod req: ${x}`
        if (tile_button.classList.contains('green_bg')) {
            tile_button.classList.remove('green_bg')
            selected_minors = selected_minors.filter(minor => minor !== minor_key)
            mod_req_button.classList.remove('green_bg')
            for (let [key, val] of Object.entries(minor_mrs[minor_key]))
                if (key != '!') {
                    let num_req = val.shift()
                    minor_mrs[minor_key][key] = val.filter(mod => overlap.includes(mod))
                    minor_mrs[minor_key][key].unshift(num_req)
                }
        } else {
            if (selected_minors.length === 2) {
                nuh_uh.style.display = 'flex'
                nuh_uh.textContent = 'Cannot select more than 2 minors'
                console.log(selected_minors)
                setTimeout(() => {
                    nuh_uh.style.display = ''
                }, 1900)
            } else {
                pr_window.dataset.currentMinor = minor_key;
                mrs_left.innerHTML = mrs_left_string
                mrs_left.appendChild(got_it)
                mrs_left.appendChild(dowan)
                pr_window.style.display = 'flex'   
            }
        }
    })
})

got_it.addEventListener('click', () => {
    pr_window.style.display = ''
    nuh_uh.textContent = `${selected_minors.length + 1} minor(s) selected`
    nuh_uh.style.display = 'flex'
    setTimeout(() => {
        nuh_uh.style.display = ''
    }, 1200);
    let minor_cur = pr_window.dataset.currentMinor
    selected_minors.push(minor_cur)
    if (minor_mrs[minor_cur]['!']) {
        const x = Number(document.querySelector(`#${minor_cur}_mod_req`).textContent.split(': ')[1])
        let mod_req_button = document.querySelector(`#${minor_cur}_mod_req`)
        mod_req_button.textContent = `Mod req: ${x - minor_mrs[minor_cur]['!'].length}`
        if (x - minor_mrs[minor_cur]['!'].length === 0) {
            mod_req_button.classList.add('green_bg')
        }                    
    }
    document.querySelector(`#${minor_cur}_tile`).classList.add('green_bg')   
})


dowan.addEventListener('click', () => {
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
    } else if (e.target.classList.contains('mod_button') && !e.target.classList.contains('greyed')) {
        let mod_button = e.target
        let parent = mod_button.parentElement
        let num = Number(parent.classList[1].at(-1))
        let minor_key = parent.classList[2]
        console.log(minor_mrs[minor_key])
        let x_div = document.querySelector(`#${minor_key}_mod_req`)
        let num_req = Number(minor_mrs[minor_key][num][0])
        let change_color = document.querySelector(`.button_${num}`)
        if (mod_button.classList.contains('green_bg')) {
            let old = minor_mrs[minor_key][num]
            minor_mrs[minor_key][num] = old.filter(mod => mod !== mod_button.textContent.slice(0, -6))
            let num_now = minor_mrs[minor_key][num].length - 1
            mod_button.classList.remove('green_bg')
            let new_x = Number(x_div.textContent.at(-1)) + 1
            x_div.textContent = `Mod Req: ${new_x}`
            change_color.style.background = `linear-gradient(to right, rgb(23, 196, 23) ${100 * num_now/num_req}%, white ${100 * num_now/num_req}%)`                          

        } else {
            let num_now = minor_mrs[minor_key][num].length - 1
            if (num_req > num_now) {
                num_now++
                minor_mrs[minor_key][num].push(mod_button.textContent.slice(0, -6))
                mod_button.classList.add('green_bg')
                let new_x = Number(x_div.textContent.at(-1)) - 1
                x_div.textContent = `Mod Req: ${new_x}`      
                if (new_x === 0) {
                    x_div.classList.add('green_bg')
                    change_color.style
                }
                change_color.style.background = `linear-gradient(to right, rgb(23, 196, 23) ${100 * num_now/num_req}%, white ${100 * num_now/num_req}%)`                          
            }
        }
    }
})

const fuouttahere = document.querySelector('.back_button')
fuouttahere.addEventListener('click', () => {
    let selected_minors_proper = []
    let hv_not_arr = new Set()
    let hv_not_str = 'You have not selected mods for the following minor(s): \n\n'
    selected_minors.forEach(minor_key => {
        let proper_name = document.querySelector(`#${minor_key}_tile`).firstElementChild.textContent
        selected_minors_proper.push(proper_name)
        for (let [key, arr] of Object.entries(minor_mrs[minor_key])) {
            if (key != '!') {
                if (arr.length - 1 != Number(arr[0])) {
                    hv_not_arr.add(proper_name)
                }
            }
            arr.forEach(mod => {
                if (target_mods['IDCD_mods']['ID_mods'].includes(mod)) {
                    ID_chosen.push(mod)
                } else if (target_mods['IDCD_mods']['CD_mods'].includes(mod)) {
                    CD_chosen.push(mod)
                }
            })
        }
    })
    if (hv_not_arr.size != 0) {
        hv_not_arr.forEach(minor_name => {
            hv_not_str += `${minor_name} \n`
        })
        ID_chosen = JSON.parse(localStorage.getItem('ID_mods'));
        CD_chosen = JSON.parse(localStorage.getItem('CD_mods'));
        nuh_uh.textContent = hv_not_str
        nuh_uh.style.display = 'flex'
        setTimeout(() => {
            nuh_uh.style.display = ''
        }, 4900);
    } else {
        const to_base = {}
        selected_minors_proper.forEach(ril_name => {
            for (let [key, dict] of Object.entries(minor_mrs)) {
                if (ril_name.split(' ')[0] === key) {
                    to_base[ril_name] = dict
                    break
                }
            }
        })
        localStorage.setItem('minors', JSON.stringify(to_base))
        localStorage.setItem('ID_mods2', JSON.stringify(ID_chosen))
        localStorage.setItem('CD_mods2', JSON.stringify(CD_chosen))
        // editing window
        const legend = document.querySelector('.legend')
        legend.style.display = 'none'        
        let notif_string = '<div class="dont_worry" id="the_following">The following mods do not have their pre-reqs met:</div>'
        let let_go = true
        // adding undone pre-reqs to 'Others' and window
        const to_others = JSON.parse(localStorage['Others'])
        Object.values(to_base).forEach(dict => {
            for (let [sym, arr] of Object.entries(dict)) {
                if (sym === '!') {
                    arr.forEach(mod => {
                        if (undone_prs[mod].length != 0) {
                            notif_string += `<div class"i_got_this">${mod}:`
                            let remove_top = true
                            undone_prs[mod].forEach(pr => {
                                let carry_on = true
                                Object.values(to_base).forEach(ffs => {
                                    Object.values(ffs).forEach(arr => {
                                        if (arr.includes(pr)) {
                                            carry_on = false
                                        }
                                    })
                                })
                                if (carry_on) {
                                    notif_string += `<span class="red"> ${pr}</span>`
                                    to_others.push(pr)
                                    let_go = false
                                    remove_top = false
                                }
                            })   
                            if (remove_top) {
                                notif_string = notif_string.slice(0, -`<div class"i_got_this">${mod}:`.length)
                            }                              
                        }                            
                    })
                } else {
                    let cut_arr = arr.slice(1)
                    cut_arr.forEach(mod => {
                        if (undone_prs[mod].length != 0) {
                            notif_string += `<div class"i_got_this">${mod}:`
                            let remove_top = true
                            undone_prs[mod].forEach(pr => {
                                let carry_on = true
                                Object.values(to_base).forEach(ffs => {
                                    Object.values(ffs).forEach(arr => {
                                        if (arr.includes(mod)) {
                                            carry_on = false
                                        }
                                    })
                                })
                                if (carry_on) {
                                    remove_top = false
                                    let_go = false
                                    notif_string += `<span class="red"> ${pr}</span>`
                                    to_others.push(pr)
                                }
                            })   
                            if (remove_top) {
                                notif_string = notif_string.slice(0, -`<div class"i_got_this">${mod}:`.length)
                            }   
                        }
                    })

                }
            }
        })
        notif_string += `<div class="dont_worry">We will add them to your selected modules as <span class="purple">'Others'</span> mods</div>`
        if (let_go) {
            window.location.href = '/ue_mods'
        } else {
            localStorage.setItem('Others2', JSON.stringify(to_others))
            pr_window.style.display = 'flex'
            mrs_left.innerHTML = notif_string
            got_it.textContent = 'OK'
            mrs_left.appendChild(got_it)
            got_it.addEventListener('click', () => {
                window.location.href = '/ue_mods'
            })            
        }

    }
})
setTimeout(() => {
    console.log(undone_prs)
}, 1000)
})();

