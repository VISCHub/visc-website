---
title: "MailChimp Pop-up on Click"
date: 2017-11-26T19:30:04Z
tags: ["visc", "mailchimp", "hacks", "tips"]
draft: false
thumbnail: "img/post/0001-mailchimp-popup.png"
---

# MailChimp Pop-up on Click

When building the VISC website, I wanted to add a feature: Show MailChimp pop-up on demand. By default MailChimp pop-up only appears once a visitor arrives at your website. The pop-up can show itself after N seconds or when a user exits or scrolls to the middle/the bottom. There's only one option that is missing: When you click a link or a button.

This post presents a **_quick hack_** which is only a copy-and-paste away. A custom pop-up with custom form and fields will take time to craft and I will leave it for another occasion. Follow these 3 steps and you are done:

## Step 1: Copy the link to embed.js from MailChimp

```
<script type="text/javascript"
    src="//downloads.mailchimp.com/js/signup-forms/popup/embed.js"
    data-dojo-config="usePlainJson: true, isDebug: false"></script>
```

Leave the part with `require(["mojo/signup-forms/Loader"]...` for the next step.

## Step 2: Add a custom showMCPopup() function

Take note of the part with `document.cookie`, you need these to override the cookie set by MailChimp to make the pop-up work again and again after each click. This is a bit hacky and you have been warned!

```
<script type="text/javascript">
function showMCPopup() {
    // Pay special attention to the path=/
    // It is required to override cookie on the whole sub-domain.
    // Without path=/ the pop-up will not show up on non / URLs.
    document.cookie = "MCPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "MCPopupSubscribed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = "MCEvilPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

    require(
        ["mojo/signup-forms/Loader"],
        function(L) {
            L.start({"baseUrl":"mc.us17.list-manage.com","uuid":"YOUR_UUID","lid":"YOUR_LID"})
        }
    );

    return false;
}
</script>
```

## Step 3: Activate showMCPopup() on click event

This step is simple and self-explanatory:

```
<script type="text/javascript">
$(document).ready(function() {
    $('#nav-icon-envelope').on('click', showMCPopup);
});
</script>
```

This works fine on the https://visc.network website. I will craft proper Ajax pop-up for MailChimp or create a shortcode for it one day in near future, but not today. Happy hacking!
