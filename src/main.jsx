import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { UserProvider } from './context/User'; // Corrected the case
import { MediaListProvider } from './context/MediaList'
import { StrictMode } from 'react'
import { SearchResultsProvider } from './context/SearchResults'

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
