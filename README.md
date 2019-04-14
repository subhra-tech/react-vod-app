This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Steps to run
1. Clone the git repo.
2. Open the project directory (the directory that contains the package.json file) and run `npm install`. This will take around 2 minutes to complete.
3. Once that is done, run `npm start` to run the app in the development mode

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Implemented features

# Mandatory features
1. Load from API and display a list of videos in a scrollable horizontal carousel on the home page. Each tile must display a movie title and an associated cover image
2. User should be able to select a video and play it back in full screen. When playback is finished or user quits it, user must be taken back to home page.
3. Display second “Previously watched” carousel on the home page. It must be updated and re-sorted according to the most recently watched video.
NOTE: This feature has been implemented slightly differently - “Previously watched” carousel is displayed in the /history page.
4. The user should be able to use a mouse and keyboard (arrows/Enter keys) to select the video.
5. Layout size adjustment. The application must be able to adjust layout proportionally based on the desktop browser width.
Optional Features.

# Optional features
1. Responsive design. Change carousel to Portrait view grid if application is run on mobile device.
2. Content list refresh button. Each click reloads content from API

# Known bugs
1. The UI has not been tested in large desktop screens.
2. The carousel features are custom made and do not have any unit tests === Definitely has bugs! Plan to write some unit tests for the carousel and will try to make it more configurable and modular and put it up as a npm module. (There aren't many good, open-source and easily configurable React carousels)
3. Using github pages for the first time to deploy a react app - have fixed a known routing issue but there might be some more issues that may come up,


