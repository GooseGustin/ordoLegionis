import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Titlebar from './Titlebar'

const SiteLayout = () => {
    return (
        <div>
            <Navbar />

            <div className="container">
                <div className="row">
                    <div className="col"><Outlet /></div>
                </div>
            </div>
        </div>
    )
}

export default SiteLayout



// <button class="btn btn-primary d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive">
//     <i class="fa fa-bars" aria-hidden="true"></i>
// </button>

// <div class="alert alert-info d-none d-md-block">Resize your browser to show the responsive offcanvas toggle.</div>

// <div class="offcanvas-md offcanvas-end" tabindex="-1" id="offcanvasResponsive" aria-labelledby="offcanvasResponsiveLabel">
//     <div class="offcanvas-header">
//         <h5 class="offcanvas-title" id="offcanvasResponsiveLabel">Responsive offcanvas</h5>
//         <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasResponsive" aria-label="Close"></button>
//     </div>
//     <div class="offcanvas-body">
//         <p class="mb-0">This is content within an <code>.offcanvas-lg</code>.</p>
//         <ul>
//             <li>
//                 <p>fish</p>
//             </li>
//             <li>
//                 <p>fish</p>
//             </li>
//             <li>
//                 <p>fish</p>
//             </li>
//             <li>
//                 <p>fish</p>
//             </li>
//             <li>
//                 <p>fish</p>
//             </li>
//             <li>
//                 <p></p>
//             </li>
//             <li>
//                 <p></p>
//             </li>
//             <li>
//                 <p></p>
//             </li>
//             <li>
//                 <p></p>
//             </li>
//             <li>
//                 <p></p>
//             </li>
//         </ul>
//     </div>
// </div>




// <!-- Top Navbar -->
//             <nav class="navbar navbar-dark bg-dark fixed-top">
//                 <div class="container-fluid">
//                     <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
//                         ☰ Menu
//                     </button>
//                     <a class="navbar-brand ms-2" href="#">My App</a>
//                 </div>
//             </nav>

//             <!-- Sidebar -->
//             <div class="offcanvas offcanvas-start show d-lg-block bg-light" id="sidebar" tabindex="-1" aria-labelledby="sidebarLabel">
//                 <div class="offcanvas-header">
//                     <h5 class="offcanvas-title" id="sidebarLabel">Sidebar Menu</h5>
//                     <button type="button" class="btn-close d-lg-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                 </div>
//                 <div class="offcanvas-body">
//                     <ul class="nav flex-column">
//                         <li class="nav-item">
//                             <a class="nav-link active" href="#">Home</a>
//                         </li>
//                         <li class="nav-item">
//                             <a class="nav-link" href="#">Profile</a>
//                         </li>
//                         <li class="nav-item">
//                             <a class="nav-link" href="#">Settings</a>
//                         </li>
//                     </ul>
//                 </div>
//             </div>

//             <!-- Main Content -->
//             <div class="container mt-5 pt-4">
//                 <h1>Main Content Area</h1>
//                 <p>Resize the screen to see the sidebar collapse on smaller devices.</p>
//             </div>