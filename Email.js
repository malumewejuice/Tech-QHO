// Initialize EmailJS
emailjs.init('kP9Mrn4ObuxFS5ZPU'); // Replace with your EmailJS user ID

const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="w-5 h-5 mr-2 animate-spin" data-lucide="loader"></i> Sending...';
  lucide.createIcons();

  emailjs.send('service_a022oln', 'template_12d5gkk', {
    first_name: form.first_name.value,
    last_name: form.last_name.value,
    email: form.email.value,
    phone: form.phone.value,
    company: form.company.value,
    service: form.service.value,
    message: form.message.value
  }).then(() => {
    successMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    form.reset();
  }).catch(() => {
    errorMessage.classList.remove('hidden');
    successMessage.classList.add('hidden');
  }).finally(() => {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i data-lucide="send" class="w-5 h-5 mr-2"></i> Send Message';
    lucide.createIcons();
  });
});
