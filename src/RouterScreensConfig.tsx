import React, { ReactElement } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { routes } from './Constants/routes.const'
import { StubInProgress } from './ViewLayer/Screens/StubInProgress'
import { Error404 } from './ViewLayer/Screens/Error404'
import { TemplateScreen } from './ViewLayer/Screens/TemplateScreen'
import { URL_APP_BASE } from './Constants/servers.const'

const PAGES: Record<string, any> = {
  TemplateScreen,
  StubInProgress,
  Error404,
}

export const RouterScreensConfig: React.FunctionComponent<any> = () => {
  const demoPath = '/demo-show.html'
  const rootPath = location.hostname === URL_APP_BASE ? demoPath : ''

  interface IGetRoutes {
    (
      routesArg: {
        path: string
        strict?: boolean
        exact?: boolean
        page: string
        themeDafault: string
      }[]
    ): ReactElement[]
  }

  const getRoutes: IGetRoutes = routesArg =>
    routesArg.map(route => {
      const { path, exact, page, themeDafault } = route
      const Page = PAGES[page]
      return (
        <Route
          key={path}
          exact={exact}
          path={path}
          render={routeProps => {
            const pageProps = { rootPath, routeProps, themeDafault }
            // console.info('RouterScreensConfig [52]', {
            //   pageProps,
            //   rootPath,
            //   routeProps,
            //   hostname: location.hostname,
            //   location,
            // })
            return <Page {...pageProps} />
          }}
        />
      )
    })

  const redirects = [
    { from: `${demoPath}`, to: `${demoPath}/home`, exact: true },
    { from: `/home2`, to: `home`, exact: true },
  ]
  interface IGetRedirects {
    (
      redirectsArg: {
        from: string
        to: string
        strict?: boolean
        exact?: boolean
      }[]
    ): ReactElement[]
  }

  const getRedirects: IGetRedirects = redirectsArg =>
    redirectsArg.map(redirect => {
      const { from: fromPath, to: toPath } = redirect
      const from = `${fromPath}`
      const to = `${toPath}`
      return (() => {
        // console.info('RouterProvider [65] a redirect', {
        //   rootPath,
        //   hostname: location.hostname,
        //   location,
        // })
        return <Redirect {...{ key: `${from}-${to}`, from, to }} />
      })()
    })

  const getError404Route: Function = (): ReactElement => {
    return (
      <Route
        component={() => {
          const pageProps = {
            rootPath,
            routeProps: {
              location: {
                pathname: 'string',
              },
            },
            themeDafault: 'string',
          }
          return <Error404 {...pageProps} />
        }}
      />
    )
  }

  return (
    <BrowserRouter>
      <Switch>
        {getRoutes(routes)}
        {getRedirects(redirects)}
        {getError404Route()}
      </Switch>
    </BrowserRouter>
  )
}
