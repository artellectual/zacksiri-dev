---
title: I Built a Home Server
pubDatetime: 2024-07-06T00:00:00Z
slug: i-build-a-home-server
description: My NAS broke down and I couldn't fix it and replacements are expensive, so I decided to build one.
tags:
  - homelab
  - nas
  - server
author: Zack Siri
featured: true
---

# How it Started

I'm a mac user and generally run all my linux stuff in the cloud. It's been that way for the last decade of my life. The last time I built my own PC or any custom hardware was over 20 years ago. The Macs I have 'just worked', my networking gear, dashcam, UPSes, NAS and everything else 'just worked'. I've had most of my electronics equipment for about 6-7 years now, including my NAS.

Many months ago my NAS (Network attached storage) broke down. Luckily I had most of my data on my macs and didn't really need much of the data from my NAS. So it remained broken sitting there collecting dust for a few months. Then I started noticing some of my gadgets and devices were starting to break down one by one. Mostly probably due to wear and tear, some of them have been with me for 10+ years. Last week I finally decided to do a cleanup of my studio. Get rid of anything I didn't need, fix anything that's broken and get them into working order. So I did some inspection on my NAS.

It turns out all the drives were perfectly healthy, and the NAS mainboard itself was the problem. It simply wouldn't turn on. I called the service center of the NAS and was told that my NAS is out of warranty and they would have to send my NAS to Taiwan to be fixed and that it would cost a lot. I would have to pay for the fix and shipping the thing both ways.

I read online and I saw people were paying up to 600 USD to get it fixed. I managed to find someone online who quoted me 125 EUR but I would have to pay for shipping, which I didn't want to do since the NAS was quite big and heavy (even without the drives) and would cost a lot to handle shipping both ways.

## Held Captive

I started going to local electronic shops here in Thailand to take a look to find if anyone could fix the mainboard. Funnily enough after doing some tests the shop told me every bit of the mainboard works. I was perplexed as to why it wouldn't turn on. After doing some further research online I found out there is [something wrong](https://forum.qnap.com/viewtopic.php?f=45&t=135089&start=150#p767546) with the LPC clock on the mainboard that's preventing it from turning on.

Anyway I felt like I was held captive. Here I have 6 perfectly working hard drives. Getting it fixed means I have to spend a lot of money almost as much as buying a new one. Not getting it fixed means I have a very heavy paper weight and what would I do with the 6 working drives? I needed to do something.

## The Decision

I've recently been working on some [machine learning projects](/posts/learning-machine-learning-in-elixir/) and would love to have something I can test things on locally without booting up expensive GPU instances on the cloud, and along the way also resolve my 6 hard drive paper weight issue. I gave myself a budget of < 1000 USD and decided to build a homelab server.

### Hardware components

I managed to find some nice second hand parts and cheap chinese parts online. Here is the list of the main parts I found that inspired me to do the build.

- Intel E5-2697 v4 18 cores 36 threads - $95
- 64GB DDR4 ECC RAM - $120
- Jingsha E8i Mainboard - $95
- Quadro M2000 GPU - $109

Generally these 4 components would be the most expensive parts of the build. All in they added up to about $419 USD. Even if it's not the latest and greatest it's still a pretty beefy machine! I still had another $581 for all the other parts. Great! This will be a nice little project and I can end up with a much more useful machine than just a NAS. Next I needed a case that would be able to house the 6 drives.

Given that now 3.5 inch drives have mostly been replaced with NVMe or 2.5 inch SSD finding a case that could host 6 of these was a challenge in and of itself. I scoured the web and finally settled on the following:

- Fractal Define 7 - $184
- Bequiet System Power U9 600W - $43
- WD Black SN770 500GB Boot Drive - $54

![fractal define 7](@assets/images/i-built-a-home-server/fractal-define-7.jpg)
