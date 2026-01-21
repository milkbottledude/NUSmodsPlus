const xcess_x = document.querySelector('.xcess_x')
xcess_x.textContent = (8 - Number(JSON.parse(localStorage.getItem('UE_crs_left'))))/4
let xcess_mod_no = Number(xcess_x.textContent)
// const initial_x = xcess_mod_no
const sems_x = {
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0
}

const continue_button = document.querySelector('.continue_allocate')

const to_stage2 = () => {
    localStorage.setItem('sems_add_x', JSON.stringify(sems_x))
    window.location.href = '/mod_to_sem'
}

const updateContinue = () => {
    if (xcess_mod_no === 0) {
        xcess_x.classList.add('green_fn')
        continue_button.classList.add('green_bg')
        continue_button.classList.add('button')
        continue_button.addEventListener('click', to_stage2)
    } else {
        xcess_x.classList.remove('green_fn')
        continue_button.classList.remove('green_bg')
        continue_button.classList.remove('button')
        continue_button.removeEventListener('click', to_stage2)
    }
}

all_minus_s = document.querySelectorAll('.minus_s')
all_add_s = document.querySelectorAll('.add_s')

all_minus_s.forEach(minus_s => {
    minus_s.addEventListener('click', () => {
        let sem_no = Number(minus_s.id.at(-1))
        let num_s = document.querySelector(`#num_s${sem_no}`)
        if (Number(num_s.textContent) > 0) {
            sems_x[sem_no] = Number(num_s.textContent) - 1
            num_s.textContent = Number(num_s.textContent) - 1
            xcess_mod_no++
            xcess_x.textContent = xcess_mod_no
            updateContinue()
        }
    })
})

all_add_s.forEach(add_s => {
    add_s.addEventListener('click', () => {
        let sem_no = Number(add_s.id.at(-1))
        let num_s = document.querySelector(`#num_s${sem_no}`)
        if (xcess_mod_no > 0) {
            sems_x[sem_no] = Number(num_s.textContent) + 1
            num_s.textContent = Number(num_s.textContent) + 1
            xcess_mod_no--
            xcess_x.textContent = xcess_mod_no
            updateContinue()
        }
    })
})

