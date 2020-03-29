---
layout: default
title: Vendors overview
parent: Reference
nav_order: 19
---

# Vendors overview
{: .no_toc }

<div class="code-example" markdown="1">
Comprehensive overview of all vendors available with focus on what to be aware of.
</div>

- TOC
{:toc}

## Key figures

- Amplitude costs $54k/year once you go over free plan (1 million events/month)
- Amplitude can be free in Growth plan for up to one year if you benefit from their Scholarship plan (startups and non-profit can benefit)
- Locize doesn't provide a free plan but only a free trial, which makes it the only vendor here that you can't use more than 2 weeks without paying (even with very low usage)
- From experience, GraphCMS is the most expensive of all those vendors as soon as you need more than the free plan (Amplitude isn't considered, completely out of league)
- From experience, Locize can be quite expensive because they bill for:
    - Subscription fees (4.5€/month)
    - Total of words (0.00368€ per word/month) - 2.7k words = 10€/month (expensive IMHO)
    - Outstanding downloads (0.000092€ per download/month) - Cheap
    - Outstanding modification (0.0368€ per modification/month) - 600 updates = 22€ (expensive IMHO)
    - So, even if you don't make any change and don't download anything, you'll still pay for both subscription and total of words and that must be a consideration before using it.
    - Overall, it's a fair price for the value and TTM it brought to us.

---

## Business relationship considerations

We have worked with all those vendors over months, if not years. Here is our feedback to help you consider them.
- GraphCMS/Locize: Awesome people, quick to reply, helpful, very nice customer success teams. Solutions/answers are given very quickly. We just love working with them. Big kuddos to them.
- Zeit: Awesome product, support is great though slower. Custom requests are not their priority if you aren't in Enterprise plan. Overall we're really glad we switched to Zeit from AWS.
- Sentry: Good product, good support, not much issue with the product nor contact with their team.
- Amplitude: Big business, lots of people there, you definitely feel less important than other customers, they kinda target the startup market but their plans aren't suitable for us as soon as free plan is limiting growth
    - Gap between free and paid is so huge, it's crazy
    - Their react implementation is the best we found for analytics
    - Overall very glad we switched from Google Analytics to Amplitude
    - Finding workarounds to avoid to switch plan is quite a challenge and a big waste of time

---

## Pricing overview

{% include vendors/vendor-table.md variant=variant zeit=true graphcms=true locize=true amplitude=true sentry=true  %}

