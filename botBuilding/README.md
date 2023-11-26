## How to section

### How to run a "botFamily" script, general approach

1. VS Code > `./botBuilding/` > choose a botFamily
2. VS Code > `./botBuilding/botFamily@someName` > open `runBotFamilyScenario.ts`
3. VS Code > `./botBuilding/botFamily@someName/runBotFamilyScenario.ts` > close to the end find command `@run ts-node ...`
4. Terminal > run command `ts-node ...`
5. VS Code > `botBuilding/2023-08-27-botFamily@contextual/output` >

- open the newly created file
- make a space and save the file
- copy the "requestBody" part

6. VS Code > Go to the server botMock > Paste the "requestBody" part to the bot
7. VS Code > Change "content": "..." to the Change "content": `...`
