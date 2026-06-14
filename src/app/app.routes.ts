import { Routes } from '@angular/router';
import { Home } from './Pages/main-layout/home/home';
import { About } from './Pages/main-layout/about/about';
import { MainLayoutComponent } from './Pages/main-layout/main-layout-component/main-layout-component';
import { NotFound } from './Pages/not-found/not-found';
import { Users } from './Pages/dashboard-layout/users/users';
import { Login } from './Pages/auth-layout/login/login';
import { Register } from './Pages/auth-layout/register/register';
import { AuthLayoutComponent } from './Pages/auth-layout/auth-layout-component/auth-layout-component';
import { Blogs } from './Pages/main-layout/blogs/blogs';
import { BlogDetails } from './Components/blog-details/blog-details';
import { DashboardLayoutComponent } from './Pages/dashboard-layout/dashboard-layout.component/dashboard-layout.component';
import { AllBlogs } from './Pages/dashboard-layout/all-blogs/all-blogs';
import { MyBlogs } from './Components/my-blogs/my-blogs';
import { Categories } from './Pages/dashboard-layout/categories/categories';
import { ProfileLayout } from './Pages/main-layout/profile-layout/profile-layout';
import { authGuard } from './Core/Guards/auth-guard'; 
import { adminGuard } from './Core/Guards/admin-guard';
import { UpdateBlog } from './Components/update-blog/update-blog';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full' },
    
    {path: '', component: MainLayoutComponent, children: [
        {path: 'home', component: Home, title: 'DevPulse - Home'},
        {path: 'about', component: About, title: 'DevPulse - About'},
        {path: 'blogs', component: Blogs, title: 'DevPulse - Blogs'},
        {path: 'profile', component: ProfileLayout, title: 'DevPulse - Profile', canActivate: [authGuard], children: [
            {path: '', redirectTo: 'my-blogs', pathMatch: 'full'},
            {path: 'my-blogs', component: MyBlogs},
            {path: 'update', component: UpdateBlog}
        ]},
        {path: 'blogs/:id', component: BlogDetails, title: "DevPulse - BlogDetails"}
    ]},
    {path: 'admin', component: DashboardLayoutComponent, title: 'DevPulse - Dashboard', canActivate: [authGuard, adminGuard], children: [
        {path: '', redirectTo: 'users', pathMatch: 'full' },
        {path: 'all-blogs', component: AllBlogs},
        {path: 'my-blogs', component: MyBlogs},
        {path: 'categories', component: Categories},
        {path: 'users', component: Users},
        {path: 'update/:id', component: UpdateBlog}
    ]},
    {path: 'auth', component: AuthLayoutComponent, children: [
        {path: '', redirectTo: 'login', pathMatch: 'full' },
        {path: 'login', component: Login, title: 'DevPulse - Login'},
        {path: 'register', component: Register, title: 'DevPulse - Register'}
    ]},
    {path: '403', component: NotFound, title: "DevPulse - Forbidden"},
    {path: '**', component: NotFound, title: "DevPulse - NotFound"}
];