import { createRouter, createWebHistory } from 'vue-router';
import SettingsPage from '@/views/SettingsPage.vue';
import GPSDataPage from '@/views/GPSDataPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import VehiclePage from '@/views/VehiclePage.vue';
import HistoryPage from '@/views/HistoryPage.vue';
import VendorPage from '@/views/VendorPage.vue';
import API_KeyPage from '@/views/API_KeyPage.vue';
import Doc_RegisterPage from '@/views/Doc_RegisterPage.vue';
import Doc_GPSDataPage from '@/views/Doc_GPSDataPage.vue';
import Doc_LoginPage from '@/views/Doc_LoginPage.vue';

import Cookies from 'js-cookie';

const routes = [
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage,
        meta: { title: 'Login Page' }
    },
    {
        path: '/gps_data',
        name: 'GPSDataPage',
        component: GPSDataPage,
        meta: { title: 'GPS History' }
    },
    {
        path: '/gps_data/history/:unit_id',
        name: 'HistoryPage',
        component: HistoryPage,
        meta: { title: 'GPS History Detail' }
    },
    {
        path: '/vehicle',
        name: 'VehiclePage',
        component: VehiclePage,
        meta: { title: 'Vehicle' }
    },
    {
        path: '/vendor',
        name: 'VendorPage',
        component: VendorPage,
        meta: { title: 'Vendor' }
    },
    {
        path: '/settings',
        name: 'SettingsPage',
        component: SettingsPage,
        meta: { title: 'Settings' }
    },
    {
        path: '/api_key',
        name: 'API_KeyPage',
        component: API_KeyPage,
        meta: { title: 'API Key' }
    },
    {
        path: '/api_doc_register',
        name: 'Doc_RegisterPage',
        component: Doc_RegisterPage,
        meta: { title: 'API Doc Register' }
    },
    {
        path: '/api_doc_gpsdata',
        name: 'Doc_GPSDataPage',
        component: Doc_GPSDataPage,
        meta: { title: 'API Doc GPSData' }
    },
    {
        path: '/api_doc_login',
        name: 'Doc_LoginPage',
        component: Doc_LoginPage,
        meta: { title: 'API Doc Login' }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title || 'Page';
    if(to.path === '/'){
        next('/gps_data')
    }
    const userCookie = Cookies.get('userToken');
    //console.log('Current Cookie: ',userCookie);

    if (!userCookie && to.path !== '/login') {
        next('/login');
    } else if (userCookie && to.path === '/login') {
        console.log('Has Cookie');
        next('/');
    } else {
        next();
    }

});

export default router;