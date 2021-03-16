# ApiHub

> Showcasing projects made using free APIs

This project purpose is to combine to some of the educational projects I do related to APIs
Technology Stack Used: React, Redux, Nodejs, Express

# Google Job Search

API Site: https://jobs.github.com/api

GitHub jobs API does not allow accessing jobs from client side apps. That's why I have used Node.js for making API call.

## Features

- Used React Context API for sharing data between components
- Applied lazy loading to the images
- Displayed a placeholder loading image while the actual image is downloading
- Implemented load more functionality

### The reason for adding `encodeURIComponent` for each input field in [GithubJobs.js](server/routes/api/GithubJobs.js) is to convert special characters if any like space to %20.
```js
description = description ? encodeURIComponent(description) : '';
location = location ? encodeURIComponent(location) : '';
```

### By default, the API gives a list of the latest 50 jobs only but we can get more jobs by sending page query parameter with values 1, 2, 3, etc.
So we are validating the page query parameter by the following code

```js
if (page) {
  page = parseInt(page);
  page = isNaN(page) ? '' : `&page=${page}`;
}
```

### Creating the API URL by combining all parameter values:

```js
const jobs = await axios.get(
  `/api/jobs/github?description=${description}&location=${location}${full_time}${page}`
);
```
The `description` and `location` are optional parameters


### The data is sorted by creation date in the [initiateGetJobs](client/src/actions/jobs.js) function:
```js
const sortedJobs = jobs.data.sort(
      (a, b) => moment(new Date(b.created_at)) - moment(new Date(a.created_at))
);
```

> **React does not directly display the HTML content when used inside the JSX Expression to avoid the Cross Site Scripting (XSS) attacks. React escapes all the html content provided in the JSX Expression which is written in curly brackets so it will be printed as it is.**

The `description` and `how to apply` fields that we get from the API response contains the HTML content and and inorder to display the HTML content if its the requirement as in our case, we need to use a special prop called `dangerouslySetInnerHTML` and pass it the HTML in the `__html` field inside [JobDetails.js](client/src/components/JobDetails.js) as shown below:
```html
<div className="job-description" dangerouslySetInnerHTML={{ __html: description }}></div>
```
and
```html
<div dangerouslySetInnerHTML={{ __html: how_to_apply }}></div>
```
### Using Context API to Avoid Prop Drilling

Created a [context](client/src/context/jobs.js) which we can use to access data in other components

```js
import React from 'react';

const JobsContext = React.createContext();

export default JobsContext;
```
Inside the [Jobs.js](client/src/pages/Jobs.js) I've imported the JobsContext at the top of the file
and created a value object with the data we want to access in other components

```js
import JobsContext from '../context/jobs';

const value = {
  details: jobDetails,
  onSearch: handleSearch,
  onResetPage: handleResetPage,
};
```
then returned the JobContext provider with the value created

```js
<JobsContext.Provider value={value}>...</JobsContext.Provider>
```
To access the data from value object for example inside the [Search.js](client/src/components/Search.js) form component
we need to import `useContext` hook at the top inorder to destruct the passed `handleSearch` function in the context provider.

```js
import React, { useState, useContext } from 'react';

const { onSearch } = useContext(JobsContext);
```
### Reset Scroll Position

When the user clicks on any of the displayed jobs, the JobDetails component will automatically be displayed at the top of the page.

```js
const handleItemClick = (jobId) => {
  ...
  window.scrollTo(0, 0);
};
```

### Custom Loader Component For Overlay using React Portal

This custom loader using React Portal is used to display an overlay so the user will not be able to click on any of the job when loading and we will also see a clear indication of loading.

Inside [index.html](client/public/index.html) and alongside the div with id `root` I've added another div with id `loader`

```html
<div id="root"></div>
<div id="loader"></div>
```
The `ReactDOM.createPortal` method which we have used in [Loader.js](client/src/components/Loader.js) will create a loader inside the div with id `loader` so it will be outside out `React` application DOM hierarchy and hence we can use it to provide an overlay for our entire application. This is the primary reason for using the `React Portal` for creating a loader.

So even if we will include the [Loader.js](client/src/components/Loader.js) component in [Jobs.js](client/src/pages/Jobs.js) file, it will be rendered outside all the divs but inside the div with id `loader`.

In the [Loader.js](client/src/components/Loader.js) file, we have first created a div where will add a loader message

```js
const [node] = useState(document.createElement('div'));
```
Then, we are adding the `message class` to that div and adding that div to the div added in `index.html`

```js
document.querySelector('#loader').appendChild(node).classList.add('message');
```
and based on the show prop passed from the [Jobs.js](client/src/pages/Jobs.js) component, we will add or remove the `hide class` and then finally we will render the `Loader component` using

```js
ReactDOM.createPortal(props.children, node);
```
Then we add or remove the `loader-open class` to the body tag of the page which will disable or enable the scrolling of the page

```js
document.body.classList.add('loader-open');
document.body.classList.remove('loader-open');
```

Here, the data we will pass in between the opening and closing `Loader` tag will be available inside `props.children` so we can display a simple loading message or we can include an image to be shown as a loader.

```js
import Loader from '../components/Loader';
<Loader show={isLoading}>Loading...</Loader>
```
I also imported the Loader component inside [App.js](client/src/App.js) since we have multiple pages and we don't want the loader to show on pages which does not contain the loader and passes false value through props to not display it.

```js
<Loader show={false} />
```

### Lazy Loading Images Functionality

Lazy loading images: until the user does not scroll to the job in the list, the image will not be downloaded. This will load the page faster and save internet bandwidth.

As you are aware now when we are requesting from Jobs API, we are getting a list of 50 jobs initially and as we are showing the company logo on the list page, the browser has to download those 50 images which may take time so you might see the blank area sometimes before the image is fully loaded.

Also if you are browsing the application on a mobile device and you are using a slow network connection, it may take more time to download the images and those much `MB` of unnecessary images browser may download even if you are not scrolling the page to see other jobs listing which is not good user experience.

I've created an [observer.js](client/src/custom-hooks/observer.js) in which I am using an Intersection Observer API to identify which area of the page is currently displayed and only images in that area will be downloaded.

> [Intersection Observer Helpful Article](https://levelup.gitconnected.com/what-is-so-special-about-intersection-observer-api-in-javascript-f2430a159fa7)

So in the [observer.js](client/src/custom-hooks/observer.js) file, we are taking a `ref` and adding that `ref` to be observed by the observer

```js
observer.observe(current);
```

If the image with added `ref` is displayed on screen then we are calling `setIsVisible(true);` and we are returning the `isVisible` value from this custom hook and based on the `isVisible` flag we can decide if we want to display the image or not.

To use this costume hook I've imported the [useObserver](client/src/custom-hooks/observer.js) and `useRef hook` inside the [ItemCard.js](client/src/components/ItemCard.js)

```js
import React, { useRef } from 'react';
import useObserver from '../custom-hooks/observer';
```
Then created a `ref` which we can assign to the image and call the custom hook and get the isVisible value

```js
const imageRef = useRef();
const [isVisible] = useObserver(imageRef);

<div className='Company__Logo' ref={imageRef}>
  {isVisible && (
    <Image
      className='mr-3'
      src={company_logo}
      alt={company}
      height='150'
      width='150'
      draggable='false'
    />
  )}
</div>
```
### Default Loading Image

Default loading image is an alternative image which will be replaced by the original image once it's completely downloaded.

This way we can avoid the empty space and is a widely used way of not showing the empty image area.

The website used for creating the image is [placeholder](https://placeholder.com/).

You can specify the `width`, `height`, and `text` of the image you want.

The URL used to generate that loading image is this

```text
https://via.placeholder.com/150x150?text=Loading
```

I've created [Image.js](client/src/components/Image.js) component in which we are initially displaying the loading image instead of the actual image.

The `img` tag has `onLoad` handler added which will be triggered when the image is completely loaded where we set the `isVisible` flag to true and once it's true we are displaying that image and hiding the previous loading image by using display CSS property.

```js
<img
  src={src}
  alt={alt}
  width='150'
  height='150'
  onLoad={changeVisibility}
  style={{ display: isVisible ? 'inline' : 'none' }}
  {...props}
/>
```

---

# Hacker News Clone

We will be using the Hackernews API from [this url](https://github.com/HackerNews/API).

API                                   | Link
--------------------------------------| --------------------------------------------------------------
API to get top stories, use this URL  | https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
API to get new stories, use this URL  | https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty
API to get best stories, use this URL | https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty

Each of the above stories API returns only an array of IDs representing a story.

So to get the details of that particular story, we need to make another API call.

API to get story details, use this URL: https://hacker-news.firebaseio.com/v0/item/story_id.json?print=pretty

For example: https://hacker-news.firebaseio.com/v0/item/26061935.json?print=pretty

In the [getStories function](client/src/utils/hackerNewsApis.js) we pass the type of story we want (`top`, `new` or `best`). Then we make an API call to the respective `.json` URL provided at the start of this article.

Note that we have declared the function as `async` so we can use the `await` keyword to call the API and wait for the response to come.

As the `axios` library always returns the result in the `.data` property of the response, we take out that property and rename it to `storyIds` because the API returns an array of story IDs.

```js
const res = await axios.get(`${BASE_API_URL}/${type}stories.json`);
const storyIds = res.data;
);
```
Since we get an array of story IDs back, instead of making separate API calls for each `id` and then waiting for the previous one to finish, we use the `Promise.all` method to make API calls simultaneously for all the story ids.

```js
const stories = await Promise.all(storyIds.slice(0, 30).map(getStory));

// .map(getStory) is a simplified version of .map((storyId) => getStory(storyId))
```
Here, we use the Array slice method to take only the first 30 story ids so the data will load faster.

Then we use the Array map method to call the [getStory function](client/src/utils/hackerNewsApis.js) to make an API call to the individual story item by passing the `storyId` to it.

In the API response, we get the time of the story in seconds. So in the [Story component](client/src/components/HackerNews/Story.js), we multiply it by 1000 to convert it to milliseconds so we can display the correct date in proper format using JavaScript's `toLocaleDateString` method:

```js
{new Date(time * 1000).toLocaleDateString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
})}
```

---

# Credits

Project                        | Article Link
-------------------------------| --------------------------------------------------------------
Github Job Search              | https://dev.to/myogeshchavan97/build-an-amazing-job-search-app-using-react-42p
Hacker News Clone 01           | https://www.freecodecamp.org/news/how-to-build-a-hacker-news-clone-using-react/
Hacker News Clone 02           | https://yogeshchavan.hashnode.dev/how-to-implement-caching-for-hacker-news-app-in-react

---

# Quick Start 🚀

### Install server dependencies

```bash
cd server
npm install
```

### Install client dependencies

```bash
cd client
npm install
```

### Run both Express & React inside server directory

```bash
cd server
npm run dev
```

---

## App Info

### Author

TheGrindev
[Elias Afara](https://eliasafara.github.io/)


### License

This project is licensed under the MIT License
