---
layout: default
title: "Jekyll on GitHub Pages"
permalink: /jekyll
---

Inspired by a friend of mine, I wanted to create a site for my own personal use that met the following needs:
* Not require me to maintain any kind of public facing server or infrastructure
* Be fast and efficient
* Easy to maintain
* Most importantly, be free of cost (except for a domain name, which is optional)

## Github Pages
Perhaps the easiest part of all of this was creating a site out of a repo on Github.
It's as simple as: create a repo, go to settings, Github Pages, select a branch and save.
That's it, the repo will be accessible at: `$user.github.io/repo`

Furthermore, if you add a custom domain and update it's DNS accordingly, you can have a genuine website with even an SSL

Setting up DNS was really easy. Github has a help article going into more detail  
<https://help.github.com/en/articles/setting-up-an-apex-domain#configuring-a-records-with-your-dns-provider>

* Update the `A` records for your domain to:
  * 185.199.108.153
  * 185.199.109.153
  * 185.199.110.153
  * 185.199.111.153

* Set www as a `C-NAME` for the non-www domain

## Jekyll on Debian
I decided to go with Jekyll since Github Pages supports rendering it natively, without the need to only publish the output directory that is common with many other static site generators.

Install Ruby
```
sudo apt install git ruby-full build-essential zlib1g-dev
```

Configure Ruby
```bash
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Install Ruby Gems
```
gem install jekyll bundler
```

Clone existing repo
```
cd ~/
git clone https://github.com/$User/$Repo.git $Site
```

Create a new site
```
cd ~/
jekyll new <SiteName> --force
cd <SiteName>
```

Check for updates
<!-- bundle add webrick -->

```
bundle install
bundle update
```

Start Jekyll server
```
bundle exec jekyll serve --watch --force_polling --host=<IP>
```

Load Jekyll site  
`http://127.0.0.1:4000`

## Working with Jekyll

It takes a little bit, but working with Jekyll is very easy.  
I've found these resources helpful in getting to understand Jekyll.  
<https://jekyllrb.com/docs/>  
<https://jekyllrb.com/docs/variables/>  
<https://idratherbewriting.com/documentation-theme-jekyll/mydoc_conditional_logic.html>
