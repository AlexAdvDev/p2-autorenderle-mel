# Portal 2 Autorenderle

Autorenderle is a game loosely inspired by [Rankdle](https://rankdle.com), where your goal is to guess the person behind a Portal 2 individual level speedrun given only a video.

This was originally a little project for me to learn the basics of JS, but it very quickly became more of a game when people found it fun. Hoping to improve it over time with new features and gamemodes.

## The Game

The goal of Autorenderle is simple. Given only a video of a random top 40 run of a random map, figure out the runner behind the run. Each player has their own movement quirks and route variations that can make some runners easier to identify than others.

Once you've made a guess, you'll be taken to a screen with the results, as well as some small statistics, including how long your guess took, as well as your winning streak.

## Other Pages

### About

General information about Autorenderle. A lot less detailed compared to this README.

### Statistics


Includes more detailed statistics about not only your current play session, but all of your played games, using localStorage.

### Filters

Filters allow you to change how the game plays. Of course, the current streak is reset when a filter is changed. The current filters are:
- Map Selection
    - Switch between singleplayer maps only, co-op maps only, or both
- Rank Limit
    - Change the limit for the placed runs to be shown
    - Top 40 (default), but Top 20, 100, and 200 are also available

## Community and Development

Feel free to post your high scores in the `#wordle` channnel of the [Portal 2 Speedruns Discord server](https://discord.gg/p2sr). If you have any suggestions or bug reports, feel free to open an issue on GitHub, or contact me directly via Discord (`JaioCG`). If you want to contribute to the project, pull requests are welcome.