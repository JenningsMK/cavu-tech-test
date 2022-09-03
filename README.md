# CAVU tech test
Please run
```bash
  # Install required packages
  npm i
  
  # To run a locally version
  npm run dev
  
  # Run test causes
  npm run test
```

I have made the departure board and form friendly to assistive technology by using the aria attribute to link the data 
with the labels. I have also place performance marks using the [performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance).

I tend to limit myself on using packages that I feel we don't need based on the requirements for this reason I have only
used normalize.css, where if this was a bigger project or we were to support IE I would look at using axios to make the API calls

## External packages
Here's a list of all the external packages that I am using that weren't part of the nuxt package.
* [normalize.css](https://necolas.github.io/normalize.css/) - I'm using this to help with consistently between different browser styles. 
