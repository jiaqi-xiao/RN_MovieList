export class DataCall {
  // Just simulating incremental loading, don't infer anything from here
  static async get(start, count) {
    // const responseHusky = await fetch('https://dog.ceo/api/breed/husky/images');
    // const responseBeagle = await fetch(
    //   'https://dog.ceo/api/breed/beagle/images',
    // );

    // const responseJsonHusky = await responseHusky.json();
    // const responseJsonBeagle = await responseBeagle.json();

    // const fullData = responseJsonHusky.message.concat(
    //   responseJsonBeagle.message,
    // );

    // const filteredData = fullData.slice(
    //   start,
    //   Math.min(fullData.length, start + count),
    // );
    // return filteredData;

    const responseMovie = await fetch(
      'https://api.androidhive.info/json/movies.json',
    ).then(response => response.json());
    // console.log(typeof responseMovie);
    // for (let i = 0; i < 1000; i++) {
    //   responseMovie.push(...responseMovie);
    // }
    return responseMovie;
  }
}
