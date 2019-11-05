---
title: Home
layout: page
---

# Resources

<!-- Old layout -->
<!-- [Windows Install]({{site.url}}/windows){:style="font-size:17px"} | [Windows Tools]({{site.url}}/windows-tools){:style="font-size:17px"} | [Linux Install]({{site.url}}/linux){:style="font-size:17px"} | [Handbrake]({{site.url}}/handbrake){:style="font-size:17px"} -->

<div align="center" markdown="1">
[Windows Install]({{site.url}}/windows){: .simple-button}
[Windows Tools]({{site.url}}/windows-tools){: .simple-button}
[Linux Install]({{site.url}}/linux){: .simple-button}
[Handbrake]({{site.url}}/handbrake){: .simple-button}
</div>

----

<button class="collapsible" id="links">Links for PC Hardware</button>
<div class="content" id="links-data" markdown="1">

| **Tools**
| PCPartPicker | [https://pcpartpicker.com](https://pcpartpicker.com/){:target="_blank"}
| Bottleneck Calculator | [https://pc-builds.com/calculator](https://pc-builds.com/calculator/){:target="_blank"}
| UserBenchmark | [https://www.userbenchmark.com/](https://www.userbenchmark.com/){:target="_blank"}
| **CPU**
| GPU-Check CPU Compare | [https://www.gpucheck.com/cpu-benchmark-comparison](https://www.gpucheck.com/cpu-benchmark-comparison){:target="_blank"}
| Passmark CPU Compare | [https://www.cpubenchmark.net/singleCompare.php](https://www.cpubenchmark.net/singleCompare.php){:target="_blank"}
| AnandTech CPU Compare | [https://www.anandtech.com/bench](https://www.anandtech.com/bench/){:target="_blank"}
| **GPU**
| GPU-Check GPU Compare | [https://www.gpucheck.com/gpu-benchmark-comparison](https://www.gpucheck.com/gpu-benchmark-comparison){:target="_blank"}
| Passmark GPU Compare | [https://www.videocardbenchmark.net/singleCompare.php](https://www.videocardbenchmark.net/singleCompare.php){:target="_blank"}

</div>
<br>

<h1>Latest Post</h1>
<ul>
{% for post in site.posts limit:1 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
{% endfor %}
</ul>

<h2>Recent Posts</h2>
<ul>
{% for post in site.posts offset:1 limit:2 %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
{% endfor %}
</ul>
