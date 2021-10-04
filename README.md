<<<<<<< HEAD
# Spotify-Project
=======
## OMDB Nominations Webapp

This webapp takes a search query from user input and asks the OMDB api for movies matching that query. Each search result lists its title, year of release, an image if one is provided by OMDB, and a rating. Since the rating isn't provided in the OMDB search results, each result queries OMDB with it's specific ID to get a rating in the response.

In addition, since OMDB only returns the first 10 responses, I've added pagination. You can navigate to the second page to see the next 10 responses and so on.

Editing the search query edits the results, although there is a known issue with the movie "The D Train", as OMDB returns that movie in its response multiple times.

When a movie's nominate button has been clicked, it is added to the local nominations array. You can view your current nominations and remove it there. Once a movie has been nominated, it cannot be nominated again. 

Once a user reaches 5 nominations, a banner appears directing the user to view their nominations.

When a user views their nominations and they have 5, they can click the submit button, which resets the webapp to its initial state. However, the nominations are uploaded to a firebase backend that keeps track of the amount of times a movie is nominated. A user can view the top 5 most nominated movies. If you nominate one of those movies (or nominate a different movie enough times), you can see the leaderboard change. There is no authentication, so any user can submit nominations as many times as they want.

>>>>>>> 4eadae95b8df8d7fb446b021ded645d9715c31ad
