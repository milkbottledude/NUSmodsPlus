const xcess_x = document.querySelector('.xcess_x')
let xcess_mod_no = Number(xcess_x.textContent)
// const initial_x = xcess_mod_no
const sems_x = {
    '1': null,
    '2': null,
    '3': null,
    '4': null
}

const continue_button = document.querySelector('.continue_allocate')

const to_stage2 = () => {
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
            num_s.textContent = Number(num_s.textContent) + 1
            xcess_mod_no--
            xcess_x.textContent = xcess_mod_no
            updateContinue()
        }
    })
})

