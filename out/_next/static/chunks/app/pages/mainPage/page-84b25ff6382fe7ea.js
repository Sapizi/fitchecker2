(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[124],{2488:(n,e,t)=>{"use strict";t.d(e,{N:()=>a});var r=t(851);let i="https://kivipufwogqabxoerpmi.supabase.co",o="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpdmlwdWZ3b2dxYWJ4b2VycG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNTE4MjQsImV4cCI6MjA1ODkyNzgyNH0.jn2hFYd8_AcoYqA6uTO91dAlRt4Q-x0BpYE8vR2q66A";if(!i||!o)throw Error("Supabase URL and Anon Key must be provided in environment variables");let a=(0,r.UU)(i,o)},4355:(n,e,t)=>{"use strict";t.d(e,{r:()=>a});var r=t(5155),i=t(5695),o=t(2115);let a=function(n){let e=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return function(t){let a=(0,i.useRouter)();return(0,o.useEffect)(()=>{(()=>{let n="true"===localStorage.getItem("isAdminLoggedIn"),t="true"===localStorage.getItem("isClientLoggedIn");if(!n&&!t){a.push("/");return}e&&!n&&a.push("/")})()},[a]),(0,r.jsx)(n,{...t})}}},5628:(n,e,t)=>{"use strict";t.d(e,{m:()=>l});var r=t(5933),i=t(4987);function o(){let n=(0,r._)(["\n    margin-left: 15%;\n    margin-top: 3%;\n    margin-right: 15%;\n"]);return o=function(){return n},n}function a(){let n=(0,r._)(["\n  @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');\n\n  * {\n    margin: 0;\n    padding: 0;\n    font-family: 'Comfortaa', sans-serif;\n  }\n"]);return a=function(){return n},n}let l=i.Ay.div(o());(0,i.DU)(a())},8032:(n,e,t)=>{"use strict";t.d(e,{A:()=>m});var r=t(5155),i=t(5933),o=t(4987);function a(){let n=(0,i._)(["\n    background-color: #E97C00;\n    width: 100%;\n    height: 10vh;\n    display: flex;\n    align-items: center;\n"]);return a=function(){return n},n}function l(){let n=(0,i._)(["\n    color: #fff;\n    font-size: 64px;\n    font-weight: 500;\n    margin-left: 62px;\n"]);return l=function(){return n},n}function s(){let n=(0,i._)(["\n    padding: 0.5rem 1rem;\n    background-color: #e97c00;\n    color: white;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    font-size: 1rem;\n    transition: background-color 0.3s;\n\n    &:hover {\n        background-color: #d16b00;\n    }\n"]);return s=function(){return n},n}let d=o.Ay.header(a()),c=o.Ay.h1(l()),u=o.Ay.button(s());var x=t(5695),p=t(2115);let m=()=>{let n=(0,x.useRouter)(),[e,t]=(0,p.useState)(!1);return(0,p.useEffect)(()=>{let n="true"===localStorage.getItem("isAdminLoggedIn"),e="true"===localStorage.getItem("isClientLoggedIn");t(n||e)},[]),(0,r.jsxs)(d,{children:[(0,r.jsx)(c,{children:"FitChecker"}),e&&(0,r.jsx)(u,{onClick:()=>{localStorage.removeItem("isAdminLoggedIn"),localStorage.removeItem("isClientLoggedIn"),n.push("/")},children:"Выйти"})]})}},8581:(n,e,t)=>{Promise.resolve().then(t.bind(t,9678))},9678:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>x});var r=t(5155),i=t(2115),o=t(8032),a=t(9960),l=t(5628),s=t(2488),d=t(4355),c=t(6874),u=t.n(c);let x=(0,d.r)(()=>{let[n,e]=(0,i.useState)(null),[t,d]=(0,i.useState)(!0),[c,x]=(0,i.useState)({date:"",time:""}),[p,m]=(0,i.useState)([]);return(0,i.useEffect)(()=>{(async()=>{try{d(!0);let{data:n,error:t,count:r}=await s.N.from("clients").select("*",{count:"exact"});if(t)throw t;e(null!=r?r:0)}catch(n){console.error("Ошибка при загрузке данных:",n.message)}finally{d(!1)}})()},[]),(0,i.useEffect)(()=>{let n=()=>{let n=new Date;x({date:n.toLocaleDateString("ru-RU",{day:"2-digit",month:"2-digit",year:"numeric"}).replace(/\./g,"/"),time:n.toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit",hour12:!1})})};n();let e=setInterval(n,1e3);return()=>clearInterval(e)},[]),(0,i.useEffect)(()=>{(async()=>{let n=new Date;n.setHours(0,0,0,0);let e=new Date;e.setHours(23,59,59,999);let{data:t,error:r}=await s.N.from("workouts").select("id, workout_name, workout_datetime, trainers(trainer_name)").gte("workout_datetime",n.toISOString()).lte("workout_datetime",e.toISOString()).order("workout_datetime",{ascending:!0}).limit(3);r?console.error("Ошибка при загрузке занятий:",r.message):m(t)})()},[]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.A,{}),(0,r.jsxs)(l.m,{children:[(0,r.jsx)(a.hE,{children:"Главная"}),(0,r.jsxs)(a.DF,{children:[(0,r.jsxs)(a.Z0,{children:[t?(0,r.jsx)(a.an,{}):(0,r.jsx)(a.an,{children:null!=n?n:0}),(0,r.jsx)(a.c5,{children:"Количество клиентов"}),(0,r.jsx)(a.rk,{href:"/pages/addClient",children:"Добавить"})]}),(0,r.jsxs)(a.$v,{children:[(0,r.jsx)(a.zA,{children:"Сегодняшняя дата"}),(0,r.jsx)(a.zA,{children:c.date}),(0,r.jsx)(a.zA,{children:c.time}),(0,r.jsx)(a.zA,{children:"Занятия на сегодня:"}),0===p.length?(0,r.jsx)(a.zA,{children:"Занятий нет"}):p.map(n=>{var e;return(0,r.jsxs)(a.zA,{children:[new Date(n.workout_datetime).toLocaleTimeString("ru-RU",{hour:"2-digit",minute:"2-digit"})," — ",n.workout_name," (",(null===(e=n.trainers)||void 0===e?void 0:e.name)||"Тренер не указан",")"]},n.id)}),(0,r.jsx)(u(),{href:"/pages/addAdmin",children:"Добавить администратора"})]}),(0,r.jsxs)(a.xl,{children:[(0,r.jsx)(a.z9,{href:"/pages/addWorkout",children:"Добавить занятие"}),(0,r.jsx)(a.z9,{href:"/pages/clientsList",children:"Список клиентов"}),(0,r.jsx)(a.z9,{href:"/pages/workoutList",children:"Список занятий"})]})]})]})]})},!0)},9960:(n,e,t)=>{"use strict";t.d(e,{$v:()=>k,DF:()=>f,Z0:()=>b,an:()=>y,c5:()=>z,hE:()=>w,rk:()=>A,xl:()=>v,z9:()=>I,zA:()=>j});var r=t(5933),i=t(6874),o=t.n(i),a=t(4987);function l(){let n=(0,r._)(["\n  display: flex;\n  justify-content: space-between;\n  gap: 20px;\n  flex-wrap: wrap; \n\n  @media (max-width: 768px) {\n    flex-direction: column; \n    align-items: center;\n    gap: 15px;\n  }\n"]);return l=function(){return n},n}function s(){let n=(0,r._)(["\n  font-size: 46px;\n\n  @media (max-width: 768px) {\n    font-size: 32px; \n    text-align: center;\n  }\n"]);return s=function(){return n},n}function d(){let n=(0,r._)(["\n  width: 460px;\n  height: 626px;\n  border: 2px solid black;\n  border-radius: 10px;\n  box-sizing: border-box;\n\n  @media (max-width: 768px) {\n    width: 90%; \n    max-width: 400px;\n    height: auto; \n    padding: 20px; \n  }\n"]);return d=function(){return n},n}function c(){let n=(0,r._)(["\n  font-size: 300px;\n  margin-left: 36px;\n  display: block; \n\n  @media (max-width: 768px) {\n    font-size: 150px; \n    margin-left: 0;\n    text-align: center;\n  }\n"]);return c=function(){return n},n}function u(){let n=(0,r._)(["\n  margin-top: 110px;\n  font-size: 28px;\n  margin-left: 36px;\n\n  @media (max-width: 768px) {\n    margin-top: 20px; \n    font-size: 24px;\n    margin-left: 0;\n    text-align: center;\n  }\n"]);return u=function(){return n},n}function x(){let n=(0,r._)(["\n  display: block;\n  text-align: center;\n  margin-left: 33px;\n  width: 384px;\n  height: 100px;\n  background-color: #e97c00;\n  align-content: center;\n  border-radius: 10px;\n  color: white;\n  font-size: 36px;\n  text-decoration: none;\n  margin-top: 26px;\n  box-sizing: border-box;\n\n  @media (max-width: 768px) {\n    width: 90%; \n    max-width: 350px;\n    height: 80px; \n    margin-left: auto;\n    margin-right: auto;\n    font-size: 24px;\n  }\n"]);return x=function(){return n},n}function p(){let n=(0,r._)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n\n  @media (max-width: 768px) {\n    width: 90%;\n    max-width: 400px;\n  }\n"]);return p=function(){return n},n}function m(){let n=(0,r._)(["\n  font-size: 20px;\n  color: black;\n  margin: 5px 0;\n\n  @media (max-width: 768px) {\n    font-size: 18px;\n  }\n"]);return m=function(){return n},n}function g(){let n=(0,r._)(["\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n\n  @media (max-width: 768px) {\n    width: 90%;\n    max-width: 400px;\n    align-items: center;\n    gap: 15px;\n  }\n"]);return g=function(){return n},n}function h(){let n=(0,r._)(["\n  display: block;\n  text-align: center;\n  margin-left: 33px;\n  width: 384px;\n  height: 165px;\n  background-color: #e97c00;\n  align-content: center;\n  border-radius: 10px;\n  color: white;\n  font-size: 28px;\n  text-decoration: none;\n  margin-top: 26px;\n  box-sizing: border-box;\n\n  @media (max-width: 768px) {\n    width: 90%;\n    max-width: 350px;\n    height: 100px; \n    margin-left: auto;\n    margin-right: auto;\n    font-size: 24px;\n    margin-top: 0;\n  }\n"]);return h=function(){return n},n}let f=a.Ay.div(l()),w=a.Ay.h1(s()),b=a.Ay.div(d()),y=a.Ay.span(c()),z=a.Ay.p(u()),A=(0,a.Ay)(o())(x()),k=a.Ay.div(p()),j=a.Ay.p(m()),v=a.Ay.div(g()),I=(0,a.Ay)(o())(h())}},n=>{var e=e=>n(n.s=e);n.O(0,[825,851,874,441,684,358],()=>e(8581)),_N_E=n.O()}]);