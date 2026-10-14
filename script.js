document.addEventListener('DOMContentLoaded',()=>{
 const b=document.querySelector('.menu'),n=document.querySelector('.links');
 b?.addEventListener('click',()=>{const open=n.classList.toggle('open');b.setAttribute('aria-expanded',String(open));});
 document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>{n?.classList.remove('open');b?.setAttribute('aria-expanded','false')}));
 const form=document.querySelector('#contact-form');
 form?.addEventListener('submit',async e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const data=new FormData(form),status=document.querySelector('#form-status');
  const email=String(window.NOVATECH_CONTACT_EMAIL||'').trim();
  const submit=form.querySelector('button[type="submit"]');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
   const subject=encodeURIComponent('درخواست همکاری - '+data.get('name'));
   const body=encodeURIComponent('نام: '+data.get('name')+'\nایمیل: '+data.get('email')+'\n\n'+data.get('message'));
   window.location.href='mailto:'+encodeURIComponent(String(window.NOVATECH_DEMO_RECIPIENT||''))+'?subject='+subject+'&body='+body;
   status.className='';status.textContent='برنامه ایمیل باز می‌شود؛ پیام تا زمان تأیید شما ارسال نخواهد شد.';return;
  }
  submit.disabled=true;status.textContent='در حال ارسال پیام…';
  try{
   const response=await fetch('https://formsubmit.co/ajax/'+encodeURIComponent(email),{method:'POST',headers:{'Accept':'application/json'},body:data});
   const result=await response.json();
   if(!response.ok||result.success===false||result.success==='false')throw new Error('send failed');
   status.className='form-ok';status.textContent='درخواست ثبت شد. اگر اولین پیام است، مالک ایمیل باید فعال‌سازی سرویس را تأیید کند.';form.reset();
  }catch(err){status.className='form-error';status.textContent='ارسال موفق نبود. اتصال اینترنت و تأیید ایمیل مقصد را بررسی کنید.';}
  finally{submit.disabled=false;}
 });
});

// Portfolio category filters, keyboard-accessible native buttons
document.querySelectorAll('[data-filter]').forEach(button=>{button.addEventListener('click',()=>{const selected=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-category]').forEach(card=>{card.hidden=selected!=='all'&&card.dataset.category!==selected;});});});

// Close the mobile menu with Escape or a click outside the navigation.
document.addEventListener('keydown', e => {
 if(e.key !== 'Escape') return;
 const nav=document.querySelector('.links'), toggle=document.querySelector('.menu');
 if(nav?.classList.contains('open')) { nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');toggle?.focus(); }
});
document.addEventListener('click',e=>{
 const nav=document.querySelector('.links'),toggle=document.querySelector('.menu');
 if(nav?.classList.contains('open')&&!nav.contains(e.target)&&!toggle?.contains(e.target)){nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}
});
