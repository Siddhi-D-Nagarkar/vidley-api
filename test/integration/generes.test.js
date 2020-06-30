const app = require('../../index');
const supertest = require('supertest')
let server;

const request = require('supertest');
const { Genre } = require('../../models/genre');
describe('/api/generes',()=>{
    beforeEach(()=>{ server = require("../../index");});
    
    afterEach(async ()=>{
        server.close();
        await Genre.remove({});
    })
    
    describe('GET /',()=>{
        it('should return all generes',async ()=>{
            Genre.collection.insertMany([
                {name: "genre1"},
                {name: "genre2"},
            ]);
            const res = await request(server).get("/api/genres");
            expect(res.status).toBe(200);

        });
    });
});