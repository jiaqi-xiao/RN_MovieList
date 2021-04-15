export class DataCall {
  // Just simulating incremental loading, don't infer anything from here
  static async get(start) {
    const responseMovie = await fetch(
      'https://api.androidhive.info/json/movies.json',
    ).then(response => response.json());
    return responseMovie;
  }
}
