const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
require('../models/Actor')
require('../models')

let movieId;

test("POST /movies should create one movie", async() => {
    const newMovie = {
        name: "Los Otros",
        image: "https://play-lh.googleusercontent.com/Q8CDflcfFZPdBcdv1q4tMdIJnR_r-nd0oqU0mT4NVvtSMP_90YyHB15LYraQ6AtDfn4v-w=w240-h480-rw,",
        synopsis: "Una viuda afligida descubre sucesos extraños, que apuntan hacia la presencia de fantasmas en su apartada mansión.",
        releaseYear: 2001
    }
    const res = await request(app)
        .post('/movies')
        .send(newMovie);
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
});

test("GET /movies should return all movies", async () => {
    const res = await request(app)
        .get("/movies");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});



test("PUT /movies/:id should update one movie", async() => {
    const body = {
        name: "Los Otros upDated"
    }
    const res = await request(app)
        .put(`/movies/${movieId}`)
        .send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});
  
test("POST /movies/:id/actors should set the movies actors", async () => {
    const actor = await Actor.create({
        firstName: "Nicole",
        lastName: "Kidman",
        nationality: "australiana-estadounidense",
        image: "https://media.vogue.mx/photos/5c07276f1b144e0a56ad6b78/master/pass/ondas_clasicas_585491309.jpg",
        birthday: "1967-06-20"
    });
    const res = await request(app)
      .post(`/movies/${movieId}/actors`)
      .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/directors should set the movies directors", async () => {
    const director = await Director.create({
        firstName: "Alejandro",
        lastName: "Amenábar",
        nationality: "Chileno",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWsLCUK9OEtTKy20TefobHx-FXr6aGcGppyScYVxgH1Ub7E1TcJ-Q65c6p72AAwkaREVo&usqp=CAU",
        birthday: "1972-03-31"
    });
    const res = await request(app)
      .post(`/movies/${movieId}/directors`)
      .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("POST /movies/:id/genres should set the movies genres", async () => {
    const genre = await Genre.create({
        name: "Terror"
    });
    const res = await request(app)
      .post(`/movies/${movieId}/genres`)
      .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
 
test("DELETE /movies/:id should delete one movie", async() => {
    const res = await request(app)
        .delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
});