const pillar_mods = JSON.parse(localStorage.getItem('pillar_mods'))
const test = document.querySelector('.test')

fetch('../jsons/target_mods.json')
    .then(res => res.json())
    .then(data => test.textContent = JSON.stringify(data['UE_mods']))
