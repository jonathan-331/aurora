import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { NavBar } from './components/layout/NavBar'
import { HomePage } from './pages/HomePage'
import { SearchPage } from './pages/SearchPage'
import { GeographyPage } from './pages/GeographyPage'
import { DivisionsPage } from './pages/DivisionsPage'
import { OrganizationProfilePage } from './pages/OrganizationProfilePage'
import { CountryProfilePage } from './pages/CountryProfilePage'
import { DivisionProfilePage } from './pages/DivisionProfilePage'
import { StaffProfilePage } from './pages/StaffProfilePage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/"                    element={<HomePage />} />
        <Route path="/search"              element={<SearchPage />} />
        <Route path="/geography"           element={<GeographyPage />} />
        <Route path="/divisions"           element={<DivisionsPage />} />
        <Route path="/organizations/:id"   element={<OrganizationProfilePage />} />
        <Route path="/countries/:id"       element={<CountryProfilePage />} />
        <Route path="/divisions/:id"       element={<DivisionProfilePage />} />
        <Route path="/staff/:id"           element={<StaffProfilePage />} />
      </Routes>
    </>
  )
}
