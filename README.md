# Tam's Printable Sheet

Hopefully, some day this is going to be a proper print-friendly character sheet for Foundry. 

However, that day is still rather far into the future.

## Current status

* Not finished
* No foundry integration

## Goals

The foundry character sheets I've tried so far have been:

* not very print-friendly
* the PDF export module fills out form-fillable charsheets, and you need to supply it an empty PDF. That's less than ideal.
* not very friendly for those who do offline rolls with real dice

My goals:

* something that can be printed
* feats should calculate how many dice I'm supposed to throw and DISPLAY THAT NUMBER without having to hover over the feat name (something about `:hover` not working when printed out)
  * this also helps when playing D&D on location and foundry turns my Surface Pro into a toaster that runs at silky smooth 60 seconds per frame.
* "useless" feats that contain redundant information should be omitted from the feat list
  * example 1: 'Languages' feat some races and backgrounds tack onto you. That's what language list is for.
  * example 2: 'Cunning action' and 'Fast Hands' (rogue). You can combine both feats into a "bonus actions" feat that lists your bonus actions. Mad savings on that A4 sheet, right there.
* Avrae's character sheet was pretty neat with formatting, let's take design cues from it
* non-useless feats should be abreviated to only the most essential text. When printed on paper, space is at a premium.

Secondary goals:

* Support journal links, like just about every other charsheet

Probably not happening unless I get PRs:

* any kind of interactivity beyond secondary goals.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
