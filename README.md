# README

## Levels of Academy service usage

5 - click buttons to "consume" results
4 - click button to enter name after success
1 - click button to return after failure
3 - click button for final submit
2 - click button to start, module started, module step forward
1 - click plate to select a course

Example: getSavedAnanlyticsEvent({ type: 'click', name: 'logo clicked' })
Function available from src/ViewLayer/Hooks/getSavedAnanlyticsEvent.ts

## Plan

## Done

2021-05-31 Implement question limit and pass rate with default and custom settings
2021-05-31 Extend a course template with question limit for a course. For that to add a questions attribute isActive: type boolean
2021-05-31 Extend a course template with rate to pass test
2021-05-29 Extend a question template with attribute isActive: type boolean === false don't show up by default
2021-05-15 Tracking user data is implemented: server API, client support, but not display support
2021-05-01 SEO
2021-05-01 Pagination by two-three questions
2021-05-01 Cc to manager, share in social networks
2021-05-01 Not print
2021-05-01 Rejected. Grey out not related questions
2021-04-20 Assign a special way to load PresentAndSubscribe without connection to router
2021-04-20 SEO, Move II, SSR Server Side Rendering with schema.org
2021-04-20 SEO Move I, register in search engines, provide with basic meta tags
2021-04-20 To move PlayerIframe & ReadeIframe to Frames
2021-04-20 Fix MatrixHome Reader appearance defect
2021-04-20 Text as a content
2021-04-20 False course rating
2021-04-20 Sharing for major social network, move I
2021-04-20 /? Lazy loading, move I
2021-04-20 Load indicators for the plates
2021-04-20 Text content accommodation
2021-04-20 1 question for mobile
2021-04-20 Search/ filtering
2021-04-20 Certificate appearance/ look
2021-04-20 Load PresentAndSubscribe by courseID
2021-04-20 - Make URL work as src for id for youtube with regex function
2021-03-20 Create Yunazone learn Logo, first move
2021-03-20 To make layout and styling close to Youtube
2021-03-10 Integrate icon library React Icons
2021-03-10 Setup main layout
2021-03-09 Setup globalVars fetching
2021-03-08 Setup router, final (or one of the final :) move
2021-03-06 Setup environment and render "Hello World"

## Features and options

`?si=anything` Adding `si` or `search` or `searchInput` set initial `searchInput` for the app. If `si` is not set, then `searchInput` prop is applied from default settings `src/DataLayer/rootStoreDefault.ts`.

`?ln=en` Adding `ln` or `language` set initial language for the app. If `ln` is not set, then `language` prop is applied from default settings `src/DataLayer/rootStoreDefault.ts`.

`?qn=4` Adding `qn` or `nq` limit the number of questions in the test. If `typeof` `qn` or `nq` `string` (for instance `?qn=all`) then the limit becomes equal the total number of questions. If `qn` or `nq` are not set, then `questionNumber` prop is applied from default settings `src/DataLayer/rootStoreDefault.ts`. `qn` stands for question number.

`?pr=0.75` Adding `pr` or `rp` sets custom pass rate to pass tests. It means that if you answered correctly on 3 question of 4 then with pass rate 0.75 you have passed the test. If `pr` or `rp` are not set, then `passRate` prop is applied from default settings `src/DataLayer/rootStoreDefault.ts`. `pr` stands for pass rate.

## MongoDB collections

documents
