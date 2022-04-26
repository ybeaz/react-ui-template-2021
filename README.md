# README React Typescript Template

## TODO

```




in less files and beyond __ > _

```

## Description

created 2021, updated 2022-03-24

### Architecture / development notes

1. Add a new screen:
   1. Use one of two templates
      - TemplateScreen (more customized for a screen) > `TemplateScreen.tsx` && `TemplateScreen.less` from `src/ViewLayer/Screens/`
      - Template (more universal) `Template.tsx` && `Template.less` from `src/ViewLayer/Components/`
   2. Add a link to `....less` file into `src/ViewLayer/Styles/index.style.less`
   3. Add a router into `src/Constants/routes.const.ts`
   4. Add a component import and property to the object into `src/RouterScreensConfig.tsx`
   5. Add 2.4 to the screen component
2. Manage color themes `GLOBAL_THEME.colors`, `BRIGHTNESS` and `ALPHAS`
   1. Setup colors in `src/Constants/globalTheme.const.ts` Pay attention [0, 0, 12.5, 1] means for HSLA [hue, saturation, lightness, alphas] and for RGBA [red, green, blue, alpha]
   2. Set a default theme in `rootStoreDefault.globalVars.theme` in `src/DataLayer/rootStoreDefault.ts`
   3. Global theme has been added with `<GlobalTheme>` in `src/initializeBrowserApp.tsx`, and then with `getCreatedGlobalStyle` in `src/ViewLayer/Styles/getCreatedGlobalStyle.ts`
   4. Change default theme on the screen level such has been done in `useEffect(...)` in `SkillExchangeSeach.tsx`
   5. Add a custom theme color to the element in `getCreatedGlobalStyle` in `src/ViewLayer/Styles/getCreatedGlobalStyle.ts`
   6. You can specify a separate colors for each theme as it is done for example for `.ModalFrames ._content`
3. Input values. Passing input values from input component is implemented by event.target.value in handleEvents function of the related property name in `src/DataLayer/index.handleEvents.ts`
4. Passing actions. Passing an action is made through the secuence `Component` => `handleEvents` => `dispatch` => `reducer`
5. Adding an modal window is made by the following:
   1. Add `ModalFrames` component to `HeaderFrame` component (once)
   2. Add a specific new component to `CHILDREN` object in the `ModalFrames` component
   3. Add an object to the array that controls modal window appearance to state tree `state`: { `componentsState`: {
      `modalFrames`: [ ... ]
6. A developer is better to use `Template` for creating
   1. functional Components
   2. handlers
   3. reducers
   4. sagas
   5. connectors
7. Using predefined mixins
   1. `src/ViewLayer/Styles/mixins.style.less` defines a set of mixins for paddings and margins with a pattern `.p_y_x`, `.p_t_r_b_l`, `.m_y_x`, `.m_t_r_b_l`

## To run the project

1. Build Docker image from `docker-compose-mongodb.yml`
   - See here [`Docker.md`](https://github.com/ybeaz/manuals/blob/main/Docker.md)
2. Run Server
   - in server directory run `yarn dev`
3. Run application
   - here run `yarn dev:start` and to restart run `yarn dev`
