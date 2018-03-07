# fastify-scaffold

I write a fair number of web apps that use `fastify` (as a web server), `marko` (for templating), and `lasso` (for asset bundling).

I got sick of manually rigging all of those things together, so I wrote this simple CLI that will scaffold together a project with `fastify`, `marko`, and `lasso`, all configured to play nicely.

It's really just for me, but if you like it, cool.

## What it does

`fastify-scaffold` makes a few folders:

### `/plugins`

If you're new to `fastify` I'd suggest becoming more familiar with it, particularly it's plugin-centric architecture.  

`fastify-scaffold` will `fastify.register(require())` every file that it finds in the `/plugins` directory.  So you can really do anything in this folder, I tend to put a lot of routes in here.

### `/pages`

`fastify-scaffold` doesn't do anything magical with this folder, but I put all of my `marko` templates and resources for specific pages here.


### `/components`

A home for `marko` components.

### `/public/assets`

The entire `/public` folder is served at, you guessed it, `/public`.  `/public/assets` is a great place for things like images or static JS libraries (jQuery, perhaps).

### `/public/static`

^ `/public/static` is where `lasso` outputs bundled resources, so this is a pretty important place.

## Usage

First, you'll need to install the CLI.

```bash
git clone git@github.com:charlesread/fastify-scaffold.git
cd fastify-scaffold
npm i
npm link  # you may need to `sudo npm link` depending on how you've installed node
```

Now you're ready to make a project.

```bash
mkdir myProject
cd myProject
fastify-scaffold -r  # --runImmediately, optional
```
 
 More to come.
