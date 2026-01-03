const DigBiz_button = document.querySelector('#dropButDigBiz')
const DigBiz_list = document.querySelector('#dropDigBiz')

DigBiz_button.addEventListener('click', function() {
    if (DigBiz_list.style.display === 'flex') {
        DigBiz_list.style.display = 'none'
    } else {
        DigBiz_list.style.display = 'flex'
    }
})