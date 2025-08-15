import './App.scss';
import { Routes,Route, useLocation } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import About from './containers/about';
import Home from './containers/home';
import Resume from './containers/resume';
import Skills from './containers/skills';
import Contact from './containers/contact';
import Portfolio from './containers/portfolio';
import AdminLogin from './containers/admin/AdminLogin';
import AdminDashboard from './containers/admin/AdminDashboard';
import Navbar from './components/navBar';
import particles from './utils.js/particles';

function App() {

  const location = useLocation()
  

  const renderParticleJsInHomePage = location.pathname === "/"
  const isAdminRoute = location.pathname.startsWith('/admin')
  

  const handleInit = async(main)=>{
    await loadFull(main)
  }
  return (
    <div className='App'>

     {
      renderParticleJsInHomePage && 
      <Particles id="particles" options={particles} init={handleInit}/>
     } 
      
      {!isAdminRoute && <Navbar/>}
      <div className="App__main-page-content">
      <Routes>
        <Route index path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/resume' element={<Resume/>}/>
        <Route path='/skills' element={<Skills/>}/>
        <Route path='/portfolio' element={<Portfolio/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      </Routes>
      </div>
      
    </div>
  );
}

export default App;
