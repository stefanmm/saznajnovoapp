# saznajnovoapp
This is my first Vue.js, so feel free to improve it. Thank you! :)

## Features :cake:
- Vue.js V2
- Based on [Vuetify](https://vuetifyjs.com/)
- List posts
- Posts pagination ( [thanks to itzikbenh](https://gist.github.com/itzikbenh/90918f44b3f871d206e6f5dddaabcc49) )
- Featured posts slider (pull posts from category)
- Category/tag list
- Comments (view only) (loads on click)
- Related posts carousel (lazy load)
- Comments/tags links to list view
- 2-level navigation (side panel)
- Lazy load images
- Skeleton loading animations
- Dark mode (localStorage)
- API request caching (Axios)
- Network connection monitoring [v-offline](https://www.npmjs.com/package/v-offline)

Planned:
- Google ads
- Bottom navigation
- Favourite list of articles

## Showcase
![snapp image](https://i.imgur.com/djxibda.png)

## Notes :thought_balloon:
1) Env file
Inside .env file add URL of your WP website like this:
```VUE_APP_MAINURL=https://example.com/wp-json/wp/v2```
or if you changed API base change this accordingly.

2) Open full article
I restricted content in my REST API so the "posts" content.rendered will return only part of the content. For that purpose I added inside SingleView.vue file a link (v-card) that points to the article. You can remove it.

3) Translation
App is coded in Serbian, you would have to change strings manually :neutral_face:
