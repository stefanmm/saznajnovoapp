# saznajnovoapp
This is my first Vue.js app, so feel free to improve it. Thank you! :)

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
- Bottom navigation
- Favorite list of articles

Planned (by priority):
- Search posts
- Google analytics
- Google ads

## Showcase :sparkles:
![snapp image](https://i.imgur.com/djxibda.png)

## Notes :thought_balloon:
1) I made this app for my own blog. Some parts are coded specifically for my blog so it will not work out-of-box (probably). I will make this more universal in future.

2) Inside .env file add URL of your WP website like this:
```VUE_APP_MAINURL=https://example.com/wp-json/wp/v2```
or if you changed API base change this accordingly.

3) I restricted content in my REST API so the "posts" content.rendered will return only part of the content. For that purpose I added a link (v-card inside SingleView.vue) to the article. You can remove it.

4) App is coded in Serbian, you would have to change strings manually :neutral_face:

5) I am using "v-html" to render article content (SingleView.vue) because I am loading my own posts only. Beware of XSS if you plan to parse someone else's content! For comments I am using text interpolation so don't worry here.
