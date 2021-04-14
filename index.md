---
title: Home
layout: home
---

# Resources

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
| Build Compare | [https://www.gpucheck.com/build-multi](https://www.gpucheck.com/build-multi){:target="_blank"}
| **CPU**
| Passmark | [https://www.cpubenchmark.net/singleCompare.php](https://www.cpubenchmark.net/singleCompare.php){:target="_blank"}
| UserBenchmark | [https://cpu.userbenchmark.com/](https://cpu.userbenchmark.com/){:target="_blank"}
| GPU-Check | [https://www.gpucheck.com/cpu-benchmark-comparison](https://www.gpucheck.com/cpu-benchmark-comparison){:target="_blank"}
| **GPU**
| Passmark | [https://www.videocardbenchmark.net/singleCompare.php](https://www.videocardbenchmark.net/singleCompare.php){:target="_blank"}
| UserBenchmark | [https://gpu.userbenchmark.com/](https://gpu.userbenchmark.com/){:target="_blank"}
| GPU-Check | [https://www.gpucheck.com/gpu-benchmark-comparison](https://www.gpucheck.com/gpu-benchmark-comparison){:target="_blank"}
| **Display**
| TestUFO | [https://testufo.com](https://testufo.com/){:target="_blank"}
| DisplaySpecifications | [https://www.displayspecifications.com/](https://www.displayspecifications.com/){:target="_blank"}

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
