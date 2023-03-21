const request = require("supertest");
const app = require("../app");
require('../models')

let directorId;

test("POST /directors should create one director", async() => {
    const newDirector = {
        firstName: "Alejandro",
        lastName: "Amenábar",
        nationality: "Chileno",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWsLCUK9OEtTKy20TefobHx-FXr6aGcGppyScYVxgH1Ub7E1TcJ-Q65c6p72AAwkaREVo&usqp=CAU",
        birthday: "1972-03-31"
    }
    const res = await request(app)
        .post('/directors')
        .send(newDirector);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newDirector.firstName);
})

test("GET /directors should return all directors", async () => {
    const res = await request(app)
        .get("/directors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

test("PUT /directors/:id should update one director", async() => {
    const body = {
        firstName: "Alejandro upDated"
    }
    const res = await request(app)
        .put(`/directors/${directorId}`)
        .send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
  })

test("DELETE /directors/:id should delete one director", async() => {
    const res = await request(app)
        .delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
})