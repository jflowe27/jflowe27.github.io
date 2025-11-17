document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.tablink').forEach(btn=>{
        btn.addEventListener('click', ()=>{
            document.querySelectorAll('.gallery').forEach(s=>s.classList.remove('active'));
            document.querySelectorAll('.tablink').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            const target = document.querySelector(btn.dataset.target);
            if(target) target.classList.add('active');
        });
    });

    const form = document.getElementById('contactForm');
    if(form){
        form.addEventListener('submit', function(e){
            e.preventDefault();
            const name = form.querySelector('#name').value.trim();
            const email = form.querySelector('#email').value.trim();
            const message = form.querySelector('#message').value.trim();
            const msgEl = document.getElementById('formMsg');
            if(!name || !email || !message){
                msgEl.textContent = 'Please fill out all required fields.';
                msgEl.style.color = 'crimson';
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailPattern.test(email)){
                msgEl.textContent = 'Please enter a valid email address.';
                msgEl.style.color = 'crimson';
                return;
            }
            msgEl.style.color = 'green';
            msgEl.textContent = 'Thanks -- your message has been received.';
            form.reset();
        });
    }
});