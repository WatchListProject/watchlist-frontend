import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/user.jsx'
import { MediaListProvider } from './context/MediaList.jsx'
import { StrictMode } from 'react'
import { SearchResultsProvider } from './context/SearchResults.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <UserProvider>
      <MediaListProvider>
        <SearchResultsProvider>
          <App />
        </SearchResultsProvider>
      </MediaListProvider>
    </UserProvider>
  </StrictMode>
)
