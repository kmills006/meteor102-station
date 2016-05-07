Meteor.methods({
  insertFavoriteBar(name, bar) {
    Bars.insert({
      name: name,
      bar: bar,
    });
  },
});
