import { publicRouter } from './Router';
import GlobalStyles from './components/GlobalStyles';

import { BrowserRouter as BRoutes, Routes, Route } from 'react-router-dom';
import HandleLoginGoogle from './context/AuthProvider';
import { Fragment } from 'react';
import AppProvider from './context/AppProvider';



function App() {
  return (
    <BRoutes>
      <div className='app'>
        <GlobalStyles>
          <HandleLoginGoogle>
            <AppProvider>
              <Routes>
                {publicRouter.map((page, index) => {
                  const Page = page.component;
                  let Wrapper = Fragment
                  if (page.layout) {
                    Wrapper = page.layout
                  }
                  return <Route key={index} path={page.path} element={<Wrapper><Page /></Wrapper>} />;
                })}
              </Routes>
            </AppProvider>

          </HandleLoginGoogle>
        </GlobalStyles>
      </div>
    </BRoutes>
  );
}

export default App;
