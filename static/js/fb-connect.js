/*
https://developers.facebook.com/docs/plugins/like-button

https://developers.facebook.com/apps/436586203405480/fb-login/settings/
https://developers.facebook.com/apps/436586203405480/review-status/

https://auth0.com/docs/connections/social/facebook
*/

/*
https://developers.facebook.com/apps/436586203405480/fb-login/quickstart/

3. Check Login Status

The first step when loading your web page is figuring out if a person is already
logged into your app with Facebook login.
You start that process with a call to FB.getLoginStatus. That function will
trigger a call to Facebook to get the login status and call your callback function with the results.
Taken from the sample code above, here's some of the code that's run during
page load to check a person's login status:

FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});

The response object that's provided to your callback contains a number of fields:

{
    status: 'connected',
    authResponse: {
        accessToken: '...',
        expiresIn:'...',
        signedRequest:'...',
        userID:'...'
    }
}

status specifies the login status of the person using the app. The status
can be one of the following:
+ connected - the person is logged into Facebook, and has logged into your app.
+ not_authorized - the person is logged into Facebook, but has not logged into your app.
+ unknown - the person is not logged into Facebook, so you don't know if they've
logged into your app or FB.logout() was called before and therefore, it cannot connect to Facebook.

authResponse is included if the status is connected and is made up of the following:
+ accessToken - contains an access token for the person using the app.
+ expiresIn - indicates the UNIX time when the token expires and needs to be renewed.
+ signedRequest - a signed parameter that contains information about the person using the app.
+ userID - the ID of the person using the app.

Once your app knows the login status of the person using it, it can do one of the following:
+ If the person is logged into Facebook and your app, redirect them to your app's logged in experience.
+ If the person isn't logged into your app, or isn't logged into Facebook, prompt
  them with the Login dialog with FB.login() or show them the Login Button.
*/

/*
4. Add the Facebook Login Button

https://developers.facebook.com/docs/plugins/login-button

https://developers.facebook.com/docs/facebook-login/web#logindialog
https://developers.facebook.com/docs/facebook-login/web/accesstokens
https://developers.facebook.com/docs/facebook-login/web/permissions

https://developers.facebook.com/docs/facebook-login/review

https://developers.facebook.com/docs/games/gamesonfacebook/login#parsingsr

Including the Login Button into your page is easy. Visit the documentation for
the login button and set the button up the way you want. Then click Get Code and
it will show you the code you need to display the button on your page.
The onlogin attribute on the button to set up a JavaScript callback that checks
the login status to see if the person logged in successfully:

<fb:login-button
  scope="public_profile,email"
  onlogin="checkLoginState();">
</fb:login-button>

This is the callback. It calls FB.getLoginStatus() to get the most recent login state.
(statusChangeCallback() is a function that's part of the example that processes the response.)

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

You can enable a deauthorize callback through the App Dashboard.
Just go to your app, then choose the Products, then Facebook Login, and finally Settings.
A text field is provided for the Deauthorize Callback URL.
*/

/*
https://developers.facebook.com/docs/facebook-login/web/accesstokens

However, a common pattern is to take the access token and pass it back to a
server and the server makes calls on behalf of a person. In order to get the token
from the browser you can use the response object that's returned via FB.getLoginStatus():

FB.getLoginStatus(function(response) {
  if (response.status === 'connected') {
    console.log(response.authResponse.accessToken);
  }
});

Make API calls

At this point in the flow, the person is authenticated and logged in. Your app is now ready to make API calls on their behalf from the browser. In the browser, the easiest way to do that is with the FB.api() call. FB.api() will automatically add the access token to the call.

This code:

FB.api('/me', function(response) {
    console.log(JSON.stringify(response));
});
Will return an array with the id and name:

{
  "id":"101540562372987329832845483",
  "name":"Bob Smith"
}
*/

/*
https://developers.facebook.com/docs/facebook-login/web/permissions

https://developers.facebook.com/docs/facebook-login/checklist#avoidbacktoback

And if you checked /me/permissions for permissions granted after the person accepted you would find this:

{"data":
  [
    {
      "permission":"public_profile",
      "status":"granted"
    }
  ]
}
If you wanted to add the email permission later, you could re-launch it with the FB.login() function like this:

FB.login(function(response) {
   console.log(response);
}, {scope: 'email'});

Note that it only asks for the new permission. If you accept the new permission
checking /me/permissions will result in this:

{"data":
  [
    {
      "permission":"public_profile",
      "status":"granted"
    },
    {
      "permission":"email",
      "status":"granted"
    }
  ]
}

Note that the new email permission has been added to the list of allowed permissions.

The public_profile permission is always required and greyed out because it can't be disabled.

However, if someone were to uncheck user_likes (Likes) in this example, checking /me/permissions for what permissions have been granted results in:

{
  "data":
    [
      {
        "permission":"public_profile",
        "status":"granted"
      },
      {
        "permission":"user_likes",
        "status":"declined"
      }
    ]
}
Note that user_likes has been declined instead of granted.

It's OK to ask a person once to grant your app permissions that they've declined.
You should have a screen of education on why you think they should grant the
permission to you and then re-ask. But if you use the method described in the
previous section, the Login Dialog won't ask for that permission.

This is because once someone has declined a permission, the Login Dialog will
not re-ask them for it unless you explicitly tell the dialog you're re-asking
for a declined permission.

You do this by adding the auth_type: rerequest flag to your FB.login() call:

FB.login(
  function(response) {
    console.log(response);
  },
  {
    scope: 'user_likes',
    auth_type: 'rerequest'
  }
);

When you do that, the Login Dialog will re-ask for the declined permission.
The dialog will look very much like the dialog in the section on re-asking for
permissions but will let you re-ask for a declined permission.
*/
