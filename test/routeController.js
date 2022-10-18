import {expect} from  "chai"
import { getRepoStars, searchString } from "../controller/routeController.js";

describe("Route Controller", () => {
    it("should throw an error if owner and repo length is not equal ",  (done) => {
      const req = {
        params: {
          owner: "tradotech&trado_estat",
          repo_name: "trado_estate"

        }
      };
    getRepoStars(req, {}, (err, response) => Promise.resolve(err))
    .then((result) => {
        expect(result).to.be.an('error')
        expect(result).to.have.property('statusCode', 400);
        done();
    })
    });

    it("should return an error with statusCode 404 if not found ",  (done) => {
        const req = {
          params: {
            owner: "Lordjago",
            repo_name: "dehillto"
  
          }
        };
      getRepoStars(req, {}, (err, response) => Promise.resolve(err))
      .then((result) => {
          expect(result).to.be.an('error')
          expect(result).to.have.property('statusCode', 404);
          done();
      })
      });


});
