import fs from "fs";
import { Octokit } from "@octokit/rest";
import NodeCache from "node-cache";

import ErrorResponse from "../utils/errorResponse.js";

export const getHomeDirectory = async (req, res, next) => {
  res.send("This is the root directory : )");
};

export const getRepoStars = async (req, res, next) => {
  //Destructure request parameters
  const { owner, repo_name } = req.params;

  let owners = owner.split("&");
  let repos = repo_name.split("&");

  if (owners.length !== repos.length) {
    return next(
      new ErrorResponse(
        "Bad request, owners and repo names length must be the same.",
        400
      )
    );
  }

  try {
    const data = await APIFeature(owners, repos);
    res.status(200).json(data);
  } catch (error) {
    return new ErrorResponse(error.message, error.status);
  }
};

// export const searchString = async (req, res, next) => {
//   const searchString = [];
//   let str;
//   try {
//     let cachedValue = new NodeCache({ stdTTL: 100, checkperiod: 120 });
//     let data = cachedValue.get()
//     console.log(data)
//     if (cachedValue == 'undefined') {
//       // console.log("Yes")
//       // let stream = fs.createReadStream("./data/industry_sic.csv");

//       // stream.on("data", (data) => {
//       //   let chunk = data.toString();
//       //   str = chunk.split(",");
//       // });
//       cachedValue.set('str')
//     }
//     console.log((cachedValue.get()))
//     // stream.on("end", () => {
//     //   let value = cachedValue.get()
//     //   console.log(value.set)
//     //   for (let i = 0; i < value.length; i++) {
//     //     if (value[i].includes(req.params.searchString)) {
//     //       searchString.push(value[i]);
//     //     }
//     //   }
//     //   return res.json(searchString);
//     // });
//   } catch (error) {
//     return next(new ErrorResponse(error.message, error.status));
//   }
// };

export const searchString = async (req, res, next) => {
  const searchString = [];
  let str;
  try {
    // let cachedValue = new NodeCache({ stdTTL: 100, checkperiod: 120 });
    
      // console.log("Yes")
      let stream = fs.createReadStream("./data/industry_sic.csv");

      stream.on("data", (data) => {
        let chunk = data.toString();
        str = chunk.split(",");
      });
    stream.on("end", () => {
      for (let i = 0; i < str.length; i++) {
        if (str[i].includes(req.params.searchString)) {
          searchString.push(str[i]);
        }
      }
      return res.json(searchString);
    });
  } catch (error) {
    return next(new ErrorResponse(error.message, error.status));
  }
};

const APIFeature = async (owners, repos) => {
  const octokit = new Octokit({
    auth: process.env.AUTH,
  });
  try {
    let dataCollection = [];
    for (let i = 0; i < owners.length; i++) {
      const response = await octokit.request("GET /repos/{owner}/{repo}", {
        owner: owners[i],
        repo: repos[i],
      });

      dataCollection = [
        ...dataCollection,
        {
          "Repo Name": response.data.name,
          "Repo Description": response.data.description,
          "Number of Star": response.data.stargazers_count,
        },
      ];
    }
    return dataCollection;
  } catch (error) {
    return new ErrorResponse(error.message, error.status);
  }
};
