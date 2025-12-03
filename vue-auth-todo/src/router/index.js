import {createRouter ,createWebHistory} from 'vue-router';
import login from '../pages/LoginPage.vue';
import dashboard from '../pages/dashboard.vue';


const routes=[
    {path:'/login' ,component :login } ,
    {path:'/' , component :dashboard} ,




]
const router =createRouter ({
    history:createWebHistory() ,
    routes ,
}) ;


export default router;
