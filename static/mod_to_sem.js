const to_add_x = JSON.parse(localStorage.getItem('sems_add_x'))

const sems_x = {
    'sem_1': 5,
    'sem_2': 5 + to_add_x['2'],
    'sem_3': 5 + to_add_x['3'],
    'sem_4': 5 + to_add_x['4'],
    'sem_5': 5 + to_add_x['5'],
    'sem_6': 5 + to_add_x['6'],
    'sem_7': 1,
    'sem_8': 2
}

const all_sem_titles = document.querySelectorAll('.sem_title')
all_sem_titles.forEach(sem_title => {
    let x_span = sem_title.firstElementChild
    x_span.textContent = sems_x[sem_title.id]
    if (sems_x[sem_title.id] === 6) {
        x_span.classList.add('yellow_bg')
    } else if (sems_x[sem_title.id] >= 7) {
        x_span.classList.add('orangered_bg')
    }
})

