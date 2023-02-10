# Note

This is my solution to the given task. I did every point from the Definition of Done, and I set a high UX goal. In addition, I took care of accessibility and wrote unit tests. A note on CSS modules, I didn't want to style in pure CSS because classes are not limited in scope, to avoid this I used CSS modules as a quick problem solver for such a small task.

# TODO

Please do not fork the repo, clone it and put it in your own github / save it locally.

Definition of done:

1. Fetch contacts using `apiData` function. Contacts are paginated (10 items in batch).
2. "Load more" button is positioned at the bottom of the list. It fetches next batch and appends it to the existing list.
3. Loading state is handled, display some kind of spinner / loader.
4. Error state is handled. It allows to refetch failed batch.
5. Each contact information card is selectable.
6. Selected contacts have outline around them.
7. Selected card can be deselected.
8. Selected contacts are displayed at the top of the list.
9. List performance is optimized when selecting/deselecting/scrolling cards.

Doing this task in typescript is preferred. However, if you do not feel comfortable with typescript, please change file extension to js.

Decide by yourself if you want to install additional dependencies, or code some functionality manually.
Design choices are yours, but please stick to provided layout pattern. Please have UX in mind when making decisions.

![layout.png](layout.png)

Optional: Add functional / unit tests with testing library of your choice.

Good luck and do not hesitate to ask in case of any questions!

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
