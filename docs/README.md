# Self-XSS Protection System Documentation

Here you will find all of the documentation needed to use this system.

## Basic Implementation

`index.js` in the root of this repository contains everything you will need for a basic implementation of this system.

This file is where you will add all of your configuration settings, and this is also the only file you need to include on your website.

For a basic implementation, no backend is needed, but for templated implementations, a backend certainly is needed. However, right now, we'll only focus on basic implementations.

### Universal Paths

On line 9 of `index.js`, you will see a section to add "universal paths". These are the paths on your website which requests should be allowed to automatically and universally. Remember, only XHR requests are intercepted, so images or scripts can be excluded. However, if there are paths that are used on every page of your website, it is best to put those here.

To add a path, you use this format:
```json
{
  "domain": "example.com",
  "path": "/your/path/that/you/choose"
}
```

You can also add an optional `method` property to specify between `GET` and `POST` requests.

### Dynamic Paths

Starting on line 44, you also see a place to add dynamic paths. Here, you will use the `location` object and the `comparePaths` function to add paths. The paths will use the same format as the universal paths, but will be added dynamically.

### Known Domains

Starting on line 53, there is a place to add known domains and their purposes. This is not implemented into anything yet, so you can ignore this for now. 

However, once implemented, you can use this format:

```json
{
  "example.com": {
    "name": "Primary domain"
  },
  "api.example.com": {
    "name": "API service domain"
  }
}
```

## Templated implementation

You can also use templating engines to implement this. In those cases, you still use the same script, but your paths are determined on server-side. 

Templates for templated implementation are also coming soon.
