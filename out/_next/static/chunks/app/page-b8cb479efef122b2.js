(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{2488:(n,e,r)=>{"use strict";r.d(e,{N:()=>s});var t=r(851);let o="https://kivipufwogqabxoerpmi.supabase.co",i="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpdmlwdWZ3b2dxYWJ4b2VycG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNTE4MjQsImV4cCI6MjA1ODkyNzgyNH0.jn2hFYd8_AcoYqA6uTO91dAlRt4Q-x0BpYE8vR2q66A";if(!o||!i)throw Error("Supabase URL and Anon Key must be provided in environment variables");let s=(0,t.UU)(o,i)},4944:(n,e,r)=>{"use strict";r.r(e),r.d(e,{default:()=>p});var t=r(5155),o=r(8032),i=r(2177),s=r(2488),a=r(2115),d=r(9980),u=r(5695),l=r(7693);function c(){let{register:n,handleSubmit:e,formState:{errors:r}}=(0,i.mN)({defaultValues:{username:"",password:""}}),[o,c]=a.useState(""),p=(0,u.useRouter)();(0,a.useEffect)(()=>{(()=>{let n="true"===localStorage.getItem("isAdminLoggedIn"),e="true"===localStorage.getItem("isClientLoggedIn");n?p.push("/pages/mainPage"):e&&p.push("/pages/userPage")})()},[p]);let g=async n=>{try{let{username:e,password:r}=n,{data:t,error:o}=await s.N.from("admins").select("username, password").eq("username",e).single();if(t){if(await d.Ay.compare(r,t.password)){c(""),localStorage.setItem("isAdminLoggedIn","true"),p.push("/pages/mainPage");return}c("Неверный пароль");return}let{data:i,error:a}=await s.N.from("clients").select("name, password").eq("name",e).single();if(i){if(i.password===r){c(""),localStorage.setItem("isClientLoggedIn","true"),localStorage.setItem("clientName",i.name),p.push("/pages/userPage");return}c("Неверный пароль");return}c("Пользователь не найден")}catch(n){c("Произошла ошибка при входе"),console.error(n)}};return(0,t.jsx)(l.Nk,{children:(0,t.jsxs)(l.C$,{onSubmit:e(g),children:[(0,t.jsx)(l.hE,{children:"Вход"}),(0,t.jsx)(l.AV,{type:"text",placeholder:"Логин",...n("username",{required:"Логин обязателен"})}),r.username&&r.username.message&&(0,t.jsx)(l.Kw,{children:r.username.message}),(0,t.jsx)(l.AV,{type:"password",placeholder:"Пароль",...n("password",{required:"Пароль обязателен"})}),r.password&&r.password.message&&(0,t.jsx)(l.Kw,{children:r.password.message}),(0,t.jsx)(l.O6,{type:"submit",children:"Войти"}),o&&(0,t.jsx)(l.Kw,{children:o})]})})}let p=()=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.A,{}),(0,t.jsx)(c,{})]})},6789:(n,e,r)=>{Promise.resolve().then(r.bind(r,4944))},7693:(n,e,r)=>{"use strict";r.d(e,{AV:()=>x,C$:()=>g,Kw:()=>h,Nk:()=>p,O6:()=>f,hE:()=>m});var t=r(5933),o=r(4987);function i(){let n=(0,t._)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh; \n  padding: 20px; \n  box-sizing: border-box;\n"]);return i=function(){return n},n}function s(){let n=(0,t._)(["\n  width: 90%;\n  max-width: 400px;\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  padding: 30px; \n  background-color: #f7f7f7;\n  border-radius: 8px;\n  border: 1px solid black;\n  box-sizing: border-box;\n\n  @media (max-width: 600px) {\n    padding: 20px; \n    gap: 15px; \n  }\n"]);return s=function(){return n},n}function a(){let n=(0,t._)(["\n  font-size: 24px;\n  text-align: center;\n  color: #333;\n  margin-bottom: 10px;\n  @media (max-width: 600px) {\n    font-size: 20px;\n  }\n"]);return a=function(){return n},n}function d(){let n=(0,t._)(["\n  padding: 12px;\n  font-size: 16px;\n  border: 1px solid #ddd;\n  border-radius: 4px;\n  outline: none;\n  width: 100%; \n  box-sizing: border-box;\n  &:focus {\n    border-color: #e97c00;\n    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);\n  }\n  @media (max-width: 600px) {\n    padding: 10px; \n    font-size: 14px; \n  }\n"]);return d=function(){return n},n}function u(){let n=(0,t._)(["\n  padding: 12px;\n  font-size: 16px;\n  background-color: #e97c00;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  width: 100%; \n  box-sizing: border-box;\n  &:hover {\n    background-color: #ca6c00;\n  }\n  @media (max-width: 600px) {\n    padding: 10px;\n    font-size: 14px;\n  }\n"]);return u=function(){return n},n}function l(){let n=(0,t._)(["\n  color: red;\n  font-size: 14px;\n  text-align: center;\n  margin: 0;\n\n  @media (max-width: 600px) {\n    font-size: 12px;\n  }\n"]);return l=function(){return n},n}function c(){let n=(0,t._)(["\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n"]);return c=function(){return n},n}let p=o.Ay.div(i()),g=o.Ay.form(s()),m=o.Ay.h2(a()),x=o.Ay.input(d()),f=o.Ay.button(u()),h=o.Ay.p(l());o.Ay.div(c())},8032:(n,e,r)=>{"use strict";r.d(e,{A:()=>m});var t=r(5155),o=r(5933),i=r(4987);function s(){let n=(0,o._)(["\n    background-color: #E97C00;\n    width: 100%;\n    height: 10vh;\n    display: flex;\n    align-items: center;\n"]);return s=function(){return n},n}function a(){let n=(0,o._)(["\n    color: #fff;\n    font-size: 64px;\n    font-weight: 500;\n    margin-left: 62px;\n"]);return a=function(){return n},n}function d(){let n=(0,o._)(["\n    padding: 0.5rem 1rem;\n    background-color: #e97c00;\n    color: white;\n    border: none;\n    border-radius: 4px;\n    cursor: pointer;\n    font-size: 1rem;\n    transition: background-color 0.3s;\n\n    &:hover {\n        background-color: #d16b00;\n    }\n"]);return d=function(){return n},n}let u=i.Ay.header(s()),l=i.Ay.h1(a()),c=i.Ay.button(d());var p=r(5695),g=r(2115);let m=()=>{let n=(0,p.useRouter)(),[e,r]=(0,g.useState)(!1);return(0,g.useEffect)(()=>{let n="true"===localStorage.getItem("isAdminLoggedIn"),e="true"===localStorage.getItem("isClientLoggedIn");r(n||e)},[]),(0,t.jsxs)(u,{children:[(0,t.jsx)(l,{children:"FitChecker"}),e&&(0,t.jsx)(c,{onClick:()=>{localStorage.removeItem("isAdminLoggedIn"),localStorage.removeItem("isClientLoggedIn"),n.push("/")},children:"Выйти"})]})}},9825:()=>{}},n=>{var e=e=>n(n.s=e);n.O(0,[825,851,558,599,441,684,358],()=>e(6789)),_N_E=n.O()}]);