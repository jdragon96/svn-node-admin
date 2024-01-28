// import * as ReactDOM from "react-dom";
import * as ReactDOM from 'react-dom/client';
import { ReactNode } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  BrowserRouter as Router
} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import * as Icon from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import * as Layout from "@/page/layout/MainLayout";
import * as Style from "@/shared/theme/LayoutStyle";
import * as Theme from "@/shared/theme/createMyTheme";
import * as SystemModel from "@/shared/model/SystemModel";
import {Account} from "@/page/svn/account";
import { Repository } from "@/page/svn/repository";

const menu: SystemModel.AppRouter[] = [
  {
    element: <>안녕</>,
    path: '/',
    title: 'SVN Management',
    clickable: false,
    child: [
      {
        element: <Account/>,
        path: '/account',
        title: 'Account',
        child: [],
        icon: <></>,
        clickable: true
      },
      {
        element: <></>,
        path: '/repository',
        title: 'Repository',
        child: [],
        icon: <></>,
        clickable: true
      }
    ],
    icon: <Icon.Dns />
  }
];

const theme = createTheme({
  palette: Style.dark,
  shape: { borderRadius: 2 },
});

const generateRoute = (menu: SystemModel.AppRouter[]): ReactNode => {
  return menu.map((route: SystemModel.AppRouter, index: number) => (
    <>
      <Route
        index
        path={route.path}
        element={route.element}
        key={index}/>
      {
        generateRoute(route.child)
      }
    </>
    ));
};


const main = () => {
  return (
    <ThemeProvider theme={theme}>
      {/* https://mui.com/material-ui/react-css-baseline/ */}
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Layout.MainLayout menu={menu} />}>
            <Route path="/account" element={<Account/>}/>
            <Route path="/repository" element={<Repository/>}/>
            {/* <Route path="/" element={<Layout.MainLayout menu={menu} />}/> */}
            {/* {generateRoute(menu)} */}
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    {/* https://mui.com/material-ui/react-css-baseline/ */}
    <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<Layout.MainLayout menu={menu} />}>
          <Route path="/account" element={<Account/>}/>
          <Route path="/repository" element={<Repository/>}/>
          {/* <Route path="/" element={<Layout.MainLayout menu={menu} />}/> */}
          {/* {generateRoute(menu)} */}
        </Route>
      </Routes>
    </Router>
  </ThemeProvider>
);

// ReactDOM.render(
//   main(),
//   document.getElementById("docs")
// );