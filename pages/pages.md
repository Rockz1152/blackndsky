---
layout: page
title: Pages
permalink: /pages
---

<h2>Pages</h2>
<ul>
  {% for page in site.pages %}
    {% if page.title != Null and page.title != "Pages" %}
    <li>
      <a href="{{ page.url }}">{{ page.title }}</a>
    </li>
    {% endif %}
  {% endfor %}
</ul>

<h2>Posts</h2>
<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
