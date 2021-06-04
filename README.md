# Self-XSS Protection System
This is a system to protect against self-XSS attacks on your website.

Self-XSS is when a user runs arbitrary code unknowingly, allowing an attacker access into their account or other authorized actions.

Self-XSS is often done through one of the following means:
* Bookmarklets
* Code snippets to run in the console

Self-XSS is dangerous, and while many websites use modern security practices to mitigate these effects, it is best to still proceed with caution.


This JavaScript script enables you to block unwanted requests from websites, limiting the potential impacts of XSS, so that moderation of self-XSS attempts is not as vital, and so users of your platform can share console scripts and bookmarklets without security risks. 

## How To Use

To use this, you simply need to review the `index.js` comments throughout and add information to configure URL-based and universal endpoints to allow, and run the script through your webpage. This can be done through a templating engine as well to ensure security so that unauthorized endpoints aren't released to the general public. Additionally, you can hardcode the endpoints into the script.

Additionally, any alias of `XMLHTTPRequest` or `fetch` created before script execution will enable these requests to be made without restriction by the script. However, requests from any other source will be intercepted and processed accordingly. 

You are welcome to change from the default `confirm` function for confirmation of requests, but any changes might be vulnerable to being disabled by a malicious script, so `confirm` is the most secure. 

## Future Plans

Future plans include a more user-friendly interface that explains the dangers of each request rather than just showing the URL the request is being sent to.

## Disclaimer

This tool is highly effective, but is not foolproof, so it is still best to err on the side of caution in situations when needed, to prevent self-XSS. This tool also does not cover browser extensions or userscripts, or any other means of potential malicious activity through some sort of XSS. Only client-side activity that is begun after page load is covered. Even normal XSS that loads through a templating engine, or some other sort of means, before the page finishes loading, will not be protected against by this tool without modifications. In these cases, input sanitation or Content Security Policy headers are more ideal. However, CSP headers may interfere with intended script execution, so proper research must be done beforehand.
